import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Grid,MenuItem, } from '@material-ui/core';
import Textbox from '../../components/inputs/Textbox';
import {
    reqErr,
    maxSize,
    maxSizeErr,
    numErr,
    exactDigit,
    exactDigitErr
} from '../../helpers/validators';

function AddressDetailsInputs(props) {
    const {details,handleChange,disabled} = props;
    const [stateData,setStateData] = useState([{state_name: details.countryStateName,state_id: ""}]);
    const [district,setDistrict] = useState([
        {district_name: details.district},
        {district_name: "North and Middle Andaman"},
        {district_name: "South Andaman"}
    ]);

    const handleStateChange = (e) => {
        handleChange('countryStateName')(e)
        const s = e.target.value

        //Gets state_id corresponding to the state_name
        const id = stateData
            .filter(item => item.state_name === s)
            .reduce((total,item) => total + item.state_id,0)

        const getDistrictData = async () => {
            try {
                const response = await axios
                    .get(`/api/address-metadata?get=district&state_id=${id}`);
                setDistrict(response.data.districts)
            } catch(e) {
                console.log(e);
            }
        }
        getDistrictData();
    }

    useEffect(() => {
        const getStateData = async () => {
            try {
                const response = await axios.get('/api/address-metadata?get=states');
                setStateData(response.data.states);
            } catch (e) {
                console.log(e);                
            }
        }
        getStateData()
    },[])
    return (
        <>
            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Apartment/Building/Floor"
                    value={details.apartment}
                    onChange={handleChange('apartment')}
                    name="apartment"
                    autoFocus
                    disabled={disabled}
                    validators={['required',maxSize(50)]}
                    errorMessages={[reqErr,maxSizeErr(50)]}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Street/Area/Colony"
                    value={details.street}
                    onChange={handleChange('street')}
                    disabled={disabled}
                    name="street"
                    validators={['required',maxSize(100)]}
                    errorMessages={[reqErr,maxSizeErr(100)]}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="States/UT"
                    select
                    disabled={disabled}
                    value={details.countryStateName}
                    onChange={handleStateChange}
                    name="countryStateName"
                >
                    {
                        stateData.map(option => (
                            <MenuItem key={option.state_id} value={option.state_name}>
                                {option.state_name}
                            </MenuItem>
                        ))
                    }
                </Textbox>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="District"
                    select
                    disabled={disabled}
                    value={details.district}
                    onChange={handleChange('district')}
                    name="district"
                >
                    {
                        district.map(option => (
                            <MenuItem key={option.district_name} value={option.district_name}>
                                {option.district_name}
                            </MenuItem>
                        ))
                    }
                </Textbox>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="PIN Code"
                    value={details.pinCode}
                    onChange={handleChange('pinCode')}
                    name="pinCode"
                    disabled={disabled}
                    validators={['required','isNumber',exactDigit(6)]}
                    errorMessages={[reqErr,numErr,exactDigitErr(6)]}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Country"
                    value={details.country}
                    onChange={handleChange('country')}
                    name="country"
                    disabled
                />
            </Grid>
        </>
    )
}

export default AddressDetailsInputs
