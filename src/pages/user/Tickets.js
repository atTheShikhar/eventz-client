import { Box, Card, CardContent, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import QRCode from 'react-qr-code'

const useStyles = makeStyles(theme => ({
    bgGrey: {
        backgroundColor: "#fafafa",
        minHeight: "90vh"
    },
    vpadding: {
        paddingTop: "30px",
        paddingBottom: "30px"
    },
    vmargin: {
        marginTop: "30px",
        marginBottom: "30px"
    },
}));

function Tickets(props) {
    const {count,tickets} = props.location.state;
    const classes = useStyles()
    return (
        <div className={`${classes.bgGrey} ${classes.vpadding}`}>
            <Container maxWidth="md" >
                <h2 className={classes.vmargin}>Your Tickets</h2>
                <Grid container spacing={2}>
                    {
                        tickets.map((item,index) => {
                            return (
                                <Grid item key={item._id}>
                                    <Card variant="outlined" raised={false}>
                                        <CardContent>
                                            <Box maxWidth="100%">
                                                <QRCode value={item._id}/>
                                            </Box>
                                            <div>
                                                <h2>Ticket ID:</h2>
                                                <div>{item._id}</div>
                                            </div>                                                                                        
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )            
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Tickets
