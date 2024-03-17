import {GoogleLogin} from 'react-google-login';
import './googleBtn.css';

const clientId = "98519260658-us1jcl7tveu7c273l7acrejm1vpb5fcq.apps.googleusercontent.com";

function GglLogin() {

    const onSuccess = (res) => {
        console.log("Login success");
    }

    const onFailure = (res) => {
        console.log("Login failed");
    }

    return (
        <div id="signInBtn">
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className="google-login-button" 
            />
        </div>
    )
}

export default GglLogin;