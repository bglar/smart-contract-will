import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthDispatch, logout, useAuthState } from '../context'

const NavBar = () => {
    const dispatch = useAuthDispatch(); // read dispatch method from context
    const userDetails = useAuthState(); //read user details from context
    const history = useHistory();

    const handleLogout = () => {
        logout(dispatch) //call the logout action
        history.push('/sign-in') //navigate to logout page on logout
    }

    return (
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <h3>Dashboard</h3>
                    <ul className="navbar-nav ml-auto">
                    
                        <div className="topbar-divider d-none d-sm-block">
                       
                        </div>

                        <li className="nav-item dropdown no-arrow">
                            <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userDetails.user ? userDetails.user.email : ""}</span>
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg" alt="avatar"/>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <Link className="dropdown-item" to="#">
                                    <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </Link>
                                <div className="dropdown-divider"></div>
                            <button className="dropdown-item"  onClick={handleLogout}><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout </button>
                            </div>
                        </li>

                    </ul>

                </nav>
    )
}

export default NavBar
