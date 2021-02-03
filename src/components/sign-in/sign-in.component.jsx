import React from 'react';
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import {connect} from 'react-redux' 

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        };
    }
     
    handleSubmit = async e => {
        e.preventDefault();
        const {emailSignInStart} = this.props
        const {email, password} = this.state;
        emailSignInStart(email, password);     
    };
    handleChange = event => {
        const {name, value} = event.target;
        this.setState( {[name]:value} )
    };
    render(){
        const {googleSignInStart} = this.props
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with username and password</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput name='email' type='email' label='email' value ={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type='password' name='password' label='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick = {googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password})) 
});
export default connect(null, mapDispatchToProps)(SignIn)