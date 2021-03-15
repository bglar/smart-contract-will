import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fa fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SmartWill</div>
            </a>

           
            <hr className="sidebar-divider my-0"/>

            <li className="nav-item">
                <Link className="nav-link" to="/">
                    <i className="fa fa-tachometer"></i>
                    <span>Dashboard</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/documents">
                    <i className="fa fa-file-text-o"></i>
                    <span>My Wills</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/beneficiaries">
                    <i className="fa fa-file-text-o"></i>
                    <span>My Beneficiaries</span></Link>
            </li>
            <hr className="sidebar-divider"/>
        </ul>
    )
}

export default SideNav
