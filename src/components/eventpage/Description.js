import { Card, CardContent, Container, Divider, Typography } from '@material-ui/core'
import useStyles from './Styles'
import React from 'react'

function Description(props) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card
                variant="outlined"
            >
                <CardContent>
                    <h3>Event Description</h3>
                    <Divider 
                        variant="middle"
                        className={classes.vmargin}
                    />
                    <Typography variant="body1" gutterBottom>
                        {props.description}
                    </Typography>
                </CardContent> 
            </Card>
        </Container>
    )
}

export default Description
