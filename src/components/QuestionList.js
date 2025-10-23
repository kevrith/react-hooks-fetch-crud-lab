import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("http://localhost:4000/questions");
      const data = await res.json();
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  async function handleDelete(id) {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  }

  async function handleUpdate(id, correctIndex) {
    const res = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    });
    const updated = await res.json();
    setQuestions((qs) => qs.map((q) => (q.id === updated.id ? updated : q)));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
