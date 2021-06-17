import React, { useContext,useEffect, useState } from 'react'
import { ComponentContext } from '../../context/Context'
import useStyles from './Styles';
import {Container,Divider} from '@material-ui/core';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { useHistory } from 'react-router';
import { submitFormdata } from '../../helpers/submitFormdata';
import NotFound from '../../components/NotFound';
import CustomDialog from '../../components/feedback/CustomDialog';

const headerArray = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'createdEvents', label: 'Events Created'},
    { id: 'bookedEvents', label: 'Events Booked'},
    { id: 'actions', label: 'Actions' },
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function MonitorUsers() {
    const [userdata,setUserdata] = useState(null);
    const {setFeedback,setDialog} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        const getUsers = async () => {
            const url = '/api/admin/users';
            const data = await fetchDataAuth(url,setFeedback,history,null);
            setUserdata(data.users);
        }
        getUsers();
    },[])
        
    const deleteHandler = async (item) => {
        // const url = "/api/admin/delete/message"
        // const status = await submitFormdata({id: item._id},
        //     history,setFeedback,setButtonDisabled,url,null
        // ) 
        setDialog({
            open: true,
            title: "Comfirm Deletion",
            message: "Are you sure you want to delete this?",
            actionYes: function() {
                console.log('yes')
            },
            actionNo: function() {
                console.log("No")
            }
        });
        // if(status === "success")
        // {
        //     const newData = messages.filter(msg => (msg._id !== item._id))
        //     setMessages(newData);
        // }
    }
    const viewHandler = (item) => {
        // history.push(`/admin/message/${item._id}`,item) 
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={`${classes.vpadding}`}>
                <h1>Users</h1>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />
            
            <Container maxWidth="lg">
            {
                (userdata!==null && userdata.length!==0 )? 
                (<CustomTable 
                    headerArray={headerArray}
                    dataNameArray={dataNameArray}
                    dataArray={userdata}
                    actions={[
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

export default MonitorUsers
