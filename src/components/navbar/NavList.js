import { usermenu,adminmenu } from './menuItems'
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const NavList = (props) => {
    const {classes,toggleDrawer} = props;
    const history = useHistory();
    let menuItem;
    if(props.menuType === "admin") {
        menuItem = adminmenu;
    } else {
        menuItem = usermenu;
    }
    return (<div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >   
        <List
            component="nav"
            aria-label="Navigation menu"
        >
            {
                menuItem.map((item) => (
                    <ListItem 
                        button
                        key={item.name}
                        onClick={() => history.push(item.route)}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                )) 
            }
        </List>
    </div>)
}
export default NavList;