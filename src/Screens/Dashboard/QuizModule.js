import React, { useEffect } from 'react'
import Quiz from '../../Component/Single Course/Quiz/Quiz';
import { useGetQuestionByModuleIdQuery } from '../../Redux/Services/questionService';
import { setIsTableLoading, setQuizData } from '../../Redux/Slice/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const quizQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctOption: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctOption: 'Mars',
    },
  ];



const QuizModule = ({ id }) => {
  const location = useLocation();
  const dispatch=useDispatch()
  const queryParams = new URLSearchParams(location.search);
  const quizModuleId = queryParams.get('moduleId');
  const queryParamss = new URLSearchParams(location.search);
  const quizCourseId = queryParamss.get('courseId');
  const {quizData}=useSelector((state)=>state.question)
  const {data ,isFetching ,isLoading}=useGetQuestionByModuleIdQuery(quizModuleId)
  //console.log(data?.questions)
  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setQuizData(data?.questions));
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [dispatch, data, isFetching, isLoading]);

  console.log(quizData)
  return (
      <Quiz questions={quizData} quizCourseId={quizCourseId} />
  )
}

export default QuizModule