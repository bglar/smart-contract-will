import React from 'react'
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                        <h1 class="h2 text-gray-900 mb-4">SmartWill</h1>
                                            <h1 className="h4 text-gray-900 mb-4">Login to your account</h1>
                                        </div>
                                        <SignInForm />
                                        <hr />
                                        <div className="text-center">
                                            <Link to='/sign-up' className="small">Create an Account!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignIn
