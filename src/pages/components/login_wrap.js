function LoginWrap(props) {
    return (
        <div className="login_wrap">
            <h1>Jira</h1>
            <div className="login_box_wrap">
                {props.children}
            </div>
        </div>
    )
}

export default LoginWrap