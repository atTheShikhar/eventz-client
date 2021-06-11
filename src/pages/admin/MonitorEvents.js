import { Container,Divider } from '@material-ui/core';
import React, { useContext, useEffect, } from 'react'
import { ComponentContext, DataContext } from '../../context/Context';
import useStyles from './Styles';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomSelect from '../../components/inputs/CustomSelect';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { submitFormdata } from '../../helpers/submitFormdata';
import { useHistory } from 'react-router';

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
    const {setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const history = useHistory();
    const selectData = ["Pending","Approved","All"];

    useEffect(() => {
        return function() {
            setEvents(null);
        }
    },[]);
    const approveHandler = async (item) => {
        const url = "/api/admin/approve/event"

        const status = await submitFormdata({id: item._id, action: "Approve"},
            history,setFeedback,setButtonDisabled,url,null
        ) 

        if(status === "success")
        {
            const newData = events.events.map(msg => {
                if(msg._id === item._id) 
                    return {...msg,status: "approved"}
                else 
                    return msg;
            })
            setEvents({length: newData.length, events: newData});
        }
    }

    const deleteHandler = async (item) => {
        const url = "/api/admin/delete/event"

        const status = await submitFormdata({id: item._id, action: "Delete"},
            history,setFeedback,setButtonDisabled,url,null
        ) 

        if(status === "success")
        {
            const newData = events.events.filter(msg => (msg._id !== item._id))
            setEvents({length: newData.length, events: newData});
        }
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={classes.vpadding}>
                <h1>Events</h1>
                <div className={`${classes.flex}`}>
                    <CustomSelect 
                        page={1}
                        selectData={selectData} 
                        selectHandler={setEvents} 
                        label="Event Type"
                        url={"/api/admin/events"}
                        dataHandler={fetchDataAuth}
                    />
                </div>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />

            <Container className={classes.widthScreen}>
                {
                    events!==null ?
                    (<CustomTable
                        headerArray={headerArray}
                        dataNameArray={dataNameArray}
                        dataArray={events.events}
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
                    (<div>
                        No Data
                    </div>)
                }
            </Container>
        </div>
    )
}

export default MonitorEvents
