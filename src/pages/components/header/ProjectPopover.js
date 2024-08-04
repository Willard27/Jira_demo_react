import { Divider, List, Popover, Typography } from 'antd'

function ProjectPopover() {


    const data = [
        'test1',
        'test2',
        'test3'
    ];

    let content = (
        <div className='project_create'>
            <Typography.Text type={'secondary'}>项目</Typography.Text>
            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
            <Divider />
            <div className='project_create_name'>
                创建项目
            </div>
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 style={{ cursor: 'pointer' }}>项目</h2>
        </Popover>
    )
}

export default ProjectPopover