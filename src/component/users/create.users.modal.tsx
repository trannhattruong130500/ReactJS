import { Input, Modal, notification, Form, Select, InputNumber } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Option } = Select;


interface IProps {
    access_token: string;
    getData: any;
    isModalCreateOpen: boolean;
    setIsModalCreateOpen: (v: boolean) => void
}

const CreateUsersModal = (props: IProps) => {
    const { access_token,
        getData,
        isModalCreateOpen,
        setIsModalCreateOpen } = props

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { name, email, password, gender, age, role, address } = values
        const data = { name, email, password, gender, age, role, address }
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        )
        const d = await res.json();
        console.log('>>>Creact data: ', d)
        if (d.data) {
            await getData();
            notification.success({
                message: "Thành công!",
            })
            setIsModalCreateOpen(false);
            form.resetFields();
        } else {
            notification.error({
                message: "Có lỗi xảy ra!!",
                description: JSON.stringify(d.message)
            })
            setIsModalCreateOpen(true)
        }
    };

    return (
        <div>
            <Modal title="Add a new  users"
                open={isModalCreateOpen}
                onOk={() => { form.submit() }}
                onCancel={() => setIsModalCreateOpen(false)}
                maskClosable={false}
            >

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }} name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="MALE">male</Option>
                            <Option value="FEMALE">female</Option>
                            <Option value="OTHER">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }} name="role" label="Role" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="USER">USER</Option>
                            <Option value="ADMIN">ADMIN</Option>

                        </Select>
                    </Form.Item>
                </Form>

                {/* <div>
                    <div>Name</div>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    ></Input>
                </div>
                <div>
                    <div>Email</div>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></Input>
                </div>
                <div>
                    <div>Password</div>
                    <Input.Password
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <div>Age</div>
                    <Input
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    ></Input>
                </div>
                <div>
                    <div>Gender</div>
                    <Input
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    ></Input>
                </div>
                <div>
                    <div>Address</div>
                    <Input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    ></Input>
                </div>
                <div>
                    <div>Role</div>
                    <Input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    ></Input>
                </div> */}
            </Modal>
        </div>
    )
}


export default CreateUsersModal