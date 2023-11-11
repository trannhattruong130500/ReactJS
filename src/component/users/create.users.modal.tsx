import { Input, Modal, notification } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
            setIsModalCreateOpen(false)
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
            setIsModalCreateOpen(true)
        }
    };

    return (
        <div>
            <Modal title="Add a new  users"
                open={isModalCreateOpen}
                onOk={handleOk}
                onCancel={() => setIsModalCreateOpen(false)}
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
        </div>
    )
}


export default CreateUsersModal