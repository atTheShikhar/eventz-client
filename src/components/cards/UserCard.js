import {
    Card,CardContent,Avatar, CardActions, 
    Grid, Button, ButtonGroup,Divider
} from '@material-ui/core';
import personImage from '../../assets/person.png'

function UserCard(props) {
    const {classes,imageLocation,name,
        email,joinedOn,actions
    } = props;

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

                {(actions) ? 
                    (<>
                        <Divider variant="middle"/>
                        <CardActions>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid item>
                                    <ButtonGroup variant="contained" disableElevation>
                                        {
                                            actions.map((item,idx) => (
                                                <Button 
                                                    key={item.name} 
                                                    onClick={item.clickHandler} 
                                                    color={item?.color ?? 'primary'}
                                                >
                                                    {item.name}
                                                </Button>  
                                            ))
                                        }
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </>) :
                    (<></>)                
                }
            
            </Card>
        </>
    )
}

export default UserCard
