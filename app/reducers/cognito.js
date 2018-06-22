const initialState = {
    authState: 'login',
};

const cognito = (state = initialState, action) => {
    switch (action.type) {
    case 'COGNITO_CREATE_ACCOUNT_SUCCESS':
        return { authState: 'mfa', authData: action.payload };
    case 'COGNITO_CREATE_ACCOUNT_FAILURE':
        return { ...state, authError: action.payload };
    case 'COGNITO_VERIFY_MFA_SUCCESS':
        return { authState: 'login', authData: action.payload };
    case 'COGNITO_VERIFY_MFA_FAILURE':
        return { ...state, authError: action.payload };
    case 'COGNITO_LOGIN_SUCCESS':
        return { authState: 'authenticated', authData: action.payload };
    case 'COGNITO_LOGIN_FAILURE':
        return { ...state, authError: action.payload };
    case 'COGNITO_LOGOUT_SUCCESS':
        return { authState: 'login', authData: action.payload };
    case 'COGNITO_LOGOUT_FAILURE':
        return { ...state, authError: action.payload };
    default:
        return state;
    }
};
export default cognito;
