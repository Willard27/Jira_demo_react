import { Input, Select } from "antd"



function ProjectSearch() {

    const test_option = [
        {
            lable: 'test1',
            value: 1
        }, {
            lable: 'test2',
            value: 2
        }
    ]

    return (
        <>
            <Input placeholder="任务名" className="search_wrap_input"
            />
            <Select
                className="search_wrap_select"
                defaultValue={1}
                options={test_option}
            />
        </>
    )
}

export default ProjectSearch