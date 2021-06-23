import { Container,Divider, Grid } from '@material-ui/core';
import React, { useContext, useEffect, } from 'react'
import { ComponentContext, DataContext } from '../../context/Context';
import useStyles from './Styles';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomSelect from '../../components/inputs/CustomSelect';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { useHistory } from 'react-router';
import NotFound from '../../components/NotFound';
import { approveDeleteEvent } from '../../helpers/manageEvent';

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
    const selectData = ["All","Approved","Pending"];

    useEffect(() => {
        return function() {
            setEvents(null);
        }
    },[]);

    const approveHandler = async (item) => {
        const updateList = {
            events: events,
            setEvents: setEvents
        };
        await approveDeleteEvent(item._id,history,setFeedback,setButtonDisabled,
            setDialog,"approve",updateList
        )
    }

    const deleteHandler = async (item) => {
        const updateList = {
            events: events,
            setEvents: setEvents
        };
        await approveDeleteEvent(item._id,history,setFeedback,
            setButtonDisabled,setDialog,"delete",updateList
        )
    }

    const viewHandler = (item) => {
        history.push(`/admin/event/${item._id}`)
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
                                clickHandler: viewHandler
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
