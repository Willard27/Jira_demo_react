import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Project from './pages/project';
import Kanban from './pages/kanban';
import Epic from './pages/epic';
import Layout from './pages/components/layout';
import { notification } from 'antd';
import { useEffect } from 'react';
import EventBus from './util/events';
import { useDispatch } from 'react-redux';
import { getOrgsAsync, getProjectListAsync, getTaskTypesAsync, getUsersAsync } from './redux/slice/project';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (msg) => {
    api.error({
      message: msg,
      placement: 'topRight'
    });
  }

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/project')
    }
    // 获取下拉框动态数据
    dispatch(getUsersAsync())
    dispatch(getOrgsAsync())
    dispatch(getTaskTypesAsync())

    // 拉取项目列表
    dispatch(getProjectListAsync())

    // 没有登录
    EventBus.on("global_not_login", function (msg) {
      navigate('/login')
    })

    EventBus.on("global_error_tips", function (msg) {
      // console.log('发生错误了')
      openNotification(msg)
    })
  }, [])

  return (
    <div className="App">
      {contextHolder}
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route element={<Layout />}>
          <Route path='/project' element={<Project />}></Route>
          <Route path='/project/:id/kanban' element={<Kanban />}></Route>
          <Route path='/project/:id/epic' element={<Epic />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
