// import React from 'react'
import { 
    Card,InputBase,Select,MenuItem,IconButton,makeStyles
} from '@material-ui/core'
import Search from '@material-ui/icons/SearchOutlined';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    input: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    },
    container: {
        width: 400,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        border: "solid 1px grey"
    },
    flexRow: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center"
    },
    textGrey: {
        color: theme.palette.grey[800]
    }
}))

function SearchBar(props) {
    const {
        submitHandler,
    } = props;
    const [query,setQuery] = useState("");
    const classes = useStyles();

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <Card className={classes.container} elevation={0}>
                <InputBase 
                    type="text" 
                    placeholder="Search..."
                    value={query}
                    onChange={changeHandler}
                    className={`${classes.input} ${classes.textGrey}`}
                />
                <div className={classes.flexRow}>

                    <IconButton onClick={() => {
                        submitHandler(query)}} 
                    >
                        <Search/> 
                    </IconButton>
                </div>
            </Card>
        </>
    )
}

export default SearchBar
