import { CircularProgress } from "@mui/material"; // Ganti dari @material-ui/core
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  console.log(questions);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setOptions(
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
      );
    }
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions && questions.length > 0 ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            {/* <span>Score: {score}</span> */}
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress style={{ marginTop: 50 }} />
      )}
    </div>
  );
};

export default Quiz;
