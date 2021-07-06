import { Container, Grid,Card, 
    CardContent, Button, makeStyles, Collapse } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import QrReader from 'react-qr-reader';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/inputs/Textbox';
import useStyles from './Styles';
import { ComponentContext } from '../../context/Context';
import { useHistory } from 'react-router';
import { submitFormdata } from '../../helpers/submitFormdata';
import {reqErr} from '../../helpers/validators';
import SubNav from '../../components/navbar/SubNav';
import Attendants from '../../components/Attendants';

const useStyles1 = makeStyles((theme) => ({
    divider: {
        textAlign: "center",
        margin: "10px"
    },
    camera: {
        width: "100%",
        height: "auto"
    }
}));

function VerifyTickets(props) {
    const eventId = props?.match?.params?.eventId;
    const classes = useStyles();
    const classes1 = useStyles1();
    const {setFeedback, setButtonDisabled} = useContext(ComponentContext);
    const history = useHistory();
    const [ticketId,setTicketId] = useState("");
    const [expanded,setExpanded] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const changeHandler = async (e) => {
        await setTicketId(e.target.value);
    }

    const submitHandler = async () => {
        const url = "/api/verify-tickets";
        const postData = {
            ticketId,eventId
        };
        await submitFormdata(postData,history,setFeedback,setButtonDisabled,url,null);
        await setTicketId("");        
        await setRefresh(refresh => !refresh)
    }

    const errorHandler = err => {
        console.log(err);
    }

    const scanHandler = async (data) => {
        if(data) {
            await setTicketId(data);
        }
    }

    return (
        
        <>
        <SubNav title={"Verify Tickets for you Event"}/>
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="lg" >
                <Grid container 
                    direction="row" 
                    justify="center" 
                    // alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <ValidatorForm 
                                    instantValidate={true} 
                                    onSubmit={submitHandler} 
                                >
                                    <h2 className={classes.headingColor}>Verify Tickets</h2>    
                                    <Textbox 
                                        label="Enter Ticket Id"
                                        value={ticketId}
                                        onChange={changeHandler}
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={[reqErr]}
                                    />
                                    <SubmitButton className={classes.successButton}>
                                        Check
                                    </SubmitButton>
                                </ValidatorForm>
                                
                                <div className={classes1.divider}>OR</div>

                                <Collapse 
                                    in={expanded} 
                                    timeout="auto" 
                                    unmountOnExit
                                    className={classes.vmargin}
                                >
                                    <div>
                                        <QrReader
                                            delay={300}
                                            onError={errorHandler}
                                            onScan={scanHandler}
                                            className={classes1.camera}                    
                                        />
                                    </div>
                                </Collapse>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    onClick={() => {setExpanded(expanded => !expanded)}}
                                >
                                    {
                                        expanded ?
                                        "Cancel" :
                                        "Scan QR Code"
                                    }
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={8}>
                        <Attendants
                            load={refresh}
                            eventId={eventId}
                            url={'/api/attendance'}
                            header={"Total Present: "}
                            actions={[]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
        </>
    )
}

export default VerifyTickets
