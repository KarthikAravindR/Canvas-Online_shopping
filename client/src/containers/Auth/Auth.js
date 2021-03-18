import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actions from  '../../store/actions/index'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import Spinner from '../../components/UI/LoadingIndicator/LoadingIndicator'

const Auth = (props) => {

    const [signupForm, setSignupForm] = useState({
        name: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Name',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
            },
            valid: true
        },
        email: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Mail',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
                isEmail: true
            },
            valid: true
        },
        password: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Password',
                type: 'password'
            },
            value: '',
            validation: {
                isrequired: true,
                minLength: 7
            },
            valid: true
        },
    })
    const [loginForm, setLoginForm] = useState({
        email: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Mail',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
                isEmail: true
            },
            valid: true
        },
        password: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Password',
                type: 'password'
            },
            value: '',
            validation: {
                isrequired: true,
                minLength: 7
            },
            valid: true
        },
    })
    const [isSignup, setIsSignup] = useState(true)

    const {userid} = props
    const {history} = props
    useEffect(() => {
        if(userid){
            history.push('/')
        }
    },[userid,history])
    
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.isrequired) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    const inputchangeHandler = (event, controlname) => {
        if(isSignup){
            const updatedControls = {
                ...signupForm,
                [controlname]: {
                    ...signupForm[controlname],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, signupForm[controlname].validation)
                }
            }
            setSignupForm(updatedControls)
        }else{
            const updatedControls1 = {
                ...loginForm,
                [controlname]: {
                    ...loginForm[controlname],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, loginForm[controlname].validation)
                }
            }
            setLoginForm(updatedControls1)
        }
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
        props.onclearerror()
    }

    const authenticationHandler = event => {
        event.preventDefault()
        if(isSignup){
            props.onauthHandler(signupForm.email.value,signupForm.password.value,isSignup,signupForm.name.value,)
        }else{
            props.onauthHandler(loginForm.email.value,loginForm.password.value,isSignup)
        }
    }

    let formelementarray1 = [];
    let formelementarray2 = [];
    if(isSignup){
        for (let key in signupForm) {
            formelementarray1.push({
                id: key,
                config: signupForm[key]
            })
        }
    }else{
        for (let key in loginForm) {
            formelementarray2.push({
                id: key,
                config: loginForm[key]
            })
        }
    }
    let form1 = null
    let form2 = null
    if(isSignup){
        form1 =
        <form>
            {formelementarray1.map(formelement => (
                <Input key={formelement.id}
                    shouldvalidate={formelement.config.validation}
                    validity={formelement.config.valid}
                    changd={(event) => inputchangeHandler(event, formelement.id)}
                    label={formelement.id}
                    elementtype={formelement.config.elementtype}
                    elementconfig={formelement.config.elementconfig}
                    value={formelement.config.value} />
            ))}
        </form>
    }else{
        form2 =
        <form>
            {formelementarray2.map(formelement => (
                <Input key={formelement.id}
                    shouldvalidate={formelement.config.validation}
                    validity={formelement.config.valid}
                    changd={(event) => inputchangeHandler(event, formelement.id)}
                    label={formelement.id}
                    elementtype={formelement.config.elementtype}
                    elementconfig={formelement.config.elementconfig}
                    value={formelement.config.value} />
            ))}
        </form>
    }
    

    let errorMessage = null
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    return (
        <div style={{ display: "flex",backgroundColor:"#dfe9ff",height:"100vh" }}>
            <div className="Toolbar">
                <header >
                <div className="title2"><div to={'/canvas'} className="toolbarTitle1"><FontAwesomeIcon style={{ fontSize: "4rem",color:"#ff2058"}} icon={faShoePrints} /> Canvas</div></div>
                </header>
                <div className="Auth">
                    {errorMessage}
                    {isSignup ? form1: form2}
                    <div className="signupbutton">
                        <button  onClick={authenticationHandler} type="button" className="btn btn-light">{props.loading?<Spinner/>:(isSignup ? 'Create Account' : 'Log-IN')}</button>
                        <button onClick={switchAuthModeHandler} type="button" className="btn btn-light">{isSignup ? 'Already have an Account. Sign-In Over here' : 'New To DoToDO ? Create New Account'}</button>
                    </div>
                    <div className="errormessage">
                        {props.error}
                    </div>
                </div>
            </div>
            <div>
            <div id="egg">
                <div className="qoute">'Shoes make an outfit. You can throw on a crazy shirt and crazy pants but you add those shoes - done.'</div>      
            </div>
            </div>
    </div >

)
}

const mapStateToProps = state => {
    return {
        myorders: state.order.orders,
        userid: state.auth.userid,
        loading: state.auth.loading,
        error: state.auth.error,
    }
}
const mapDispatchToState = dispatch => {
    return {
        onauthHandler: (email,password,isSignup,name) => { dispatch(actions.auth(email,password,isSignup,name)) },
        onclearerror: () => {dispatch({ type: "CLEAR_AUTH_ERROR" })},
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Auth))
