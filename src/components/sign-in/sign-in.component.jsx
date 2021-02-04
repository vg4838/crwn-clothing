import React, {useState} from 'react';
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import {connect} from 'react-redux' 

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email:'', password:''})
    const {email, password} = userCredentials;
    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password);     
    };
    const handleChange = event => {
        const {name, value} = event.target;
        setCredentials( {...userCredentials, [name]:value} )
    };
    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with username and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput name='email' type='email' label='email' value ={email} handleChange={handleChange} required />
                <FormInput type='password' name='password' label='password' value={password} handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick = {googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password})) 
});
export default connect(null, mapDispatchToProps)(SignIn)