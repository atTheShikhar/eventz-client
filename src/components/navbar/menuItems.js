import {
    Info,
    Help,
    Home,
    Create,
    Explore,
    Event,
    Message,
} from '@material-ui/icons'
//List for navigation drawer
export const usermenu = [
    {
        name: "Home",
        route: "/",
        icon: <Home/>
    },
    {
        name: "Create Event",
        route: "/create",
        icon: <Create/>
    },
    {
        name: "Browse Events",
        route: "/browse",
        icon: <Explore/>
    },
    {
        name: "About Us",
        route: "/about",
        icon: <Info/>
    },
    {
        name: "Contact Us",
        route: "/contactus",
        icon: <Help/>
    },
]

export const adminmenu = [
    {
        name: "Events",
        route: "/admin/events",
        icon: <Event/>
    },
    {
        name: "Messages",
        route: "/admin/messages",
        icon: <Message/>
    }
]