import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from '../pages/FormStyle';
import bgImage from '../assets/not_found.svg'

const bgStyles = makeStyles(theme => ({
    bgImage: {
        width: "100%",
        height: "auto"
    },
    bgText: {
        marginTop: theme.spacing(3)
    }
}));

function NotFound() {
    const classes = useStyles();
    const bgClasses = bgStyles();
    return (
        <div className={`${classes.page} ${classes.container}`}>
            <Container maxWidth='sm'>
                <img src={bgImage} alt="man creating an event" className={bgClasses.bgImage} />
                <Container className={classes.container}>
                    <Typography
                        variant='h4'
                        align="center"
                        color="textSecondary"
                        className={bgClasses.bgText}
                    >
                        Sorry, Nothing Found :(
                    </Typography>
                </Container>
            </Container>
        </div>
    )
}

export default NotFound
