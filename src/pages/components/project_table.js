import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { change_list, select_project_list } from "../../redux/slice/project";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import axios from "../../util/http";
import { store } from "../../redux/store"

function hand_collect_click(record) {
    const data = {
        ...record,
        collect: !record.collect
    }


    store.dispatch(change_list({
        _id: record._id,
        data
    }))
    // 跟服务器同步
    axios.put(`/api/projects/${record._id}`, {
        collect: data.collect
    })
}

const columns = [
    {
        title: '收藏',
        dataIndex: 'collect',
        key: 'collect',
        render: (text, record) => {
            return (
                <div onClick={() => {
                    hand_collect_click(record)
                }} className='iconfont icon-shoucang shoucang-item' style={{ color: text ? '#dfd50c' : '' }}></div>
            )
        },
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <NavLink to={`/project/${record._id}/kanban`}>{text}</NavLink>
        ),
        sorter: (a, b) => a.title - b.title,
        width: '30%'
    }, {
        title: '部门',
        dataIndex: 'organization',
        key: 'organization',
        render: text => <div>{text}</div>,
        width: '15%'
    }, {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner',
        render: text => <div>{text}</div>,
        width: '15%'
    }, {
        title: '创建时间',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <Space size="middle">
                <div>{dayjs(record.created).format('DD/MM/YYYY')}</div>
            </Space>
        )

    }, {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (_, record) => (
            <>
                <Button type="primary">编辑</Button>
                <Button danger>删除</Button>
            </>
        )
    }
];

function ProjectTable() {

    const data = useSelector(select_project_list)

    return (
        <Table rowKey="created" className="project_table_css" columns={columns} dataSource={data} />
    )

}

export default ProjectTable