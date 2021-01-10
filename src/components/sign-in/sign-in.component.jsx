import React from 'react';
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, auth} from '../../firebase/firebase.utils'

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
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''});
        }catch(error){
            console.error(error);
        }
        
    };
    handleChange = event => {
        const {name, value} = event.target;
        this.setState( {[name]:value} )
    };
    render(){
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with username and password</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput name='email' type='email' label='email' value ={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type='password' name='password' label='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick = {signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>

                </form>
            </div>
        );
    }
}
export default SignIn