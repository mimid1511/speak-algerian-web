"use client";

import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/api/firebaseConfig'; // Assurez-vous que le chemin est correct
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/app/layout';
import Title from '@/components/Title';
import { useRouter } from 'next/navigation';
import { addLessonCompleted } from '@/api/auth';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const EvaluationPage = ({ params }) => {
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [testFinished, setTestFinished] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const evaluationId = params.lessonId;
    const unitId = params.unitId;
    const maxTime = 20 * 1000;

    // Ref pour l'audio
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const docRef = doc(db, "assessments", evaluationId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const shuffledQuestions = shuffleArray(data.questions);

                    // Limiter à 20 questions aléatoires
                    const selectedQuestions = shuffledQuestions.slice(0, Math.min(shuffledQuestions.length, 20));

                    // Mélanger les réponses de chaque question
                    selectedQuestions.forEach(question => {
                        question.answers = shuffleArray(question.answers);
                    });

                    setQuestions(selectedQuestions);
                } else {
                    setError('Évaluation non trouvée');
                }
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvaluation();
    }, [evaluationId]);

    useEffect(() => {
        if (testStarted && timeLeft < maxTime) {
            const intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft + 10);
            }, 10);

            return () => clearInterval(intervalId);
        } else if (testStarted && timeLeft >= maxTime) {
            handleNextQuestion();
        }
    }, [timeLeft, testStarted]);

    const handleStartTest = () => {
        setTestStarted(true);
        setTimeLeft(0);
    };

    const handleAnswerClick = (isCorrect, selectedAnswer) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setUserAnswers([...userAnswers, {
            question: questions[currentQuestionIndex].statement,
            selectedAnswer,
            correctAnswer: questions[currentQuestionIndex].answers.find(a => a.correct).wording
        }]);
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(0);
        } else {
            setTestFinished(true);
        }
    };

    const restartTest = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(0);
        setTestStarted(false);
        setTestFinished(false);
        setUserAnswers([]);
    };

    useEffect(() => {
        if (testFinished && score / questions.length >= 0.8) {
            const audio = audioRef.current;

            if (audio) {
                audio.currentTime = 9.5;
                audio.play();

                const stopAudio = setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0; // Réinitialiser pour la prochaine utilisation
                }, 10800); // Arrête la musique après 10 secondes (20 - 10 = 10 secondes)

                return () => clearTimeout(stopAudio);
            }
        }
    }, [testFinished, score, questions.length]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!testStarted) {
        return (
            <Layout type="root">
                <Title title={"Évaluation"}/>
                <div className="p-4 bg-font text-center">
                    <div className='bg-white p-16'>
                        {isLoading ? (
                            <button className="btn btn-outline-primary btn-xl btn-loading" disabled>
                                <span className="w-4 h-4 spinner" role="status" aria-hidden="true"></span>
                                <span className="pl-1"> Chargement...</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleStartTest}
                                className="py-2 px-4 btn btn-primary rounded-none btn-xl"
                            >
                                Démarrer le test
                            </button>
                        )}
                    </div>

                </div>
            </Layout>
        );
    }

    if (testFinished) {
        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;
        const isPassed = percentage >= 80;
        if (isPassed) {
            addLessonCompleted(evaluationId);
        }

        return (
            <Layout type="root">
                <Title title={"Résultat de l'évaluation"} />
                <div className="p-4 bg-font flex flex-col items-center">
                    <div style={{backgroundColor: '#FCFEFC'}}  className="md:p-8 flex flex-col items-center space-y-4 container max-w-xl">
                        <p className={`text-2xl font-bold ${isPassed ? "bg-green-200" : "bg-red-200"} p-4 text-center`}>
                            {isPassed ? "Vous avez réussi l'évaluation !" : "Vous avez échoué l'évaluation."}
                        </p>
                        {isPassed && (
                            <img src='\victory.gif' width={150} />
                        )}
                        <p className='font-semibold p-4 text-xl mt-8 mb-2 bg-gray-100 text-center'>
                            Score: {percentage.toFixed(2)}%
                        </p>
                        {isPassed ?
                            <button
                                onClick={() => router.push("/units/" + unitId)}
                                className="py-2 px-4 w-full rounded-none btn btn-primary btn-lg mt-4"
                            >
                                Retourner à l'unité
                            </button>
                            :
                            <button
                                onClick={restartTest}
                                className="py-2 rounded-none px-4 w-full btn bg-red-700 hover:bg-red-900 text-white btn-lg mt-4"
                            >
                                Recommencer
                            </button>
                        }
                    </div>
                    {isPassed && <Fireworks autorun={{ speed: 3, duration: 10000, delay: 500 }} />}
                    <div className="bg-white mt-4 p-8 rounded">
                        <h3 className="text-xl font-bold mb-8 mt-2 text-center">
                            Détails des réponses ({score}/{totalQuestions})
                        </h3>
                        <div className="grid  ">
                            <ul className="list list-flush list-none">
                                {userAnswers.map((answer, index) => (
                                    <li key={index} className={`list-item bg-${answer.selectedAnswer === answer.correctAnswer ? 'green-100' : 'red-100'} text-${answer.selectedAnswer === answer.correctAnswer ? 'green-800' : 'red-700'} p-4 rounded mb-2`}>
                                        <p>Question: {answer.question}</p>
                                        {answer.selectedAnswer !== answer.correctAnswer ? (
                                            <>
                                                <p>Votre réponse: {answer.selectedAnswer}</p>
                                                <p>Réponse correcte: <strong>{answer.correctAnswer}</strong></p>
                                            </>
                                        ) : (
                                            <p>Réponse: <strong>{answer.correctAnswer}</strong></p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Lecteur audio caché */}
                <audio ref={audioRef} src="/victory.mp3" />
            </Layout>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressValue = (timeLeft / maxTime) * 100;

    return (
        <Layout type="root">
            <Title title={"Évaluation"} />
            <div className="p-4 bg-font">
                <div className="bg-white p-5 md:p-16">
                    <div className="text-center mb-12">
                        <span className="badge bg-gray-100 text-gray-900 mb-4">
                            {currentQuestionIndex + 1} / {questions.length}
                        </span>

                        <progress
                            className="progress text-gray-400"
                            value={progressValue}
                            max="100"
                        >
                            {progressValue}%
                        </progress>
                    </div>
                    <div>
                        <h2 className="mb-4 font-bold text-center text-2xl">{currentQuestion.statement}</h2>
                        <br />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer.correct, answer.wording)}
                                    className="btn rounded-none font-semibold btn-light btn-xl"
                                >
                                    {answer.wording}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

EvaluationPage.getInitialProps = async ({ query }) => {
    return { params: query };
};

export default EvaluationPage;
