import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function LeftMenu() {

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()

    const [active, setActive] = useState('')

    const pathname = location.pathname
    const key_arr = pathname.split('/')

    useEffect(() => {
        setActive(key_arr[3])
    }, [])

    const items = [{
        label: '看板',
        key: 'kanban',
    }, {
        label: '任务组',
        key: 'epic',
    }];

    const menu_click = (e) => {

        const key = e.key
        setActive(key)
        const id = params.id
        navigate(`/project/${id}/${key}`)
    };

    return (
        <div className='left_menu'>
            <Menu
                selectedKeys={active}
                onClick={menu_click}
                mode="inline"
                items={items}
            />
        </div>
    )
}
export default LeftMenu;