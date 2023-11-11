import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Button, Table, Modal, Input, notification, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateUsersModal from "./create.users.modal";
import UpdateUsersModal from "./update.users.modal";


export interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string;
    address: string;
    age: string;
    gender: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([])

    const access_token = localStorage.getItem("access_token") as string;

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null)

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        const d = await res.json();
        if (!d) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data.result)
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        })
    }

    const confirm = async (users: IUsers) => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users/${users._id}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: JSON.stringify(d.message)
            })
            await getData()
        } else {
            notification.error({
                message: JSON.stringify(d.message)
            })
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
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <div>
                        <Button style={{ marginRight: "15px" }} type="primary" onClick={() => {
                            setDataUpdate(record), setIsModalUpdateOpen(true)
                        }} >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Delete the task"
                            description={`Are you sure to delete Users "${record.name}"?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]

    const handleOnchange = async (page: number, pageSize: number) => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        const d = await res.json();
        if (!d) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data.result)
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        })
        console.log(`>>>check size: `, page, pageSize)
    }

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
                        onClick={() => setIsModalCreateOpen(true)}>Add new
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
                pagination={{
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    onChange: (page: number, pageSize: number) => handleOnchange(page, pageSize),
                    showSizeChanger: true
                }}
            />

            <CreateUsersModal
                access_token={access_token}
                getData={getData}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
            />

            <UpdateUsersModal
                access_token={access_token}
                getData={getData}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

        </div>
    )
}

export default UsersTable