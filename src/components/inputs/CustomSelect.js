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
    const {selectData,selectHandler,dataHandler,url,page,search} = props;
    const [state,setState] = useState(selectData[0]);
    const {setFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        let fetchUrl = `${url}?type=${state}&search=${search}&page=${page}`
        // console.log(fetchUrl);
        const getData = async () => {
            const data = await dataHandler(fetchUrl,setFeedback,history);
            selectHandler(data);
        }
        getData();
    },[state,search])

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
