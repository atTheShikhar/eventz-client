import { Avatar, Button, ButtonGroup, Card, 
    CardContent, Collapse, Container,Badge   
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import {useHistory} from 'react-router';
import Textbox from '../../components/inputs/Textbox';
import { regexText, textErr, reqErr } from '../../helpers/validators'
import personImage from '../../assets/person.png';
import uploading from '../../assets/uploading.gif';
import useStyles from './Styles';
import SubmitButton from '../../components/buttons/SubmitButton';
import { ComponentContext } from '../../context/Context';
import { submitFormdata } from '../../helpers/submitFormdata';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import imageUploadHandler from '../../helpers/imageUploadHandler';

const EditButton = withStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
    }
  },
}))(Avatar);

function Profile(props) {
    const [userData,setUserData] = useState(null);
    const [profileImage,setProfileImage] = useState(personImage);
    const {setButtonDisabled,setFeedback} = useContext(ComponentContext);
    const history = useHistory();
    const [formData,setFormData] = useState({
        fname: "",
        lname: ""
    })
    const [reload,setReload] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await axios.get(`/api/user`);
                setUserData(data.user);
                setProfileImage(data.user.imageLocation);
                setFormData({fname: data.user.name.fname, lname: data.user.name.lname})
            } catch(e) {
                console.log(e);
            }
        }
        getUserInfo();
    },[reload]);


    const showEditHandler = e => {
        setShowEdit(showEdit => !showEdit)
    }
    const handleChange = name => e => {
        setFormData({
            ...formData,
            [name]: e.target.value
        })
    }
    const submitHandler = async (e) => {
        const url = "/api/update/user";
        const status = await submitFormdata(formData,history,
            setFeedback,setButtonDisabled,
            url,null
        );
        if(status === "success") {
            setReload(reload => !reload)
        }
    }
    const uploadImage = async (e) => {
        if(e.target.files.length) {
            const status = await imageUploadHandler(
                "/api/user/upload",
                e.target.files[0],
                "profilePic",
                history,
                setFeedback,
                (e) => {
                    setProfileImage(uploading);
                }
            )
            if(status === "success") {
                setProfileImage(URL.createObjectURL(e.target.files[0]))
            }
        }
    }

    return (
        <div className={`${classes.bgColor} ${classes.vpadding}`}>
            <Container maxWidth="sm">
                <Card variant="outlined" raised={false} className={classes.roundedCard}>
                    <CardContent className={classes.flexColumn}>
                        
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <>
                                    <label 
                                        htmlFor="imageSelector"
                                    >
                                        <EditButton>
                                            <PhotoCameraIcon/>
                                        </EditButton>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/gif"
                                        id="imageSelector"
                                        style={{display: "none"}}
                                        onChange={uploadImage}
                                    />
                                </>
                            }
                        >
                            <Avatar 
                                src={profileImage} 
                                alt="My Profile Picture"
                                className={classes.imageAvatar}
                            />
                        </Badge>
                        <h1 className={classes.heading}>
                            {userData?.name?.fname} {userData?.name?.lname}
                        </h1>
                        <div className={classes.subHeading}>
                            {userData?.email}
                        </div>
                        
                        <Collapse in={showEdit} 
                            timeout="auto" 
                            unmountOnExit
                            style={{
                                width: "80%"
                            }}
                        >
                            <ValidatorForm 
                                onSubmit={submitHandler} 
                                instantValidate={true}
                            >
                                <Textbox 
                                    label="First Name"
                                    name="fname"
                                    value={formData.fname}
                                    onChange={handleChange('fname')}
                                    validators={['required', regexText]}
                                    errorMessages={[reqErr,textErr]}
                                />
                                <Textbox
                                    label="Last Name"
                                    name="lname"
                                    required={false}
                                    value={formData.lname}
                                    onChange={handleChange('lname')}
                                    validators={[regexText]}
                                    errorMessages={[textErr]}
                                />
                                <SubmitButton
                                    className={classes.vmargin}
                                    disableElevation
                                >
                                    Submit
                                </SubmitButton>
                            </ValidatorForm>
                        </Collapse>

                        <ButtonGroup
                            variant="contained"
                            disableElevation
                            className={classes.vmargin}
                        >
                            <Button  
                                color="primary"
                                className={classes.button}
                                onClick={() => {history.push("/user/changepassword")}}
                            >
                                Change Password
                            </Button>

                            <Button onClick={showEditHandler} 
                                color={!showEdit ? "primary" : "secondary"}
                            >
                                {!showEdit ? "Edit" : "Cancel"}
                            </Button>
                        </ButtonGroup>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default Profile
