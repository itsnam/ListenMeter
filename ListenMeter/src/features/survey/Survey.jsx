import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assessment from '../../../public/assessment.json';
import { useEmail } from '../../context/EmailContext';

const Survey = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const { email } = useEmail()

  useEffect(() => {
    if(!email){
        navigate('/');
    }
  })

  const handleAnswer = (questionId, score) => {
    const newAnswers = [...answers];
    newAnswers[questionId] = score;
    setAnswers(newAnswers);
    setSelectedAnswer(score); 

    const newTotalScore = newAnswers.reduce((acc, cur) => acc + cur, 0);
    setTotalScore(newTotalScore);
  };

  const nextQuestion = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/result', { state: { totalScore } });
  };

  const currentQ = assessment.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-home-background lg:p-20 pt-20 p-10 flex flex-col items-center gap-12">
      <p className="text-center text-white lg:text-2xl text-base font-normal">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </p>
      <div className="bg-gray-500 bg-opacity-50 flex flex-col gap-6 rounded-lg p-4 min-h-[300px]">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <p className="lg:text-lg text-white text-base font-normal">
            CÂU HỎI {currentQuestion + 1}/10
          </p>
        </div>

        <p className="text-white min-h-44 md:min-h-20 lg:max-w-5xl text-center lg:text-lg text-base font-bold">
          {currentQ.title}
        </p>

        {currentQ.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(currentQ.id - 1, option.score)}
            className={`p-2 rounded-md border-2 ${selectedAnswer === option.score ? 'text-blue-200 border-blue-200' : 'text-white border-white '}`}
          >
            {option.text}
          </button>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex md:gap-2 p-2 pl-4 pr-4 font-bold rounded-sm ${currentQuestion == 0 ? 'text-white bg-gray-500': 'text-blue-300 bg-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            Quay lại
          </button>
          <button
            onClick={currentQuestion === assessment.questions.length - 1 ? handleSubmit : nextQuestion}
            disabled={selectedAnswer === null}
            className={`flex md:gap-2 p-2 pl-4 pr-4 text-white font-bold rounded-sm ${selectedAnswer === null ? 'bg-gray-500' : 'bg-blue-300'}`}
          >
            {currentQuestion === assessment.questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;