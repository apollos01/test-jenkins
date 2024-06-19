import { Outlet } from "react-router-dom"
import { Footer } from "./pages/footer"
import { NavBar } from "./pages/navbar"

export const Layout = () => {
    return (
        <>

            <NavBar/>
                <Outlet/>
            <Footer/>

        </>
    )

} 