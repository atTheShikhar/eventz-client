import { Container,Divider, Grid } from '@material-ui/core';
import React, { useContext, useEffect, } from 'react'
import { ComponentContext, DataContext } from '../../context/Context';
import useStyles from './Styles';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomSelect from '../../components/inputs/CustomSelect';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { submitFormdata } from '../../helpers/submitFormdata';
import { useHistory } from 'react-router';
import NotFound from '../../components/NotFound';

const headerArray = [
    { id: 'title', label: 'Title' },
    { id: 'address', label: 'Address' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'price', label: 'Price' },
    { id: 'organiserName', label: 'Organised By' },
    { id: 'organiserContact', label: 'Organiser Contact' },
    { id: 'status', label: "Status"},
    { id: 'actions', label: 'Actions' },
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function MonitorEvents() {
    const classes = useStyles();
    const {events,setEvents} = useContext(DataContext);
    const {setDialog,setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const history = useHistory();
    const selectData = ["Pending","Approved","All"];

    useEffect(() => {
        return function() {
            setEvents(null);
        }
    },[]);

    const approveHandler = async (item) => {
        async function actionYes() {
            const url = "/api/admin/approve/event"
    
            const status = await submitFormdata({id: item._id, action: "Approve"},
                history,setFeedback,setButtonDisabled,url,null
            ) 
    
            if(status === "success")
            {
                const newData = events.map(msg => {
                    if(msg._id === item._id) 
                        return {...msg,status: "approved"}
                    else 
                        return msg;
                })
                setEvents(newData);
            }
        }

        setDialog({
            open: true,
            title: "Confirm Approval",
            message: "Are you sure you want to approve this event?",
            actionYes: actionYes,
            actionNo: function() {
            }
        });
    }

    const deleteHandler = async (item) => {
        async function actionYes() {
            const url = "/api/admin/delete/event"
    
            const status = await submitFormdata({id: item._id, action: "Delete"},
                history,setFeedback,setButtonDisabled,url,null
            ) 
    
            if(status === "success")
            {
                const newData = events.filter(msg => (msg._id !== item._id))
                setEvents(newData);
            }
        }

        setDialog({
            open: true,
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this event?",
            actionYes: actionYes,
            actionNo: function() {
            }
        });
    }

    const setEventData = (data) => {
        setEvents(data.events)
    }
    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={classes.vpadding}>
                <Grid container direction="row" justify="space-between" alignItems="center">

                <h1>Events</h1>
                <div className={`${classes.flex}`}>
                    <CustomSelect 
                        page={1}
                        selectData={selectData} 
                        selectHandler={setEventData} 
                        label="Event Type"
                        url={"/api/admin/events"}
                        dataHandler={fetchDataAuth}
                        />
                </div>
                </Grid>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />

            <Container className={classes.widthScreen}>
                {
                    (events!==null && events.length!==0) ?
                    (<CustomTable
                        headerArray={headerArray}
                        dataNameArray={dataNameArray}
                        dataArray={events}
                        actions={[
                            {
                                name: "Approve",
                                clickHandler: approveHandler
                            },
                            {
                                name: "View",
                                clickHandler: () => {}
                            },
                            {
                                name: "Delete",
                                clickHandler: deleteHandler
                            }
                        ]}
                    />) :
                    (
                        <NotFound/>
                    )
                }
            </Container>
        </div>
    )
}

export default MonitorEvents
