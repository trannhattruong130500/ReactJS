import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Button, Table, Modal, Input, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjUzN2U2Mjk4NjBiNTNjYTVhMDMzNzRmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE2OTgyMjA4MzIsImV4cCI6MTc4NDYyMDgzMn0.gzkaVH7cDhe6OVuwsJe_uxtWzbW0b47acwJOhxtlTTs"

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        const d = await res.json();
        setListUsers(d.data.result)
    }

    const handleOk = async () => {
        const data = {
            name, email, password, gender, age, role, address
        }
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data })
            }
        )
        const d = await res.json();
        console.log('>>>Creact data: ', d)
        if (d.data) {
            await getData();
            notification.success({
                message: "Thành công!",
            })
            setIsModalOpen(false)
            setName("");
            setEmail("");
            setAddress("");
            setAge("");
            setRole("");
            setGender("");
            setPassword("");

        } else {
            notification.error({
                message: "Có lỗi xảy ra!!",
                description: JSON.stringify(d.message)
            })
            setIsModalOpen(true)
        }
    };

    const columns: ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                return (
                    <div>{record.email}</div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        },
    ]

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2>Users</h2>
                <div>
                    <Button
                        type={"primary"}
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}>Add new
                    </Button>
                </div>
            </div>
            <Modal title="Add a new  users"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
            >
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
                </div>
            </Modal>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
        </div>
    )
}

export default UsersTable