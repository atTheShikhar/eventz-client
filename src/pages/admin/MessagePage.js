import { Card, CardContent, Chip, Container, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router';
// import SubNav from '../../components/navbar/SubNav';
import useStyles from './Styles'

function MessagePage(props) {
    const classes = useStyles();
    const { id } = useParams();
    const {name,email,subject,messageType,message,time,date} = props?.location?.state;
    console.log(id);
    return (
    <>
        {/* <SubNav title="Message Page" /> */}
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="md">
                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <Card variant="outlined" raised={false}>
                            <CardContent>
                            <h2 className={classes.headingText}>
                                {name}
                            </h2>
                            <Divider variant="middle" className={classes.vmargin}/>
                            <div
                                className={classes.subHeadingText}
                            >
                                Email: {email}
                            </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card variant="outlined" raised={false}>
                            <CardContent>
                                <Grid container direction="row" justify="space-between" alignItems="center">

                                <div>
                                    <h1 className={classes.headingText}>{subject}</h1>
                                    <Typography
                                        variant="body1"
                                        className={classes.subHeadingText}
                                        >
                                        Time: {time}, Date: {date}
                                    </Typography>
                                </div>

                                <Chip 
                                    label={messageType} 
                                    variant="outlined" 
                                    color={messageType === "Question" ? "secondary":"primary"} 
                                />

                                </Grid>

                                <Divider variant="middle" className={classes.vmargin}/>

                                <Typography component="main" className={classes.bodyText}>
                                    {message}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </div>
    </>
    )
}

export default MessagePage
