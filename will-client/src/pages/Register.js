import React from 'react'
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const Register = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 col-md-8">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">



                            <div class="col-lg-10">
                                <div class="p-5">
                                    <div class="text-center">
                                    <h1 class="h2 text-gray-900 mb-4">SmartWill</h1>
                                        <h1 class="h4 text-gray-900 mb-4">Create Account</h1>
                                    </div>
                                    <SignUpForm />


                                    <div class="text-center">
                                        <Link class="small" to="/sign-in">Already have an account? Login!</Link>
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

export default Register
