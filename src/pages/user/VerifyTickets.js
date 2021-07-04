import { Container, Grid,Card, CardContent, Divider, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/inputs/Textbox';
import useStyles from './Styles';

function VerifyTickets(props) {
    const eventId = props?.match?.params?.eventId;
    const classes = useStyles();
    const [ticketId,setTicketId] = useState("");

    const changeHandler = async (e) => {
        await setTicketId(e.target.value);
    }

    const submitHandler = () => {
        console.log(ticketId);
    }

    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={4}>
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
                                    />
                                    <SubmitButton>
                                        Check
                                    </SubmitButton>
                                </ValidatorForm>
                                
                                <Divider variant="middle" component="div"/>
                                <div>OR</div>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                >
                                    Scan QR Code
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default VerifyTickets
