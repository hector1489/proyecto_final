import LoginComponents from "../components/LoginComponents"
import Register from "../components/signupComponents"

const LoginSignup = () => {
    return(
        <div className="box-signup-login d-flex flex-md-row flex-column">
            <LoginComponents />
            <Register />
        </div>
    )
}

export default LoginSignup