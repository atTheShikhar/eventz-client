import { 
    Button,
    AppBar,
    Toolbar,
    makeStyles,
    IconButton,
    Typography,
    useScrollTrigger,
    Slide,
    Hidden
} from '@material-ui/core';
import MenuButton from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/SearchOutlined';
import PropTypes from 'prop-types';
import React,{useContext} from 'react'
import {
    Link,
    useHistory,
} from 'react-router-dom';
import { logout } from '../../helpers/auth';
import { UserContext } from "../../context/Context";
// import FlatButton from '../buttons/FlatButton';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#20232a",
        minHeight: "12vh"
    },
    toolbar: {
        width: "100%",
        maxWidth: theme.breakpoints.width("lg"),
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemsGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "& > *": {
            marginRight: "10px"
        },
        "& > *:last-child": {
            marginRight: "0"
        }
    },
    logoStyle: {
        textDecoration: "none",
        color: "white"
    },
    searchWrapper: {
        width: "40%",
        margin: "auto",
    }, 
    search: {
        padding: theme.spacing(1.4, 2.5),
        border: "none",
        borderRadius: theme.spacing(0.7,0,0,0.7),
        backgroundColor: "#798194",
        width: "80%",
        color: "white",
        fontSize: "1rem",
        "&::placeholder": {
            color: "rgba(255,255,255,0.6)"
        }
    },
    searchButton: {
        width: "20%",
        margin: "0",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[300],
        borderRadius: theme.spacing(0,0.7,0.7,0),
        "&:hover": {
            backgroundColor: theme.palette.grey[400],
        }
    }
}));

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function Navbar(props) {
    const history = useHistory();
    const { user,setUser } = useContext(UserContext);
    const classes = useStyles();
    return (
        <>
        <HideOnScroll {...props}>
            <AppBar position="sticky" className={`${classes.header}`}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.itemsGroup}>
                    <IconButton edge="start">
                        <MenuButton style={{color: "white"}}/>
                    </IconButton>

                    <Typography variant="h5">
                        <Link to="/" className={classes.logoStyle}>
                            Eventz
                        </Link>
                    </Typography>
                    </div>
                    
                    <Hidden xsdown>
                        <div className={classes.searchWrapper}>
                        <input 
                            type="text" 
                            placeholder="Search Events..."
                            className={classes.search}
                        />
                        <IconButton className={classes.searchButton}>
                            <Search/> 
                        </IconButton>
                        </div>
                    </Hidden>
                    {
                    user ?
                        (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    logout(setUser,history)
                                }}
                                disableElevation
                            >
                                Logout {user.name}
                            </Button>
                        ) :
                        (<>  
                        <div className={classes.itemsGroup}>
                            <Button
                                color="inherit"
                                onClick={() => history.push('/register')}
                            >
                                Register
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => history.push('/login')}
                            >
                                Login
                            </Button>
                        </div>
                        </>
                        )
                    }
                </Toolbar>
           </AppBar>
        </HideOnScroll>
        </>
    )
}

export default Navbar
