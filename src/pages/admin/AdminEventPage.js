import { ButtonGroup, Card,CardActions,CardContent,
    CardMedia,Collapse, Container,
    Grid,IconButton,Button
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { ComponentContext } from '../../context/Context';
import { fetchData } from '../../helpers/fetchData';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './Styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import EventDetailsInputs from '../../components/createEvents/EventDetailsInputs';
import AddressDetailsInputs from '../../components/createEvents/AddressDetailsInputs';
import OrganiserDetailsInputs from '../../components/createEvents/OrganiserDetailsInputs';
import ProgressBar from '../../components/dataDisplay/ProgressBar';
import noImage from '../../assets/no-image.jpg'
import SubmitButton from '../../components/buttons/SubmitButton';
import { approveDeleteEvent, updateEvent } from '../../helpers/manageEvent';

function AdminEventPage(props) {
    const {id} = useRouteMatch().params; 
    const history = useHistory();
    const classes = useStyles();
    const {setFeedback,setButtonDisabled,setDialog} = useContext(ComponentContext);

    const [showForm,setShowForm] = useState({
        eventForm: true,
        addressForm: false,
        organiserForm: false
    });
    const [disabled,setDisabled] = useState(false);
    const [details,setDetails] = useState({
        //Event Details
        eventTitle: "", eventDescription: "", noOfPeople: "Upto 100",
        duration: "1 Hr", isFree: "Yes", price: "",
        eventDate: "", eventTime: "12:00", eventGenre: "Seminars",
        //Address Details
        apartment: "", street: "", pinCode: "", district: "Nicobar", 
        countryStateName: "Andaman and Nicobar Islands", country: "India",
        //Organiser Details
        organiserName: "", phone: "",
        email: "", organisationName: ""
    });
    const [eventMetadata,setEventMetadata] = useState({
        status: "",imageLocation: noImage,_id: "",
        created_at: "",createdBy: "", updated_at: "",
        bookedTickets: 0,totalTickets: 0
    });

    
    useEffect(() => {
        const fetchEventData = async () => {
            const url = `/api/admin/event/${id}`
            const data = await fetchData(url,setFeedback,history);
            const ticketsCountUrl = `/api/admin/event/get-tickets-count/${id}`;
            const ticketData = await fetchData(ticketsCountUrl,setFeedback,history);

            const {
                eventDetails,eventAddress,eventOrganiser,status,
                imageLocation,createdBy,_id,created_at,updated_at
            } = data;

            if(new Date(eventDetails?.dateAndTime) < new Date())
                await setDisabled(true);

            await setEventMetadata({
                status,createdBy,_id,
                created_at: new Date(created_at).toLocaleString(),
                updated_at: new Date(updated_at).toLocaleString(),
                bookedTickets: ticketData?.bookedTickets,
                totalTickets: ticketData?.totalTickets,
                imageLocation: (imageLocation == null || imageLocation?.length === 0) ? 
                    noImage : imageLocation
            })

            await setDetails(
                {
                    eventTitle: eventDetails?.title,
                    eventDescription: eventDetails?.description,
                    noOfPeople: eventDetails?.noOfPeople,
                    duration: eventDetails?.duration,
                    isFree: eventDetails?.isFree,
                    price: eventDetails?.price,
                    eventDate: new Date(eventDetails?.dateAndTime).toJSON().split('T')[0],
                    eventTime: new Date(eventDetails?.dateAndTime).toLocaleTimeString(),
                    eventGenre: eventDetails?.genre,
                    
                    apartment: eventAddress?.apartment,
                    street: eventAddress?.street,
                    pinCode: eventAddress?.pincode,
                    district: eventAddress?.district,
                    countryStateName: eventAddress?.stateName,
                    country: eventAddress?.country,

                    organiserName: eventOrganiser?.organiserName,
                    phone: eventOrganiser?.phone,
                    email: eventOrganiser?.email,
                    organisationName: eventOrganiser?.orgName
                }
            );
        }
        fetchEventData();
    },[])

    const showFormHandler = (name) => {
        setShowForm(showForm => ({...showForm,[name]: !showForm[name]}))
    }

    const handleChange = input => e => {
        setDetails({
            ...details,
            [input]: e.target.value
        });
    }

    const submitHandler = async (updateField) => {
        await updateEvent(id,updateField,details,setFeedback,setButtonDisabled,history);
        await window.location.reload();
    }

    const approveDeleteHandler = async (action) => {
        await approveDeleteEvent(id,history,setFeedback,
            setButtonDisabled,setDialog,action,null
        );
        if(action === "approve")
            await setEventMetadata((eventMetadata) => ({
                ...eventMetadata,
                status: "approved"
            }))
    }
    
    //POST: '/api/admin/event/update body: {eventId,updateField,update}
    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="md">
            <Grid container direction="row" spacing={2}>

            <Grid item xs={5}>
                <Card>

                    <CardMedia
                        src={eventMetadata.imageLocation}
                        title="Event Poster"
                        component="img"
                    />

                    <CardContent>
                        <div className={classes.subHeadingText}>
                            <strong>Status: </strong>
                            <span
                                style={{
                                    color: eventMetadata.status === "approved" ? "green" : "red"  
                                }}
                            >
                                {eventMetadata.status}
                            </span>
                        </div>
                        <div className={classes.subHeadingText}>
                            <strong>Created At: </strong><span>{eventMetadata.created_at}</span>
                        </div>
                        <div className={classes.subHeadingText}>
                            <strong>Updated At: </strong><span>{eventMetadata.updated_at}</span>
                        </div>

                        <br/>
                        <Grid container direction="row" justify="space-between" >
                            <Grid item className={classes.subHeadingText}>
                                Tickets Booked: 
                            </Grid>
                            <Grid item className={classes.subHeadingText}>
                                {eventMetadata.bookedTickets} of {eventMetadata.totalTickets}
                            </Grid>
                        </Grid>

                        <ProgressBar
                            value={(eventMetadata.bookedTickets/eventMetadata.totalTickets) * 100}
                        />
                    </CardContent>

                    <CardActions className={classes.flex}>
                        <ButtonGroup variant="contained" disableElevation>

                            <Button 
                                color="primary" 
                                onClick={() => {approveDeleteHandler("approve")}}
                            >
                                Approve
                            </Button>
                            <Button 
                                color="secondary"
                                onClick={() => {approveDeleteHandler("delete")}}
                            >
                                Delete
                            </Button>
                            <Button 
                                color="primary" 
                                onClick={() => {
                                    history.push(
                                        `/admin/event/bookings/${id}`,
                                        {
                                            userId: eventMetadata.createdBy,
                                            title: details.eventTitle,
                                            price: details?.price,
                                            bookedTickets: eventMetadata.bookedTickets
                                        }
                                    )
                                }}
                            >
                                Bookings
                            </Button>

                        </ButtonGroup>
                    </CardActions>

                </Card>
            </Grid>
            <Grid item xs={7}>

                <Card>
                    <CardActions>

                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <h2 className={classes.subHeadingText}>Event Details</h2>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => showFormHandler("eventForm")}>
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>


                    </CardActions>
                    
                    <Collapse in={showForm.eventForm} timeout="auto" unmountOnExit>
                        <CardContent>

                        <Container maxWidth="sm">
                            <ValidatorForm 
                                onSubmit={() => {submitHandler('eventDetails')}} 
                                instantValidate={false}
                            >
                            <Grid 
                                container 
                                spacing={1} 
                            >
                                    <EventDetailsInputs
                                        handleChange={handleChange}
                                        details={details}
                                        disabled={disabled}
                                    />
                                    <Grid item xs={12}>
                                        <SubmitButton fullWidth={true}
                                            disabled={disabled}
                                        >
                                            Update Event Details
                                        </SubmitButton>
                                    </Grid>
                            </Grid>
                            </ValidatorForm>
                        </Container>

                        </CardContent>
                    </Collapse>
                </Card>

                <Card className={classes.vmargin}>
                    <CardActions>

                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <h2 className={classes.subHeadingText}>Address Details</h2>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => showFormHandler("addressForm")}>
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>


                    </CardActions>

                    <Collapse in={showForm.addressForm} timeout="auto" unmountOnExit>
                        <CardContent>

                            <Container maxWidth="sm">
                                <ValidatorForm 
                                    onSubmit={() => {submitHandler("eventAddress")}} 
                                    instantValidate={false}
                                >
                                <Grid 
                                    container 
                                    spacing={1} 
                                >
                                    <AddressDetailsInputs
                                        handleChange={handleChange}
                                        details={details}
                                        disabled={disabled}
                                    />
                                    <Grid item xs={12}>
                                        <SubmitButton fullWidth={true}
                                            disabled={disabled}
                                        >
                                            Update Address Details
                                        </SubmitButton>
                                    </Grid>
                                </Grid>
                                </ValidatorForm>
                            </Container>

                        </CardContent>
                    </Collapse>
                </Card>

                <Card>
                    <CardActions>

                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <h2 className={classes.subHeadingText}>Organiser Details</h2>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => showFormHandler("organiserForm")}>
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>


                    </CardActions>
                    <Collapse in={showForm.organiserForm} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Container maxWidth="xs">
                                <ValidatorForm 
                                    onSubmit={() => {submitHandler('eventOrganiser')}} 
                                    instantValidate={false}
                                >
                                <Grid 
                                    direction="column"
                                    container 
                                    spacing={1} 
                                >
                                    <OrganiserDetailsInputs
                                        handleChange={handleChange}
                                        details={details}
                                        disabled={disabled}
                                    /> 
                                    <Grid item xs={12}>
                                        <SubmitButton fullWidth={true}
                                            disabled={disabled}
                                        >
                                            Update Address Details
                                        </SubmitButton>
                                    </Grid>
                                </Grid>
                                </ValidatorForm>
                            </Container>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            </Grid>
            </Container> 
        </div>
    )
}

export default AdminEventPage
