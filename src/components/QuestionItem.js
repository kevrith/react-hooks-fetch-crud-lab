import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const [value, setValue] = useState(String(correctIndex));

  const options = answers.map((answer, index) => (
    <option key={index} value={String(index)}>
      {answer}
    </option>
  ));

  function handleChange(e) {
    const newVal = e.target.value;
    setValue(newVal);
    onUpdate(id, parseInt(newVal));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select aria-label="Correct Answer" value={value} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
