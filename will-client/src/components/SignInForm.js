import React, { useState } from 'react'
import { loginUser, useAuthState, useAuthDispatch } from "../context"
import { useHistory } from "react-router-dom";

const SignInForm = () => {
    let history = useHistory();
    const dispatch = useAuthDispatch() //get the dispatch method from the useDispatch custom hook
    const { loading, errorMessage } = useAuthState() //read the values of loading and errorMessage from context


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = { email, password }

        try {
            let response = await loginUser(dispatch, payload) //loginUser action makes the request and handles all the neccessary state changes
            if(response){
            history.push('/') //navigate to dashboard on success
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
         
            { errorMessage ? <p className="alert alert-danger" role="alert" >{errorMessage}</p> : null }
            
            <form className="user">
                <div className="form-group">
                    <input type="email" className="form-control form-control-user"
                        id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-user"
                        id="exampleInputPassword" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button onClick={handleLogin} disabled={loading} className="btn btn-primary btn-user btn-block" >Login </button>

            </form>
        </div>
    )
}

export default SignInForm
