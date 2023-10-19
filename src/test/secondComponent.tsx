

const SecondComponent = () => {
    const name = "Hoi dan it";
    const age = 26;

    const info = {
        name: "truong",
        age: 26
    }

    //jsx
    return (
        <div>
            <div>
                <h1>Hello: {name}, {age} year old</h1>
                {/* <img
                    src="https://i.imgur.com/yXOvdOSs.jpg"
                    alt="Hedy Lamarr"
                    className="photo"
                /> */}
                <ul>
                    <li>Invent new traffic lights </li>
                    <li>Rehearse a movie scene </li>
                    <li>Improve the spectrum technology</li>
                </ul>
            </div>
        </div>
    )
}

export default SecondComponent;
