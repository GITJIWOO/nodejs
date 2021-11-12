import React, {useState} from 'react';

function Input() {

    const [text, setText] = useState('');

    const onChange = (e) => {
        // input 태그 내부 글자를 text 변수에 저장
        setText(e.target.value);
    }

    const reset = (e) => {
        setText({
          text:''
        });
    }

    return (
      <div>
        <input onChange={onChange} />
        <button onClick={reset}>초기화</button>
        <div>
          <b>값 : {text}</b>
        </div>
      </div>
    )
}

export default Input;