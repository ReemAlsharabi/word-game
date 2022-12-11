import axios from 'axios'
import {useEffect, useState} from 'react'
import {click} from "@testing-library/user-event/dist/click";
const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'X-RapidAPI-Key': 'e805208783msh139a465f727b869p1ee4cejsn4096c4dbd343',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_KEY
      }
    }

    axios.request(options).then(function (response) {
      console.log(response.data);
      setWords(response.data)
    }).catch(function (error) {
      console.error(error)
    });
  }

useEffect(()=>{
  if (chosenLevel) getRandomWords()
},[chosenLevel])
  const checkAnswer = (option, optionIndex, correct) => {
    if (optionIndex == correct){
      setCorrectAnswers([...correctAnswers, optionIndex])
      setScore((score)=>score+1)
    } else {
      setScore((score)=>score-1)
    }
    setClicked([...clicked, optionIndex])
  }
  return (
    <div className="app">

      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select
            name="levels"
            id = "levels"
            value={chosenLevel}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setChosenLevel(e.target.value)}>
          <option value={null}>Select a level</option>
          <option value="1">level 1</option>
          <option value="2">level 2</option>
          <option value="3">level 3</option>
          <option value="4">level 4</option>
          <option value="5">level 5</option>
          <option value="6">level 6</option>
          <option value="7">level 7</option>
          <option value="8">level 8</option>
          <option value="9">level 9</option>
          <option value="10">level 10</option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is: {score}</h3>
        <div className="questions"></div>

        {words.quizlist.map((question, _questionIndex) =>(
            <div key={_questionIndex} className="question-box">
              {question.quiz.map((tip, _index)=>(
                  <p key={_index}>{tip}</p>))}
              <div className="question-buttons">
                {question.option.map((option, optionIndex)=>(
                    <div key={optionIndex} className="question-button">
                      <button
                          onClick={()=>checkAnswer(option, optionIndex+1, question.correct)}
                      >{option}
                      </button>
                    </div>
                ))}
              </div>
            </div>))}
          <button onClick={()=>setChosenLevel(null)}>Go Back</button>

      </div>}
      </div>
  );
}

export default App;
