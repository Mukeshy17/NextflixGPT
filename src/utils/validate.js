export const checkValidateData = (email,password,isSignIn,name) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const nameRegex = /^[a-zA-Z ]+$/;

    if (!isSignIn && !nameRegex.test(name)) {
        return "Name is not Valid!";
    }
    
    if (!emailRegex.test(email)) {
        return "Invalid email format!"; 
    }
    
    if (!passwordRegex.test(password)) {
        return "Password is not Valid!";
    }
    
    
    return null;
}