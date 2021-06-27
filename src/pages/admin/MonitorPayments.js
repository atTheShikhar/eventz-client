import { Container,Divider, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './Styles';
import { fetchData } from '../../helpers/fetchData';
import CustomSelect from '../../components/inputs/CustomSelect';
import CustomTable from '../../components/dataDisplay/CustomTable'
import NotFound from '../../components/NotFound';
import { useHistory } from 'react-router';
import SearchBar from '../../components/inputs/SearchBar';

const headerArray = [
    { id: 'name', label: 'Name'},
    { id: 'email', label: 'Email'},
    { id: 'amount_paid', label: 'Paid (INR)' },
    { id: 'amount_due', label: 'Due (INR)' },
    { id: 'ticket_count', label: "Tickets"},
    { id: 'title', label: 'Event'},
    { id: 'updated_at', label: 'Date'},
    { id: 'payment_status', label: "Status"},
    { id: 'actions', label: 'Actions' },
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function MonitorPayments() {

    const selectData = ["all","captured","pending","failed"];

    const classes = useStyles();
    const history = useHistory();
    const [payments,setPayments] = useState([]);
    const [search,setSearch] = useState("");

    const setPaymentData = (item) => {
        const paymentData = item?.map(item => ({
            ...item,
            updated_at: new Date(item.updated_at).toLocaleString(),
            created_at: new Date(item.created_at).toLocaleString(),
            joinedOn: new Date(item.joinedOn).toLocaleString()
        }))
        setPayments(paymentData);
    }

    const viewHandler = (item) => {
        history.push('/admin/payment/details',item);
    }

    const searchHandler = (query) => {
        setSearch(query);
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={classes.vpadding}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <h1 className={classes.headingText}>Payments</h1>

                    <SearchBar
                        submitHandler={searchHandler}
                    />

                    <div className={`${classes.flex}`}>
                        <CustomSelect 
                            page={1}
                            selectData={selectData} 
                            selectHandler={setPaymentData} 
                            label="Payment Type"
                            url={"/api/admin/payments"}
                            dataHandler={fetchData}
                            search={search}
                        />
                    </div>
                </Grid>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />

            <Container className={classes.widthScreen}>
                {
                    (payments.length!==0) ?
                    (<CustomTable
                        headerArray={headerArray}
                        dataNameArray={dataNameArray}
                        dataArray={payments}
                        actions={[
                            {
                                name: "View",
                                clickHandler: viewHandler
                            },
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

export default MonitorPayments
