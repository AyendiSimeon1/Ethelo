export interface newErrors {
    email: string;
    password: string;
}


export const validateForm = ( email: string, password: string) => {

    const newErrors :newErrors = {
        email: "",
        password: ""
    };

    if(!email) {
        newErrors.email = "Please enter your email"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid.';
    }

    if(!password) {
        newErrors.password = "Please enter your password"
    }

    return newErrors;
}