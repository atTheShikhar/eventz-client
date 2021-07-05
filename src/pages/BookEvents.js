import { Card, CardContent, Container, Divider, IconButton, makeStyles } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ValidatorForm } from 'react-material-ui-form-validator'
import SubmitButton from '../components/buttons/SubmitButton';
import Textbox from '../components/inputs/Textbox';
import { numErr, reqErr } from '../helpers/validators';
import { bookEvents } from '../helpers/bookEvents';
import { useHistory } from 'react-router';
import { ComponentContext, UserContext } from '../context/Context';
import SubNav from '../components/navbar/SubNav';
import { fetchDataAuth } from '../helpers/fetchData';

const useStyles = makeStyles(theme => ({
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    bgGrey: {
        backgroundColor: "#fafafa",
        height: "90vh"
    },
    vmargin: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    vpadding: {
        paddingTop: "30px",
        paddingBottom: "30px"
    }
}));

function loadRazorpay() {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

function BookEvents(props) {
    const [count,setCount] = useState(1);
    const classes = useStyles();
    const history = useHistory();
    const {setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const {user} = useContext(UserContext);
    const {title,isFree,price,timing} = props?.location?.state;
    
    const priceInt = parseInt(price);
    let totalPrice = priceInt * count;

    const changeHandler = (e) => {
        setCount(e.target.value);
    }
    
    const increment = (e) => {
        if(count<5) 
            setCount(count => ++count)
    }
    const decrement = (e) => {
        if(count>1)
            setCount(count => --count)
    }

    async function displayRazorpay(requestData) {
        const res = await loadRazorpay();

        if(!res) {
            alert("Failed to load Razorpay sdk");
            return
        }
        
        const data = await fetchDataAuth("/api/book-tickets",setFeedback,history,requestData);
        console.log(data);

        if(data === null || data === undefined) {
            return
        }

        const options = {
            "key": process.env.REACT_APP_RAZORPAY_KEY, 
            "order_id": data.id, 
            "amount": data.amount.toString(), 
            "currency": data.currency,
            "description": data.description,
            "name": "Eventz",
            "image": "http://localhost:8000/logo.png",
            "handler": async function (response) {
                const { razorpay_payment_id,razorpay_order_id } = response;
                const reqData = {
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    amount: data.amount,
                    status: "captured"
                }
                const resData = await fetchDataAuth("/api/verify-payments",setFeedback,history,reqData);
                setFeedback({
                    open: true,
                    severity: "success",
                    message: resData.message
                });
                history.push('/user/mybookings',{tickets: resData.createdTickets});
            },
            "prefill": {
                "name": user.name,
                "email": user.email,
            }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

        paymentObject.on("payment.failed",async function (response) {
            const { order_id,payment_id } = response.error.metadata;
            const reqData = {
                order_id,
                payment_id,
                amount: data.amount,
                status: "failed"
            }
            await fetchDataAuth("/api/verify-payments",setFeedback,history,reqData);
        })
    }

    const submitHandler = (e) => {
        const requestData = { ticketCount: count, eventId:  props.match.params.id };
        if(isFree === "No") {
            displayRazorpay(requestData)
        } else {
            bookEvents(requestData,history,setFeedback,setButtonDisabled);
        } 
    }

    return (
        <>        
        <SubNav title="Book Event" />
        <div className={`${classes.vpadding} ${classes.bgGrey}`}>
            <Container maxWidth="sm">
                <Card variant="outlined" raised={false}>
                <CardContent>
                    <h2>Select ticket count</h2>
                    <Divider variant="middle" className={classes.vmargin}/>
                    <h3>Title: {title}</h3>
                    <div>Timing: {timing}</div>
                    <ValidatorForm instantValidate={true} onSubmit={submitHandler}>
                        <div className={`${classes.flexRow} ${classes.vmargin}`}>
                        <IconButton onClick={decrement}>
                            <RemoveIcon/>
                        </IconButton>

                        <Textbox 
                            fullWidth={false} 
                            value={count} 
                            onChange={changeHandler}
                            validators={['required',"isNumber"]}
                            errorMessages={[reqErr,numErr]}
                        />

                        <IconButton onClick={increment}>
                            <AddIcon/>
                        </IconButton>
                        </div>

                        <SubmitButton>
                            {
                                (isFree === "No") ?
                                (<>{`Pay Rs:${totalPrice}`}</>) : 
                                (<>{`Book Free`}</>)
                            }
                        </SubmitButton>
                   </ValidatorForm> 
                </CardContent>
                </Card>
            </Container>
        </div>
        </>
    )
}

export default BookEvents
