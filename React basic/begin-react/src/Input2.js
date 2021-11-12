import React, {useState} from 'react';

const Input2 = () => {

    const [inputs, setInputs] = useState({
        name : '',
        nickname : '',
        age : '',
    });
    const {name, nickname, age} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        console.log(inputs);
        setInputs({
            // 불변성을 지키면서 변동을 주기 위해서는
            // name이나 nick에 직접적인 값을 입력하는게 아니라
            ...inputs, // = name:'', nickname: ''
            [name] : value // 내가 클릭한 name에 value매칭
        });
    }
    
    const onReset = (e) => {
        setInputs({
            name: '',
            nickname: '',
            age: '',
        });
    }

    return (
        <div>
            <input onChange={onChange} name="name" value={name}/>
            <input onChange={onChange} name="nickname" value={nickname}/>
            <input onChange={onChange} name="age" value={age}/>
            <button onClick={onReset}>초기화</button><br/>
            <d>값: {name}({nickname})&nbsp;{age}</d>
        </div>
    );
}

export default Input2;