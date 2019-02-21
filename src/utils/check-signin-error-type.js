export const checkSignInErrorType = (errorCode) => {
    const emailError = 'email';
    const passwordError = 'password';
    switch(errorCode) {
        case 'auth/wrong-password':
            return passwordError;
        case 'auth/invalid-email':
            return emailError;
        default: 
            return 'email and password';
    }
};