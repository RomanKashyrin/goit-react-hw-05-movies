import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation/Navigation";

const AppBar = () => {
    return (
        <>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </>
    );
}

export default AppBar;