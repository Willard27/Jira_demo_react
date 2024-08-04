import { Button, Form, Input, Select } from "antd"

function SearchForm() {
    return (
        <Form layout="inline">
            <Form.Item>
                <Input />
            </Form.Item>
            <Form.Item>
                <Select />
            </Form.Item>
            <Form.Item>
                <Select />
            </Form.Item>
            <Button>查询</Button>
            <Button>重置</Button>
        </Form>
    )
}

export default SearchForm