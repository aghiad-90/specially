export const validations = {
    email: {
        presence: {
            message: 'invalid email'
        },
        format: {
            // pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: 'invalid email'
        }
    },
    password: {
        presence: {
            message: 'please enter your password'
        }, length: {
        }
    },
    otp: {
        presence: {
            message: 'please enter your otp'
        }, length: {

        }
    }
}
export const validate = (nameField, value) => {
    let result = { isError: false, messageError: '' }
    if (validations.hasOwnProperty(nameField)) {
        let v = validations[nameField]
        if (value == '' || value === null) {
            result = { isError: true, messageError: v.presence.message }
        } 
        // else if (v.hasOwnProperty('format') && !v.format.pattern.test(value)) {
        //     result = { isError: true, messageError: v.format.message }
        // } 
        else {
            result.isError = false
        }
    } else {
        result.isError = false
    }
    return result
}