import { useState } from "react";

interface IProps {
    name: string;
    age: number;
    info: {
        address: string;
        gender: string;
    }
    handleTest: (name: string) => void;
    listTodos: string[];
    setListTodos: (value: string[]) => void
}

const InputTodo = (props: IProps) => {
    const { handleTest, listTodos, setListTodos } = props
    const [todo, setTodo] = useState("")

    const handleOnClick = () => {
        if (!todo) {
            alert(`Error`)
            return
        } else {
            setListTodos([...listTodos, todo])
            setTodo("")
        }
        // handleTest(todo);
    }

    return (
        <div style={{ border: "1px solid red", padding: "5px" }}>
            <div>Add new todo</div>
            <div>
                <input
                    value={todo}
                    style={{ margin: "5px" }}
                    type="text"
                    onChange={(event) => { setTodo(event.target.value) }}>
                </input>
                <button onClick={() => { handleOnClick() }}>Save</button>
            </div>
        </div>
    )
}

export default InputTodo;