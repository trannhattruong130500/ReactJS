import { Input, Modal, notification, Form, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { IUsers } from "./users.table";



interface IProps {
    access_token: string;
    getData: any;
    isModalUpdateOpen: boolean;
    setIsModalUpdateOpen: (v: boolean) => void
    dataUpdate: null | IUsers
    setDataUpdate: any
}


const UpdateUsersModal = (props: IProps) => {
    const {
        access_token, getData, isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate
    } = props

    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                address: dataUpdate.address,
                role: dataUpdate.role,
                age: dataUpdate.age,
                gender: dataUpdate.gender,
            })
        }
    }, [dataUpdate])

    //     const data = {
    //         _id: dataUpdate?._id,
    //         name, email, gender, age, role, address
    //     }
    //     const res = await fetch(
    //         "http://localhost:8000/api/v1/users",
    //         {
    //             method: "PATCH",
    //             headers: {
    //                 'Authorization': `Bearer ${access_token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data)
    //         }
    //     )
    //     const d = await res.json();
    //     console.log('>>>Update data: ', d)
    //     if (d.data) {
    //         await getData();
    //         notification.success({
    //             message: "Thành công!",
    //         })
    //         setIsModalUpdateOpen(false)
    //         setDataUpdate(null)
    //         setName("");
    //         setEmail("");
    //         setAddress("");
    //         setAge("");
    //         setRole("");
    //         setGender("");
    //         setPassword("");

    //     } else {
    //         notification.error({
    //             message: "Có lỗi xảy ra!!",
    //             description: JSON.stringify(d.message)
    //         })
    //         setIsModalUpdateOpen(true)
    //     }
    // };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const { name, email, gender, age, role, address } = values
        const data = {
            _id: dataUpdate?._id,
            name, email, gender, age, role, address
        }
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        )
        const d = await res.json();
        console.log('>>>Update data: ', d)
        if (d.data) {
            await getData();
            notification.success({
                message: "Thành công!",
            })
            setIsModalUpdateOpen(false)
            setDataUpdate(null)

        } else {
            notification.error({
                message: "Có lỗi xảy ra!!",
                description: JSON.stringify(d.message)
            })
            setIsModalUpdateOpen(true)
        }
    };


    return (
        <div>
            <Modal title="Update users"
                open={isModalUpdateOpen}
                onOk={() => { form.submit() }}
                onCancel={() => { setIsModalUpdateOpen(false) }}
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
                        rules={[{ required: dataUpdate ? false : true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            disabled={dataUpdate ? true : false} />
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


                {/* <div hidden>
                    <Input
                        disabled
                        value={id}
                        onChange={(event) => setName(event.target.value)}
                    ></Input>
                </div>
                <div>
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
                        disabled
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


export default UpdateUsersModal