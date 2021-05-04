import { 
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useScrollTrigger,
    Slide,
    Hidden,
    Drawer,
} from '@material-ui/core';
import MenuButton from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/SearchOutlined';
import PropTypes from 'prop-types';
import React,{
    useState,
    useContext
} from 'react'
import {
    Link,
    useHistory,
} from 'react-router-dom';
import { logout } from '../../helpers/auth';
import useStyles from './useStyles';
import { UserContext } from "../../context/Context";
import NavList from './NavList';
// import FlatButton from '../buttons/FlatButton';

//Hide navbar on scroll logic
function HideOnScroll(props) {
    const { children  } = props;
    const trigger = useScrollTrigger({ target: window});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

function Navbar(props) {
    //Hooks
    const history = useHistory();
    const { user,setUser } = useContext(UserContext);
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    //next is just an optional function
    const toggleDrawer = (open) => (e) => {
        setOpen(open);
    }

    //Navbar render logic
    return (
        <>
        <HideOnScroll {...props}>
            <AppBar position="sticky" className={`${classes.header}`}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.itemsGroup}>
                        <IconButton 
                            edge="start"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuButton style={{color: "white"}}/>
                        </IconButton>

                        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                            <NavList
                                classes={classes}
                                toggleDrawer={toggleDrawer}
                            />
                        </Drawer>

                        <Typography variant="h5">
                            <Link to="/" className={classes.logoStyle}>
                                Eventz
                            </Link>
                        </Typography>

                        <Hidden xsDown>
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
                    </div>
                    
                    <div className={classes.itemsGroup}>
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
                            <Button
                                color="inherit"
                                onClick={() => history.push('/register')}
                            >
                                SignUp
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => history.push('/login')}
                            >
                                Login
                            </Button>
                        </>
                        )
                    }
                    </div>
                </Toolbar>
           </AppBar>
        </HideOnScroll>
        </>
    )
}

export default Navbar
