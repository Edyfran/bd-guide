'use client';

import { useState } from 'react';
import { DBTopics, topicData, QuizQuestion } from '../data/topics';

interface QuizProps {
  topic: DBTopics;
  onComplete: () => void;
}

export default function Quiz({ topic, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const questions = topicData[topic].quiz;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Verifica se a resposta selecionada está correta
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };
  
  // Avança para a próxima pergunta ou finaliza o quiz
  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // Reinicia o quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };
  
  const getScoreClass = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  if (quizCompleted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4">Quiz Completo!</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="mb-2">Você acertou</p>
          <p className={`text-3xl font-bold ${getScoreClass()}`}>
            {correctAnswers} de {questions.length} ({Math.round((correctAnswers / questions.length) * 100)}%)
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={resetQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Refazer Quiz
          </button>
          
          <button 
            onClick={onComplete}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Próximo Tópico
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 border-t-4 border-blue-600">
      <h2 className="text-xl font-bold mb-6">Teste seus conhecimentos</h2>
      
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-gray-600">Questão {currentQuestionIndex + 1} de {questions.length}</span>
        <span className="text-blue-600">Acertos: {correctAnswers}</span>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswerChecked && setSelectedOption(index)}
              disabled={isAnswerChecked}
              className={`w-full text-left p-3 rounded-md border transition-colors ${
                isAnswerChecked
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : selectedOption === index
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                  : selectedOption === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start">
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                
                {isAnswerChecked && index === currentQuestion.correctAnswer && (
                  <svg className="w-5 h-5 text-green-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                
                {isAnswerChecked && selectedOption === index && index !== currentQuestion.correctAnswer && (
                  <svg className="w-5 h-5 text-red-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        {!isAnswerChecked ? (
          <button
            onClick={checkAnswer}
            disabled={selectedOption === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verificar Resposta
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-green-600 text-white rounded-md"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
          </button>
        )}
      </div>
    </div>
  );
} 