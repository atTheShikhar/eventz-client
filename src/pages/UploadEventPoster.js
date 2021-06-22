import { Button, Card, CardContent, Container, Divider, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router';
import SubmitButton from '../components/buttons/SubmitButton';
import { ComponentContext } from '../context/Context';
import { onlyImage,imageErr,maxSizeMB,maxSizeMBErr } from '../helpers/validators';
import {successHandler,errorHandler} from "../helpers/feedbackHandler";

const useStyles = makeStyles(theme => ({
    div: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#fafafa"
    },
    card: {
        borderRadius: "10px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        marginTop: "10px",
        marginBottom: "30px"
    },
    vmargin: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}))

function UploadEventPoster({match}) {
    const {setButtonDisabled,setFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    const [image,setImage] = useState();

    const submitHandler = async (e) => {
        setButtonDisabled(true);
        let formData = new FormData();
        formData.append('eventPoster',image);
        try {
            const response = await axios.post(`/api/events/upload-image/${match.params.id}`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            successHandler(response,setFeedback,() => {
                setButtonDisabled(false);
                history.push('/user/myevents');
            })
        } catch(err) {
            setButtonDisabled(false);
            errorHandler(err,history,setFeedback)
        }
    }

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={classes.div}>
            <Container maxWidth="sm">
                <Card
                    raised={false}
                    variant="outlined"
                    className={classes.card}
                >
                    
                    <CardContent>
                        <h2>Upload a poster for your event</h2>

                        <Divider variant="middle" className={classes.divider} />

                        <ValidatorForm 
                            onSubmit={submitHandler} 
                            instantValidate={true} 
                            className={`${classes.form}`}>

                            <TextValidator
                                label="Upload Image"
                                InputLabelProps={{shrink: true}}
                                type="file"
                                inputProps={{accept: "image/png,image/jpeg,image/webp"}}
                                variant="outlined"
                                validators={['isFile',onlyImage,maxSizeMB(2)]}
                                errorMessages={["Invalid File!",imageErr,maxSizeMBErr(2)]}
                                // value={image}
                                onChange={changeHandler}
                            />                    

                            <div className={classes.vmargin}>
                                <Button
                                    onClick={() => history.push('/')}
                                >
                                    Skip
                                </Button>

                                <SubmitButton 
                                    fullWidth={false}
                                >
                                    Upload
                                </SubmitButton>
                            </div>

                        </ValidatorForm>
                    </CardContent>

                </Card>
            </Container>
        </div>       
    )
}

export default UploadEventPoster
