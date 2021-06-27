import React, { useContext, useState, } from 'react'
import { DataContext,ComponentContext } from '../../context/Context'
import useStyles from './Styles';
import CustomSelect from '../../components/inputs/CustomSelect';
import {Container,Divider,Grid} from '@material-ui/core';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { useHistory } from 'react-router';
import { submitFormdata } from '../../helpers/submitFormdata';
import NotFound from '../../components/NotFound';
import SearchBar from '../../components/inputs/SearchBar';

const headerArray = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'subject', label: 'Subject' },
    { id: 'messageType', label: 'Type' },
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'actions', label: 'Actions' },
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function Messages() {
    const {messages,setMessages} = useContext(DataContext);
    const [search,setSearch] = useState(""); 
    const {setFeedback,setButtonDisabled,setDialog} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
        
    const selectData = ["All","Feedback","Question"]

    const deleteHandler = (item) => {

        async function actionYes() {
            const url = "/api/admin/delete/message"
    
            const status = await submitFormdata({id: item._id},
                history,setFeedback,setButtonDisabled,url,null
            ) 
    
            if(status === "success")
            {
                const newData = messages.filter(msg => (msg._id !== item._id))
                setMessages(newData);
            }
        } 

        setDialog({
            open: true,
            title: "Comfirm Deletion",
            message: "Are you sure you want to delete this?",
            actionYes: actionYes,
            actionNo: function() {
            }
        });
    }
    const viewHandler = (item) => {
        history.push(`/admin/message/${item._id}`,item) 
    }
    const setMessageData = (data) => {
        setMessages(data.messages);
    }
    const searchHandler = (query) => {
        setSearch(query);
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={`${classes.vpadding}`}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                <h1 className={classes.headingText}>Messages</h1>

                <SearchBar
                    submitHandler={searchHandler}
                />

                <div className={`${classes.flex}`}>
                    <CustomSelect 
                        page={1}
                        selectData={selectData} 
                        selectHandler={setMessageData} 
                        label="Message Type"
                        url={"/api/admin/messages"}
                        dataHandler={fetchDataAuth}
                        search={search}
                    />
                </div>
                </Grid>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />
            
            <Container maxWidth="lg">
            {
                (messages!==null && messages.length!==0 )? 
                (<CustomTable 
                    headerArray={headerArray}
                    dataNameArray={dataNameArray}
                    dataArray={messages}
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

export default Messages
