import Home from "./components/Home"
import ViewWill from "./components/ViewWill"
import WillsList from "./components/WillsList"
import DashboardLayout from "./pages/DashboardLayout"
import PageNotFound from "./pages/PageNotFound"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

export const Routes = {
    // pages
    Dashboard: { path: "/" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
}


// Config/routes.js

export const publicRoutes =[
    {
      path:'/sign-in',
      component: SignIn
    },
    {
      path:'/sign-up',
      component: Register
    },
    {
        path:'/',
        component: DashboardLayout
      },
    {
      path:'/*',
      component: PageNotFound
    },
  ]


  export const privateRoutes =[
    {
      path:'/documents',
      component: WillsList
    },
    {
      path:'/beneficiaries',
      component: WillsList
    },
    {
      path:'/document/:docId',
      component: ViewWill
    },
    {
      path:'/',
      component: Home
    }
    
  ]