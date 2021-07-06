import { Card, CardContent, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { ComponentContext } from '../context/Context';
import { fetchDataAuth } from '../helpers/fetchData';
import { useHistory } from 'react-router';
import CustomTable from './dataDisplay/CustomTable';
import NotFound from './NotFound';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontWeight: "500",
        color: theme.palette.grey[700],
        padding: "10px"
    },
}))

const headerArray = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'joinedOn', label: 'Joined On' },
    { id: 'ticketCount', label: 'Ticket Count'},
    { id: 'actions', lable: 'Actions'}
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function Attendants(props) {
    const {eventId,load,url,header,actions} = props;
    const {setFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    const [userdata,setUserdata] = useState([]);
    const [totalAttendants,setTotalAttendants] = useState(0);

    useEffect(() => {
        const getAttendants = async () => {
            const postData = {eventId};
            const data = await fetchDataAuth(url,setFeedback,history,postData);
            if(data.length > 0) {
                const count = data?.reduce((total,user) => {
                    return total+=user?.ticketCount;
                },0)
                await setTotalAttendants(count);
                await setUserdata(data);
            }
        }
        getAttendants();
    },[load]);

    return (
        <>
            {
                (userdata?.length > 0) ?
                (
                    <>
                    <Card variant="outlined" style={{marginBottom: "10px"}}>
                        <h2
                            className={classes.heading}
                        >
                            {header || "Total: "} {totalAttendants}
                        </h2>
                    </Card>
                    <CustomTable
                        headerArray={headerArray}
                        dataNameArray={dataNameArray}
                        dataArray={userdata}
                        actions={actions}
                    />
                    </>
                ):
                (
                    <NotFound/>
                )
            }
        </>
    )
}

export default Attendants
