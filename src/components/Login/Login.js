import React, { useState, useEffect ,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';

import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/input/input';
import classes from './Login.module.css';
const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT')
  return{ value:action.val,isValid:action.val.includes('@')}
if( action.type==='INPUT_BLUR'){
  return{value:state.value,isValid:state.value.includes('@')}
}
return{ value:"",isValid:false}
}
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
const[emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false})

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
   dispatchEmail({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };
const authCtx=useContext(AuthContext)
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
  dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input  id="email" 
        label="E-Mail"
        type="email"
        isValid={emailState.isValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>

        <Input  id="password" 
        label="Passwoed"
        type="password"
        isValid={passwordState.isValid}   
        value={passwordState.value}  
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
