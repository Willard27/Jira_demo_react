import ProjectPopover from "./ProjectPopover"
import UserPopover from "./UserPopover"
import logo from "../../../static/logo.jpg"
import { useNavigate } from "react-router-dom"

function Header() {

    const navigate = useNavigate()

    function hand_click() {
        navigate('/project')
    }

    return (
        <div className='header_wrap_body'>
            <button className='header_button' onClick={hand_click}>
                <img className="header_logo" src={logo} alt="加载失败"></img>
                <h2 >Jira Software</h2>
            </button>
            <ProjectPopover />
            <UserPopover />
            {/* <div onClick={logout} className="header_login_out_btn">退出登录</div> */}
        </div>
    )
}

export default Header