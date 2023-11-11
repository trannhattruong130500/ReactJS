import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
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

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setAddress(dataUpdate.address);
            setAge(dataUpdate.age);
            setRole(dataUpdate.role);
            setGender(dataUpdate.gender);
        }
    }, [dataUpdate])

    const handleOk = async () => {
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
            setIsModalUpdateOpen(true)
        }
    };

    return (
        <div>
            <Modal title="Update users"
                open={isModalUpdateOpen}
                onOk={handleOk}
                onCancel={() => setIsModalUpdateOpen(false)}
                maskClosable={false}
            >
                <div hidden>
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
                </div>
            </Modal>
        </div>
    )
}


export default UpdateUsersModal