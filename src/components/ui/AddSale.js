import { Button, Fab, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import links from "../../util/links";
import colors from "./colors";

const AddSale = (props) => {
  let saleFormFields = {
    Load_Date: "String",
    Load_Number: "Number",
    Agent_Email: "String",
    Customer: "String",
    Carrier_Price: "Number",
    Margin: "Number",
    Pick_Up_Date: "String",
    drop_Of_Date: "String",
    Month: "String",
    Pick_up_location: "String",
    Drop_Location: "String",
    Carrier_email: "String",
    Load_Status: "String",
    POD_Sent: "String",
    POD_Sent_Date: "String",
    Invoicing_Status: "String",
    Shipper_Conformation: "String",
    shipper_Uploaded: "String",
    Customer_Paid: "String",
    Carrier_Paid: "String",
    payment_received: "String",
    payment_received_date: "String",
    carrier_phone_number: "String",
    Carrier_MC: "String",
    driver_details: "String",
    driver_details: "String",
  };
  const [saleValues, setSaleValues] = useState({});
  const saleValuesHandler = (prop, value) => {
    setSaleValues((prevState) => {
      let oldState = { ...prevState };
      oldState[prop] = value;
      return oldState;
    });
  };
  const addSaleHandler = async ()=>{
    const saleResponse = await fetch(links.backendApiUrl+'/api/sales/add-sale',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saleValues)
    })
    console.log('response----',saleResponse)
    const saleResponseResult = await saleResponse.json()
    console.log('saleResponseResult----',saleResponseResult)
  }
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
              Add Sale...!!
            </Typography>
          </Grid>
        </Grid>
    
      <Grid container sx={{ justifyContent: "center" }}>
        {Object.keys(saleFormFields).map((keyName, keyIndex) => {
          return (
            <Grid item md={5} sx={{ mb: 2 }} key={keyName}>
              <TextField
                id="outlined-basic"
                label={keyName.replaceAll("_", " ")}
                type={saleFormFields[keyName]}
                variant="outlined"
                color="secondary"
                onChange={(e) => {
                  saleValuesHandler(keyName, e.target.value);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => {
            console.log("saleValues-----", saleValues);
            addSaleHandler();
          }}
          color="secondary"
          sx={{ mt: 2 }}
          variant="contained"
        >
          Add Sale
        </Button>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default AddSale;
