import { Button, Fab, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { alertHandlerActions } from "../../store/slices/alert-handler-slice";
import apiUrls from "../../util/api_urls";
import errors from "../../util/errors";
import links from "../../util/links";
import messages from "../../util/messages";
import severties from "../../util/severties";
import colors from "./colors";

const AddSale = (props) => {
  let saleFormFields = {
    Load_Date: "date",
    Load_Number: "Number",
    Agent_Email: "String",
    Customer: "String",
    Carrier_Price: "Number",
    Margin: "Number",
    Pick_Up_Date: "date",
    drop_Of_Date: "date",
    Month: "String",
    Pick_up_location: "String",
    Drop_Location: "String",
    Carrier_email: "String",
    Load_Status: "String",
    POD_Sent: "String",
    POD_Sent_Date: "date",
    Invoicing_Status: "date",
    Shipper_Conformation: "String",
    shipper_Uploaded: "String",
    Customer_Paid: "String",
    Carrier_Paid: "String",
    payment_received: "String",
    payment_received_date: "date",
    carrier_phone_number: "String",
    Carrier_MC: "String",
    driver_details: "String",
    sale: "number",
  };
  const [saleValues, setSaleValues] = useState({
    Load_Date: "",
    Load_Number: "",
    Agent_Email: "",
    Customer: "",
    Carrier_Price: "",
    Margin: "",
    Pick_Up_Date: "",
    drop_Of_Date: "",
    Month: "",
    Pick_up_location: "",
    Drop_Location: "",
    Carrier_email: "",
    Load_Status: "",
    POD_Sent: "",
    POD_Sent_Date: "",
    Invoicing_Status: "",
    Shipper_Conformation: "",
    shipper_Uploaded: "",
    Customer_Paid: "",
    Carrier_Paid: "",
    payment_received: "",
    payment_received_date: "",
    carrier_phone_number: "",
    Carrier_MC: "",
    driver_details: "",
    sale: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  if(searchParams.get('edit')){
    console.log('search param----',searchParams.get('edit'));
  }
  const saleValuesHandler = (prop, value) => {
    setSaleValues((prevState) => {
      let oldState = { ...prevState };
      oldState[prop] = value;
      return oldState;
    });
  };
  const getSaleById = async (_id)=>{
    try{
      const saleResponse = await fetch(links.backendApiUrl+ apiUrls.sales.getSaleById + _id)
      if(saleResponse.status<200 || saleResponse.status>299){
        let newError = new Error();
        newError.message = errors.serverError;
        throw newError; 
      }
      const saleResult = await saleResponse.json();
      if(saleResult.status<200 || saleResult.status>299){
        let newError = new Error();
        newError.message = saleResult.error;
        throw newError;
      }
      setSaleValues((prevState)=>{
        let oldState = {...prevState};
        for(let prop in saleResult.sale){
          oldState[prop] = saleResult.sale[prop];
        }
        return oldState;
      })
    }
    catch(err){
      console.log('error----',err.message);
      reduxDispatch(alertHandlerActions.fireAlert({message: err.message, severety:severties.error }))

    }

  }
  useEffect(()=>{
    if(searchParams.get('edit')){
      //get Sale By id 
       getSaleById(searchParams.get('_id'));

    }
  },[])
  const editSaleHandler = async ()=>{
    try{
      // retrieve token
      
        if(!localStorage.getItem('currentUser')){
          let newError = new Error();
          newError.message = 'current user not saved please login...!!';
          throw newError;
        }
        let token = JSON.parse(localStorage.getItem('currentUser')).authToken;
        // create edit object
        // setSaleValues((prevState)=>{
        //   let oldState = {...prevState}
        //   oldState._id = searchParams.get('_id');
        //   return oldState
        // }) 
        let editedSale = {
          ...saleValues,
          _id: searchParams.get('_id')
        }
      // fetch edit response
      console.log('edited sale values----',editedSale)
        const editResponse = await fetch(links.backendApiUrl+ apiUrls.sales.editSale ,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedSale)
        })
      // handle errors
        console.log('edit Response-----',editResponse)
        if(editResponse.status<200 || editResponse.status>299){
          let newError = new Error();
          newError.message = errors.serverError;
          throw newError;
        }

        const editResult = await editResponse.json();
        console.log('edit Result-----',editResult);

        if(editResult.status<200 || editResult.status>299){
          let newError = new Error();
          newError.message = editResult.error;
          throw newError;
        }

        // handle success

        reduxDispatch(alertHandlerActions.fireAlert({message: editResult.message , severety:severties.success }))
        // navigate('/display-sales')


    }
    catch(err){
      console.log('error---',err.message);
      reduxDispatch(alertHandlerActions.fireAlert({message: err.message, severety:severties.error }))

    }
  }
  const addSaleHandler = async ()=>{
    try{
      if(!localStorage.getItem('currentUser')){
        let newError = new Error();
        newError.message = 'current user not saved please login...!!';
        throw newError;
      }
      let token = JSON.parse(localStorage.getItem('currentUser')).authToken;

      const saleResponse = await fetch(links.backendApiUrl+apiUrls.sales.addSale,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(saleValues)
      })
      console.log('response----',saleResponse)
      if(saleResponse.status==500){
        let errorResult = await saleResponse.json()
        let newError = new Error();
        newError.message = errorResult.error.message
        throw newError;
      }
      if(saleResponse.status!=201){
        let errorResult = await saleResponse.json()
        let newError = new Error();
        newError.message = errorResult.error.message
        throw newError;
      }
      const saleResponseResult = await saleResponse.json()
      console.log('saleResponseResult----',saleResponseResult)
      for(let prop in saleFormFields){
        setSaleValues((prevState)=>{
            let oldState = {...prevState};
            oldState[prop] = '';
            return oldState;
        })
      }

    }
    catch(err){
      console.log('error---',err.message);
      reduxDispatch(alertHandlerActions.fireAlert({message: err.message, severety:severties.error }))
    }
  }
  const addSaleText = 'Add Sale';
  const editSaleText = 'Edit Sale';
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid
        item
        xs={11}
        md={7}
        sx={{
          backgroundColor: colors.cardGrey,
          textAlign: "center",
          p: 3,
          my: 4
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={9} md={7}>
            <Typography
              sx={{
                textAlign: "center",
                // fontWeight: "bold",
                mt: 1,
              }}
              color="secondary"
              variant="h5"
              gutterBottom
            >
              { searchParams.get('edit') ? editSaleText : addSaleText }...!!
            </Typography>
          </Grid>
        </Grid>
    
      <Grid container sx={{ justifyContent: "center" }}>
        {Object.keys(saleFormFields).map((keyName, keyIndex) => {
          return (
            <Grid item md={5} sx={{ mb: 2 }} key={keyName}>
              {saleFormFields[keyName]=='date' && <><label>{keyName.replaceAll("_", " ")}</label><br /></>}
              <TextField
                id="outlined-basic"
                label={saleFormFields[keyName]=='date'?'' : keyName.replaceAll("_", " ")}
                type={saleFormFields[keyName]}
                variant="outlined"
                color="secondary"
                onChange={(e) => {
                  saleValuesHandler(keyName, e.target.value);
                }}
                value = {saleValues[keyName]}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => {
            console.log("saleValues-----", saleValues);

            searchParams.get('edit') ? editSaleHandler() : addSaleHandler() ;
          }}
          color="secondary"
          sx={{ mt: 2 }}
          variant="contained"
        >
          { searchParams.get('edit') ? editSaleText : addSaleText }
        </Button>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default AddSale;
