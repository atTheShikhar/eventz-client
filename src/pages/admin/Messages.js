import React, { useContext, } from 'react'
import { DataContext,ComponentContext } from '../../context/Context'
import useStyles from './Styles';
import CustomSelect from '../../components/inputs/CustomSelect';
import {Container,Divider} from '@material-ui/core';
import { fetchDataAuth } from '../../helpers/fetchData';
import CustomTable from '../../components/dataDisplay/CustomTable'
import { useHistory } from 'react-router';
import { submitFormdata } from '../../helpers/submitFormdata';

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
    const {setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
        
    const selectData = ["All","Feedback","Question"]

    const deleteHandler = async (item) => {
        const url = "/api/admin/delete/message"

        const status = await submitFormdata({id: item._id},
            history,setFeedback,setButtonDisabled,url,null
        ) 

        if(status === "success")
        {
            const newData = messages.messages.filter(msg => (msg._id !== item._id))
            setMessages({length: newData.length, messages: newData});
        }
    }
    const viewHandler = (item) => {
        history.push(`/admin/message/${item._id}`,item) 
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={`${classes.vpadding}`}>
                <h1>Messages</h1>
                <div className={`${classes.flex}`}>
                    <CustomSelect 
                        page={1}
                        selectData={selectData} 
                        selectHandler={setMessages} 
                        label="Message Type"
                        url={"/api/admin/messages"}
                        dataHandler={fetchDataAuth}
                    />
                </div>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />
            
            <Container maxWidth="lg">
            {
                messages!==null ? 
                (<CustomTable 
                    headerArray={headerArray}
                    dataNameArray={dataNameArray}
                    dataArray={messages.messages}
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
                (<div>
                        No Data
                </div>)
            }        
            </Container>
        </div>
    )
}

export default Messages
