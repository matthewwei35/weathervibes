import { useState } from 'react';
import RadioButton from './RadioButton';

function MoodInput() {
  const [message, setMessage] = useState('');

  return (
    <div className="MoodInput">
      <h2>How are you feeling today?</h2>
      <p>{message}</p>
      <form onSubmit={e => {
        e.preventDefault();
      }}> 
        <RadioButton
          label="happy"
          name="mood"
          onChange={() => setMessage('Yay, that is wonderful!')}
        />
        <RadioButton
          label="calm"
          name="mood"
          onChange={() => setMessage('The weather is calm too.')}
        />
        <RadioButton
          label="sad"
          name="mood"
          onChange={() => setMessage('I hope you feel better.')}
        />
      </form>
    </div>
  )
}

export default MoodInput;
