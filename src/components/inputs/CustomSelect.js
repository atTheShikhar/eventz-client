import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useEffect, useState, useContext} from 'react'
import {useHistory} from 'react-router'
import { ComponentContext } from '../../context/Context';
import { fetchEventsAuth } from '../../helpers/fetchEvents';

function CustomSelect(props) {
    const {selectData,selectHandler} = props;
    const [state,setState] = useState(selectData[0]);
    const {setFeedback} = useContext(ComponentContext);
    const history = useHistory();
    useEffect(() => {
        fetchEventsAuth(state.toLowerCase(),1,selectHandler,setFeedback,history);
    },[state])

    const changeHandler = (e) => {
        setState(e.target.value);
    }

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-select-control">{props.label}</InputLabel>
            <Select
                native
                label={props.label}
                onChange={changeHandler}
                value={state}
                inputProps={{
                    id: 'outlined-select-control'
                }}
            >
                {selectData.map((item) => (<option key={item} value={item.toLowerCase()}>{item}</option>))}
            </Select>
        </FormControl>
    )
}

export default CustomSelect
