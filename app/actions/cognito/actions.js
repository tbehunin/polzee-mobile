import { Auth } from 'aws-amplify';

export const login = payload => (dispatch) => {
    Auth.signIn(payload.username, payload.password)
        .then(
            response => dispatch({ type: 'COGNITO_LOGIN_SUCCESS', payload: response }),
            error => dispatch({ type: 'COGNITO_LOGIN_FAILURE', payload: error }),
        );
};
export const createAccount = payload => (dispatch) => {
    Auth.signUp({
        username: payload.username.replace('@', '_'),
        password: payload.password,
        attributes: {
            email: payload.username,
        },
    })
        .then(
            response => dispatch({ type: 'COGNITO_CREATE_ACCOUNT_SUCCESS', payload: response }),
            error => dispatch({ type: 'COGNITO_CREATE_ACCOUNT_FAILURE', payload: error }),
        );
};
export const verifyMfa = payload => (dispatch, getState) => {
    const { username } = getState().cognito.authData.user;
    Auth.confirmSignUp(username, payload.verificationCode)
        .then(
            response => dispatch({ type: 'COGNITO_VERIFY_MFA_SUCCESS', payload: response }),
            error => dispatch({ type: 'COGNITO_VERIFY_MFA_FAILURE', payload: error }),
        );
};
export const logOut = () => (dispatch) => {
    Auth.signOut()
        .then(
            response => dispatch({ type: 'COGNITO_LOGOUT_SUCCESS', payload: response }),
            error => dispatch({ type: 'COGNITO_LOGOUT_FAILURE', payload: error }),
        );
};
