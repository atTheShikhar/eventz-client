import { ValidatorForm } from "react-material-ui-form-validator";

//Rule to allow only alphabets and basic punctuations
export const regexText = 'matchRegexp:^[a-zA-Z., ]+$';
export const textErr = "Can only contain alphabets and punctuations";

//Rule to allow String of max size
export const maxSize = len => `maxStringLength:${len}`;
export const maxSizeErr = len => `Less than ${len} letters allowed`;

//Rule to allow String of min size
export const minSize = len => `minStringLength:${len}`;
export const minSizeErr = (field,len) => `${field} should be more than ${len-1} letters`;

//Rule to allow numbers of exact length
export const exactDigit = len => `matchRegexp:^\\d{${len}}$`
export const exactDigitErr = len => `Exactly ${len} digits allowed`

//Custom Rule to allow only future dates
export function futureDateValidator() {
    ValidatorForm.addValidationRule('futureDate',(selectedDate) => {
        const date = new Date(selectedDate).setHours(0,0,0,0);
        const today = new Date().setHours(0,0,0,0);
        if(date < today) 
            return false;
        return true;
    });
}
export const pastDateErr = "Date cannot be in past"; 

//Custom Rule to confirm password
export function samePass(pass) {
    ValidatorForm.addValidationRule('isSamePassword', confirmPass => {
        if (confirmPass !== pass) {
            return false;
        }
        return true;
    });
}
export const samePassErr = "Password mismatch";

//Errors
export const reqErr = "This field is required";
export const numErr = "Only numbers are allowed";
export const emailErr = "Invalid Email!";