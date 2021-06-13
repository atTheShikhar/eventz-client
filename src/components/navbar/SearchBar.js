import React, { useContext, useState } from 'react'
import Search from '@material-ui/icons/SearchOutlined';
import {Card, IconButton, InputBase, makeStyles, MenuItem, Select} from '@material-ui/core';
import { useHistory } from 'react-router';
import { ComponentContext } from '../../context/Context';

const useStyles = makeStyles(theme => ({
    input: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    },
    container: {
        width: 400,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
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

const searchOptions = ["all","paid","free"];

function SearchBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [query,setQuery] = useState("");
    const [selectValue,setSelectValue] = useState(searchOptions[0]);
    const {setLoad} = useContext(ComponentContext);

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }
    const selectHandler = e => {
        setSelectValue(e.target.value);
    }
    const submitHandler = async e => {
        history.push(`/browse?page=1&type=${selectValue}&search=${query}`)
        setLoad(load => !load)
    }

	return (
        <Card className={classes.container}>
            <InputBase 
                type="text" 
                placeholder="Search Events..."
                value={query}
                onChange={changeHandler}
                className={`${classes.input} ${classes.textGrey}`}
            />
            <div className={classes.flexRow}>
                <Select
                    value={selectValue}
                    onChange={selectHandler}
                    input={<InputBase className={`${classes.flexRow} ${classes.textGrey}`}/>}
                >
                    {
                        searchOptions.map(option => (
                            <MenuItem 
                                key={option} 
                                value={option}
                                className={classes.textGrey}
                            >
                                {option}
                            </MenuItem>
                        ))
                    }
                </Select>

                <IconButton onClick={submitHandler} >
                    <Search/> 
                </IconButton>
            </div>
        </Card>
	)
}

export default SearchBar
