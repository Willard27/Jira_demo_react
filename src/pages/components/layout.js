import { Outlet, useLocation } from "react-router-dom";
import LeftMenu from "./left_menu";
import Header from "./header";

function Layout() {
    const location = useLocation()
    const is_project_page = location.pathname === '/project'

    return (
        <div className="layout_wrap">
            <div className="header_wrap">
                <Header />
            </div>
            <div className="layout_wrap_project">
                {   
                    is_project_page ? (
                        null
                    ) : (
                        <div className="project_side_menu_wrap">
                            <LeftMenu />
                        </div>
                    )
                }
                <div className="project_wrap">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Layout