import { Avatar, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Pagination, Paper, Stack, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { alertHandlerActions } from "../../store/slices/alert-handler-slice";
import apiUrls from "../../util/api_urls";
import errors from "../../util/errors";
import links from "../../util/links";
import severties from "../../util/severties";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import messages from "../../util/messages";
import { red } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import useFormInput from "../../hooks/useFormInput";




const DisplaySales = () => {

  const SaleModal = (props) => {


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const [open,setOpen] = useState(props.openSaleModal)
    const handleClose = () => {
      props.closeModal()
      setOpen(false);

    } 
    useEffect(()=>{
      
      console.log('props---',props)
        setOpen(props.openSaleModal)
      },[])
    
    return <>
    
      <Modal
        open={open}
        sx={style}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {props.item.Agent_Email && props.item.Agent_Email.slice(0, 1)}
              </Avatar>
            }
            title={props.item.Agent_Email}
          />
          <CardContent style={{
                  height: '10em',
                  overflow: 'auto'
                }} >
            {itemHeaders.map(property=>{
              return( 

                <div key={property}>
                <span style={{width: '30%'}}>{property}</span> : <span>{props.item[property]}</span>
                </div>
              
            )})}
          </CardContent>
        </Card>
      </Modal>
    </>
    }

  const [selectedItem,setSelectedItem] = useState({});
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const reduxDispatch = useDispatch();
  const [currPage, setCurrPage] = useState(1);
  const [searchKeywords, setSearchKeywords] = useState('');
  const itemsReducerFn = (prevstate, action) => {
    if (action.type == 'initialize') {
      return action.value;
    }
    if( action.type == 'delete'){
      let oldState = [...prevstate]
      oldState.splice(action.value.index,1);
      console.log('oldState----',oldState)
      return oldState;
    }
  }
  const [items, itemsDispatch] = useReducer(itemsReducerFn, []);
  const [itemHeaders, setItemHeaders] = useState([]);
  const [filteredPage, setFilteredPage] = useState(1);
  const [filterByAgentMail, setFilterByAgentMail] = useState('');
  const [totalItems, setTotalItems] = useState(0);

  const searchHandler = async ()=>{
    const searchArray = searchKeywords.split(' ');
    console.log('search keywords-----',searchArray)
    try{
      
      const searchSaleResponse = await fetch(links.backendApiUrl+apiUrls.sales.searchSales +currPage,{
        method: 'POST',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              searchArray
            })
  
      }) 
      console.log('search sale response----',searchSaleResponse)
      if(searchSaleResponse.status<200 || searchSaleResponse.status>299){
        const newError = new Error();
        newError.message = errors.serverError;
        throw newError;
      }
      const searchResult = await searchSaleResponse.json();
      if(searchResult.status<200 || searchResult.status>299){
        const newError = new Error();
        newError.message = errors.serverError;
        throw newError;
      }
      itemsDispatch({type: 'initialize', value: searchResult.searchedSales})
      console.log('search result----',searchResult);
      setTotalItems(searchResult.total)
    }
    catch(err){
      console.log('error----', err)
      reduxDispatch(alertHandlerActions.fireAlert({ message: err.message, severety: severties.error }))
    }


  }

  const pageChangeHandler = (page)=>{
    setCurrPage(page);
  }
  useEffect(() => {
    if(searchKeywords.length==0){

      fetch(links.backendApiUrl + apiUrls.sales.getSales + currPage)
        .then((res) => {
          if (res.status < 200 || res.status >= 300) {
            const error = new Error();
            error.message = errors.serverError;
            throw error;
          }
          return res.json()
        })
        .then((res) => {
          console.log('response----', res)
          // res.items.forEach(item => {
          //   for (let prop in item) {
          //     setItemHeaders((prevState) => {
          //       let oldState = [...prevState]
          //       oldState.push(prop);
          //       return oldState;
          //     })
          //   }
          // })
          // for(let prop in res.items[0]){
          //   setItemHeaders((prevState) => {
          //           let oldState = [...prevState]
          //           oldState.push(prop);
          //           return oldState;
          //         })
          // }
          itemsDispatch({ type: 'initialize', value: res.items });
          setTotalItems(res.total)
          console.log('items-----',items)
        })
        .catch(err => {
          console.log('error----', err);
          reduxDispatch(alertHandlerActions.fireAlert({ message: err.message, severety: severties.error }))
        })
    }
    else{
      searchHandler();
    }

  }, [currPage])
  // useEffect(()=>{
  //     fetch(links.backendApiUrl+apiUrls.sales.filterSales+filteredPage,{
  //         method: 'POST',
  //         headers:{

  //         },
  //         body: JSON.stringify({
  //             filterByAgentMail,
  //         })
  //     })
  // },[filteredPage])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  console.log('currentUser----', localStorage.getItem('currentUser'))
  const token = JSON.parse(localStorage.getItem('currentUser')).authToken;
  const deleteSale = async (id) => {
    try {
      // const deleteResponse = await fetch(links.backendApiUrl+apiUrls.deleteSale,{
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(saleValues)
      // })
      // if(deleteResponse.status<200&&deleteResponse.status>=300){
      //   const newError = new Error();
      //   newError.message  = errors.serverError;
      //   throw newError;
      // }
      // deleteResResult = await deleteResponse.json()
      // if(deleteResResult.status<200&&deleteResResult.status>=300){
      //   const newError = new Error();
      //   newError.message = deleteResResult.error.message
      //   throw newError;
      // }
      console.log('id----',id);
      console.log('items-------',items);
      console.log('index------',items.findIndex(item=> item._id == id))
      // items.splice(items.findIndex(item => item.id == id), 1);
      itemsDispatch({type: 'delete', value:{index: items.findIndex(item=> item._id == id)}})
      reduxDispatch(alertHandlerActions.fireAlert({ message: messages.deletedSuccessfully, severety: severties.success }))
    }
    catch (err) {
      console.log('error----', err)
      reduxDispatch(alertHandlerActions.fireAlert({ message: err.message, severety: severties.error }))
    }
  }

  

  const viewSale = (saleItem) => {

    console.log('view clicked and saleItem----',saleItem)
    setSelectedItem(saleItem);
    setOpenSaleModal(true);


  }
  const closeModal = ()=>{
    setSelectedItem({});
    setOpenSaleModal(false);
  }
  const navigate = useNavigate()
  const editSale = async (saleItem) => {
    navigate('/add-sale?edit=1&_id='+ saleItem._id)
  }

  const requiredValidator = (value)=>{
    if(value.trim() == ''){
      return {
        valid: false,
        helperData: 'This field is required...!!'
      }
    }
    return {
      valid: true,
      helperData: ''
    }
  }

  const agent_Email = useFormInput(requiredValidator);
  const fromDate = useFormInput(requiredValidator);
  const toDate = useFormInput(requiredValidator);
  const [formIsValid,setFormIsValid] = useState(false);
  const [hra,setHra] = useState(0);
  const [absent,setAbsent] = useState(0);
  const [ta,setTa] = useState(0);
  const [pf,setPf] = useState(0);
  useEffect(()=>{
    if(agent_Email.isValid && fromDate.isValid && toDate.isValid){
      setFormIsValid(true)
    }
  },[agent_Email.isValid,fromDate.isValid,toDate.isValid])

  const calculateSalaryHandler = ()=>{
    let salaryCalculateObj = {
      agentEmail: agent_Email.inputValue,
      fromDate: fromDate.inputValue,
      toDate: toDate.inputValue,
      hra,
      absent,
      ta,
      pf
    }
    console.log('calculate salary obj ----',salaryCalculateObj);
  }
  return (
    <>
    <Container>
    <Grid container sx={{
      justifyContent: 'center',
      textAlign: 'center'
    }}>

      <Grid item xs={11} sx={{
        margin: 'auto 0 auto 0'
      }}>
        <FormControl sx={{ m: 2, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                value = {searchKeywords}
                onChange= {(e)=>{
                  setSearchKeywords(e.target.value)
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick= {()=>{
                        searchHandler();
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>

      </Grid>
      <Grid item xs={11} sx={{
                display: 'flex',
                justifyContent: 'center',
                m: 2

      }}>

    <Pagination sx={{justifySelf: 'center'}} count={totalItems==0?1:Math.ceil(totalItems/5)} onChange={(e,page)=>{
      pageChangeHandler(page)
    }} color="secondary" />
      </Grid>
   

    

    </Grid>

      <SaleModal item={selectedItem} openSaleModal={openSaleModal} closeModal={closeModal} ></SaleModal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Actions
              </StyledTableCell>
              {items.length>0 && Object.keys(items[0]).map((header,i) => (
                <StyledTableCell key={i}>{header}</StyledTableCell>
              ))}
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell sx={{ display: 'inline-flex' }} >
                  <Button variant="contained" onClick={() => { deleteSale(item._id) }} color="error" sx={{ mr: 2, }} size="small" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => { editSale(item) }} color="info" sx={{ mr: 2, }} size="small" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button variant="contained" onClick={() => { viewSale(item) }} color="secondary" sx={{ mr: 2, }} size="small" startIcon={<PreviewIcon />}>
                    View
                  </Button>
                </StyledTableCell>
                {Object.keys(item).map((key,i) => (
                  <StyledTableCell align="right" key={i}>{item[key]}</StyledTableCell>
                ))}
                {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container sx={{
        justifyContent: 'space-around',
        my: 2
      }}>
        <Grid item xs={11} md={2} sx={{m: 1}}>
        <TextField onBlur={(e)=>{agent_Email.inputValueBlur(e)}} onChange={(e)=>{agent_Email.inputValueChanged(e)}} value={agent_Email.inputValue} id="Agent-Email-basic" label="Agent Email" variant="outlined" />
        <FormHelperText error={agent_Email.hasError}>{agent_Email.helperText}</FormHelperText>
        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
        <TextField id="Absent-Days-basic" onChange={(e)=>{setAbsent(e.target.value)}} value={absent} label="Absent Days" variant="outlined" />

        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
            From:- <br />
            <input onBlur={(e)=>{fromDate.inputValueBlur(e)}} onChange={(e)=>{fromDate.inputValueChanged(e)}}  type='date' style={{margin: '1em'}} placeholder="From"></input>
            <FormHelperText error={fromDate.hasError}>{fromDate.helperText}</FormHelperText>

        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
            To:- <br />
            <input type='date' onBlur={(e)=>{toDate.inputValueBlur(e)}} onChange={(e)=>{toDate.inputValueChanged(e)}} style={{margin: '1em'}} placeholder="To"></input>
            <FormHelperText error={toDate.hasError}>{toDate.helperText}</FormHelperText>

        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
        <TextField id="HRA-basic" onChange={(e)=>{setHra(e.target.value)}} value={hra} label="HRA" variant="outlined" />

        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
        <TextField id="Travel-Allowence-basic" onChange={(e)=>{setTa(e.target.value)}} value={ta} label="Travel Allowence" variant="outlined" />

        </Grid>
        <Grid item xs={11} md={3} sx={{m: 1}}>
        <TextField id="PF-basic" onChange={(e)=>{setPf(e.target.value)}} label="PF" value={pf} variant="outlined" />

        </Grid>
        <Grid item xs={11} sx={{display:'flex', justifyContent:'center', m: 2}}>
          <Button disabled={!formIsValid} variant="contained" color="secondary" size="large" onClick={()=>{
            calculateSalaryHandler();
          }}>Calculate Salary...!!</Button>
        </Grid>
      </Grid>
    </Container>
    </>
  )

}

export default DisplaySales