import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login, createAccount, verifyMfa } from '../actions/cognito/actions';

export const providerImage = 'https://d2597oqac71veb.cloudfront.net/201406190823/images/cognito-icon.png';

const mapStateToProps = state => ({
    providerImage,
    authState: state.cognito.authState,
    authError: state.cognito.authError,
});
const mapDispatchToProps = dispatch => ({
    onLogin: (username, password) => dispatch(login({ username, password })),
    onCreateAccount: (username, password) => dispatch(createAccount({ username, password })),
    onMfaVerification: verificationCode => dispatch(verifyMfa({ verificationCode })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
