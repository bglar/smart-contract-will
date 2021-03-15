import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { registerUser } from '../context/actions'

const SignUpForm = () => {
    let history = useHistory();
    const [message, setMessage] = useState({ "message": "", "class": "" });


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [nationalId, setNationalId] = useState('')

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        if(password !== repeatPassword){
            setMessage({ message: "Passwords do not match", class: "danger" });
            return false;
        }
        let document = { "value": nationalId,"docType": "PASSPORT"}
        let payload = { email, password,firstName,lastName,document }
        let response = await registerUser(payload);
        if(response.data.id){

            setMessage({ message: "Account created successfully. Proceed to login", class: "success" });
            setTimeout(function (){
                history.push('/sign-in');
              }, 2500); 
        }
    }

    return (
        <div>
         
            {/* { errorMessage ? <p className="alert alert-danger" role="alert" >{errorMessage}</p> : null } */}

            {message.message.length > 0 && <p className={`alert alert-${message.class}`} style={{ marginTop: 7, marginBottom: 7  }} role="alert">{message.message}</p>}
            
            <form class="user">
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                            placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-user" id="exampleLastName"
                                            placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="National ID Number" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <button onClick={handleCreateAccount} className="btn btn-primary btn-user btn-block">
                                    Register Account
                                </button>
                                <hr/>
                               
                            </form>

        </div>
    )
}

export default SignUpForm
