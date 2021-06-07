import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Container, Button, Grid,MenuItem,Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/inputs/Textbox';
import Forward from '@material-ui/icons/ArrowForwardIos'
import {
    reqErr,
    maxSize,
    maxSizeErr,
    numErr,
    exactDigit,
    exactDigitErr
} from '../../helpers/validators';

function AddressDetails(props) {
    const {details,prevStep,nextStep,handleChange} = props;    
    
    //Hooks
    const classes = useStyles();
    const [stateData,setStateData] = useState([{state_name: details.countryStateName,state_id: ""}]);
    const [district,setDistrict] = useState([
        {district_name: details.district},
        {district_name: "North and Middle Andaman"},
        {district_name: "South Andaman"}
    ]);
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

    //Functions
    const forward = e => {
        e.preventDefault();
        nextStep();
    }
    const backward = e => {
        e.preventDefault();
        prevStep();
    }
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

    //Render Logic
    return (
        <ValidatorForm onSubmit={forward} instantValidate={true}>
            <Container maxWidth="sm">
                <Paper className={classes.paperContainer}>
                <Grid container spacing={1} className={classes.gridContainerStyles}>
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Apartment/Building/Floor"
                            value={details.apartment}
                            onChange={handleChange('apartment')}
                            name="apartment"
                            autoFocus
                            validators={['required',maxSize(50)]}
                            errorMessages={[reqErr,maxSizeErr(50)]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Street/Area/Colony"
                            value={details.street}
                            onChange={handleChange('street')}
                            name="street"
                            validators={['required',maxSize(100)]}
                            errorMessages={[reqErr,maxSizeErr(100)]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="States/UT"
                            select
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

                    <Grid item xs={12}>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
                                    onClick={backward}
                                >Previous</Button>

                                <SubmitButton 
                                    fullWidth={false}
                                    endIcon={<Forward/>}
                                >
                                    Next
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        </ValidatorForm>       
    )
}

export default AddressDetails

