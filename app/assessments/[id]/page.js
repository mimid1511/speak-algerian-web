"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/api/firebaseConfig'; // Assurez-vous que le chemin est correct
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/app/layout';
import Title from '@/components/Title';
import { useRouter } from 'next/navigation';
import { addLessonCompleted } from '@/api/auth';

// Fonction pour mélanger un tableau
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
    const [testStarted, setTestStarted] = useState(false); // Nouvel état pour contrôler le démarrage du test
    const [userAnswers, setUserAnswers] = useState([]); // Pour stocker les réponses de l'utilisateur
    const evaluationId = params.id; // Récupérer l'ID de l'évaluation depuis les props

    const maxTime = 20 * 1000; // Durée maximale du temps pour chaque question en millisecondes

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const docRef = doc(db, "assessments", evaluationId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const shuffledQuestions = shuffleArray(data.questions);
                    shuffledQuestions.forEach(question => {
                        question.answers = shuffleArray(question.answers);
                    });
                    setQuestions(shuffledQuestions);
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
                setTimeLeft((prevTimeLeft) => prevTimeLeft + 10); // Augmente toutes les 10ms
            }, 10);

            return () => clearInterval(intervalId);
        } else if (testStarted && timeLeft >= maxTime) {
            handleNextQuestion();
        }
    }, [timeLeft, testStarted]);

    const handleStartTest = () => {
        setTestStarted(true); // Démarrer le test
        setTimeLeft(0); // Initialiser le temps pour la première question
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
            setTimeLeft(0); // Réinitialiser le temps pour la question suivante
        } else {
            setTestFinished(true);
        }
    };

    const restartTest = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(0);
        setTestStarted(false); // Réinitialiser l'état de démarrage
        setTestFinished(false);
        setUserAnswers([]);
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!testStarted) {
        return (
            <Layout type="root">
                <Title>Évaluation</Title>
                <div className="p-4 bg-gray-200 text-center">
                    {isLoading ? (
                        <button className="btn btn-outline-dark btn-loading" disabled>
                            <span className="w-4 h-4 spinner" role="status" aria-hidden="true"></span>
                            <span className="pl-1">Chargement...</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleStartTest}
                            className="py-2 px-4 btn btn-primary btn-lg mt-4"
                        >
                            Démarrer le test
                        </button>
                    )}
                </div>
            </Layout>
        );
    }

    if (testFinished) {
        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;
        const isPassed = percentage >= 70;
        if(isPassed){
            addLessonCompleted(params.id);
        }

        return (
            <Layout type="root">
                <Title>Résultat de l'évaluation</Title>
                <div className="p-4 bg-gray-200">
                    <div className="bg-white md:p-8 rounded shadow-md text-center">
                        <p>Score: {score} / {totalQuestions}</p>
                        <p>Pourcentage: {percentage.toFixed(2)}%</p>
                        <p>{isPassed ? "Vous avez réussi l'évaluation!" : "Vous avez échoué l'évaluation."}</p>
                        <button
                            onClick={restartTest}
                            className="py-2 px-4 btn btn-primary btn-lg mt-4"
                        >
                            Recommencer
                        </button>
                    </div>
                    <div className="bg-white mt-8 p-4 rounded shadow-md">
                        <h3 className="text-lg font-bold mb-4">Détails des réponses</h3>
                        <ul className="list-disc pl-5">
                            {userAnswers.map((answer, index) => (
                                <li key={index} className="mb-2">
                                    <p><strong>Question:</strong> {answer.question}</p>
                                    <p><strong>Votre réponse:</strong> {answer.selectedAnswer}</p>
                                    <p><strong>Réponse correcte:</strong> {answer.correctAnswer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressValue = (timeLeft / maxTime) * 100; // Calcul de la valeur de la progression

    return (
        <Layout type="root">
            <Title>Évaluation</Title>
            <div className="p-4 bg-gray-200">
                <div className="bg-white p-5 md:p-16 rounded shadow-md">
                    <div className="text-center mb-12">
                        {/* Afficher le nombre de questions répondues / nombre total */}
                        <span class="badge bg-gray-100 text-gray-900 mb-4">
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
                        <br/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer.correct, answer.wording)}
                                    className="btn font-semibold btn-light btn-xl"
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

// Fonction pour extraire l'ID depuis le contexte de la route (Next.js)
EvaluationPage.getInitialProps = async ({ query }) => {
    return { params: query };
};

export default EvaluationPage;
