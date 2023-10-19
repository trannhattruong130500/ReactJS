
interface IProps {
    name: string;
    age: number;
    info: {
        address: string;
        gender: string;
    }
    abc?: string
}

const InputTodo = (props: IProps) => {
    console.log("props: ", props)
    return (
        <div>
            <div>age: {props.age}</div>
            <div>name: {props.name}</div>
            <div>address: {props.info.address}</div>
            <div>gender: {props.info.gender}</div>
            <div>Add new todo</div>
            <div>
                <input style={{ margin: "5px" }}></input>
                <button>Save</button>
            </div>
        </div>
    )
}

export default InputTodo;