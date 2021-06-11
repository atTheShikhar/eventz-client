import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState, useContext} from 'react'
import {useHistory} from 'react-router'
import { ComponentContext } from '../../context/Context';

const useStyles = makeStyles(theme => ({
    minWidth: {
        minWidth: "150px"
    }
}))

function CustomSelect(props) {
    const {selectData,selectHandler,dataHandler,url,page} = props;
    const [state,setState] = useState(selectData[0]);
    const {setFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        let fetchUrl = `${url}?type=${state}&page=${page}`
        dataHandler(fetchUrl,selectHandler,setFeedback,history);
        return function setDataToNull() {
            selectHandler(null)
        }
    },[state])

    const changeHandler = (e) => {
        setState(e.target.value);
    }

    return (
        <FormControl variant="outlined" className={classes.minWidth}>
            <InputLabel htmlFor="outlined-select-control">{props.label}</InputLabel>
            <Select
                label={props.label}
                onChange={changeHandler}
                value={state}
                inputProps={{
                    id: 'outlined-select-control'
                }}
            >
                {selectData.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
            </Select>
        </FormControl>
    )
}

export default CustomSelect
