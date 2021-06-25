import React from 'react'
import {
    Card,CardContent,Avatar
} from '@material-ui/core';
import personImage from '../../assets/person.png'

function UserCard(props) {
    const {classes,imageLocation,name,email,joinedOn} = props;
    const image = imageLocation ?? personImage;
    return (
        <>
            <Card variant="outlined" raised={false} className={classes.roundedCard}>
                <CardContent className={classes.flexColumn}>
                        <Avatar 
                            src={image} 
                            alt="My Profile Picture"
                            className={classes.imageAvatar}
                        />

                        <h1 className={classes.headingText}>
                            {name}
                        </h1>
                        <div className={classes.subHeadingText}>
                            {email}
                        </div>
                        <div className={classes.subHeadingText}>
                            Joined on: {joinedOn}
                        </div>
                </CardContent>
            </Card>
        </>
    )
}

export default UserCard
