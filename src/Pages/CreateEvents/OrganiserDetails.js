import React from 'react'
import { ThemeProvider,useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'

function OrganiserDetails(props) {
    const {nextStep,handleChange,values} = props;
    const theme = useTheme();

    const cont = (e) => {
        e.preventDefault();
        // nextStep();
        console.log(values);
    }
    return (
        <ThemeProvider theme={theme}>
            <>
                {/* <Dialog
                    open
                    fullWidth
                    maxWidth='sm'
                > */}
                    <AppBar title="Enter Organiser's Details" />
                    <TextField
                        placeholder="Enter First Name"
                        label="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <TextField
                        placeholder="Enter Last Name"
                        label="Last Name"
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <TextField
                        placeholder="Enter Your Email"
                        label="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={cont}
                    >Continue</Button>
                {/* </Dialog> */}
            </>
        </ThemeProvider>
    )
}

export default OrganiserDetails
