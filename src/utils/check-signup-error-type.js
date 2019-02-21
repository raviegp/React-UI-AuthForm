export const checkSignUpErrorType = (errorCode) => {
    const emailError = 'email';
    const passwordError = 'password';
    switch(errorCode) {
        case 'auth/weak-password':
            return passwordError;
        case 'auth/invalid-email':
            return emailError;
        case 'auth/email-already-in-use': 
            return emailError;
        default: 
            return 'email and password';
    }
};

