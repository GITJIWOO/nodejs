import React, {useState} from 'react';

const Input2 = () => {

    const [inputs, setInputs] = useState({
        name : '',
        nickname : '',
    });
    const {name, nickname} = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        console.log(e.target);
    }

    return (
        <div>
            <input />
            <input />
            <button>초기화</button><br/>
            <d>값: {name}({nickname})</d>
        </div>
    );
}

export default Input2;