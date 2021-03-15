import React from 'react'
import { Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { privateRoutes } from "../routes";

const DashboardLayout = () => {
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <NavBar />
                    <div className="container-fluid">
                        <Switch>
                            {privateRoutes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact
                                    component={route.component}
                                />
                            ))}
                        </Switch>

                    </div>
                </div>
                <Footer />
            </div>

        </div>

    )
}

export default DashboardLayout;
