import { 
    Button,AppBar,Toolbar,
    IconButton,Typography,useScrollTrigger,
    Slide,Hidden,Drawer,
} from '@material-ui/core';
import MenuButton from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React,{ useState,useContext } from 'react'
import { Link,useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import { UserContext } from "../../context/Context";
import NavList from './NavList';
import UserMenu from './UserMenu';
import { logout } from '../../helpers/auth';
import SearchBar from './SearchBar';

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
                                menuType={user?.type}
                                classes={classes}
                                toggleDrawer={toggleDrawer}
                            />
                        </Drawer>

                        <Typography variant="h5">
                            {
                                (user?.type === "admin") ?
                                (<>Eventz Admin Panel</>) :
                                (
                                    <Link to="/" className={classes.logoStyle}>
                                        Eventz
                                    </Link>
                                )
                            }
                        </Typography>

                        {
                            (user?.type === "admin") ? 
                            (<></>) : 
                            (
                                <Hidden xsDown>
                                    <SearchBar/>
                                </Hidden>
                            )
                        }
                    </div>
                    
                    <div className={classes.itemsGroup}>
                    {
                    user ?
                        (user?.type === "admin") ?
                        (
                            <Button 
                                variant="contained" 
                                onClick={() => logout(setUser,history)}
                            >
                                Log Out
                            </Button>
                        ) :
                        (
                            <UserMenu/>
                        )
                         :
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
