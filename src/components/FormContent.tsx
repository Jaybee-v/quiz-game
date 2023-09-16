"use client"
import React, { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { AnswerProps, QuestionProps } from "../models/Question"
import { Toggle } from "./ui/toggle"
import confetti from "canvas-confetti"

interface FormContentProps {
    questionsData: QuestionProps[]
}

export const FormContent: React.FC<FormContentProps> = ({ questionsData }) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(1)
    const [questions, setQuestions] = useState<QuestionProps[] | null>(null)
    const [answers, setAnswers] = useState<AnswerProps[] | null>(null)
    const [formEnded, setFormEnded] = useState<boolean>(false)

    const [validatedAnswer, setValidatedAnswer] = useState<boolean>(false)
    const [points, setPoints] = useState<number>(0)

    useEffect(() => {
        const getQuestions = async () => {
            setQuestions(questionsData)
            console.log("ICI ON OBSERVE", questionsData)

            setAnswers(questionsData[currentQuestion - 1].possibleAnswer)
        }
        getQuestions()
    }, [currentQuestion, questionsData])

    const handleSelectedAnswer = (index: number) => {
        console.log(answers![index].valid)

        if (answers![index].valid) {
            setValidatedAnswer(true)
            setPoints(points + 1)
        }
        setTimeout(() => {
            currentQuestion < questionsData?.length
                ? setTimeout(() => {
                      setValidatedAnswer(false)
                      setCurrentQuestion(currentQuestion + 1)
                  }, 900)
                : setTimeout(() => {
                      setValidatedAnswer(false)
                      setFormEnded(true)
                      confetti()
                      setTimeout(() => {
                          confetti()
                      }, 800)
                  }, 900)
        }, 900)
    }

    return (
        <>
            {!formEnded ? (
                <>
                    {questions?.map(
                        (question: QuestionProps, index: number) => (
                            <>
                                {currentQuestion === index + 1 ? (
                                    <Card key={`question_${index}`}>
                                        <CardContent>
                                            <div className="pt-4 pb-6">
                                                Réponds aux questions sans faire
                                                d&apos;erreurs le plus
                                                rapidement possible
                                            </div>
                                            <div className="mb-4">
                                                {question.question}
                                            </div>
                                            <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 gap-4">
                                                {answers?.map(
                                                    (answer: AnswerProps) => (
                                                        <Toggle
                                                            aria-label="Toggle italic"
                                                            key={`answer_${
                                                                answer.id
                                                            }_question_${
                                                                index + 1
                                                            }`}
                                                            onClick={() =>
                                                                handleSelectedAnswer(
                                                                    answer.id -
                                                                        1
                                                                )
                                                            }
                                                            className={`${
                                                                validatedAnswer
                                                                    ? "data-[state=on]:bg-green/30 data-[state=on]:text-green data-[state=on]:ring-2 data-[state=on]:ring-green"
                                                                    : "data-[state=on]:bg-red/30 data-[state=on]:text-red data-[state=on]:ring-2 data-[state=on]:ring-red"
                                                            }`}
                                                        >
                                                            {answer.answer}
                                                        </Toggle>
                                                    )
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="w-full flex flex-col md:flex-row justify-evenly gap-4">
                                            {currentQuestion > 1 && (
                                                <Button
                                                    onClick={() => {
                                                        if (
                                                            currentQuestion > 1
                                                        ) {
                                                            setCurrentQuestion(
                                                                currentQuestion -
                                                                    1
                                                            )
                                                        }
                                                    }}
                                                >
                                                    Question précedente
                                                </Button>
                                            )}

                                            <Button
                                                onClick={() => {
                                                    if (
                                                        currentQuestion <
                                                        questions?.length
                                                    ) {
                                                        setCurrentQuestion(
                                                            currentQuestion + 1
                                                        )
                                                    } else {
                                                        setTimeout(() => {
                                                            setValidatedAnswer(
                                                                false
                                                            )
                                                            setFormEnded(true)
                                                            confetti()
                                                            setTimeout(() => {
                                                                confetti()
                                                            }, 800)
                                                        }, 900)
                                                    }
                                                }}
                                            >
                                                {currentQuestion <
                                                questions.length
                                                    ? "Passer"
                                                    : "Terminer"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ) : null}
                            </>
                        )
                    )}
                </>
            ) : (
                <Card className="md:w-96 mx-auto">
                    <CardTitle className="p-4 text-center">
                        🎉 Félicitations 🎉
                    </CardTitle>
                    <CardContent>
                        <div className="w-fit border-2 border-darkGrayMax mx-auto p-4 rounded-xl">
                            Ton score est de :
                            <div
                                className={`
                            ${points > 2 ? "text-green" : ""}
                            ${points >= 1 && points <= 2 ? "text-orange" : ""}
                            ${points < 1 ? "text-red" : ""}
                            text-xl text-center`}
                            >
                                {points} / {questions?.length}
                            </div>
                        </div>
                        {points >= questions!.length / 3 && (
                            <div className="border-2 border-green bg-green/10 text-green rounded-2xl p-4 mt-4">
                                {" "}
                                Félicitations. Ton score est{" "}
                                {points === questions!.length
                                    ? "PARFAIT 🎉  🍾"
                                    : ""}
                                {points >= questions!.length / 3 &&
                                points < questions!.length
                                    ? "EXCELLENT 🎉"
                                    : ""}
                            </div>
                        )}
                        {points >= questions!.length / 6 &&
                            points <= questions!.length / 3 && (
                                <div className="border-2 border-orange bg-orange/10 text-orange rounded-2xl p-4 mt-4">
                                    {" "}
                                    Continue comme ça. Tu vas t&apos;améliorer
                                    est finir par être un top.
                                </div>
                            )}
                        {points < questions!.length / 6 && (
                            <div className="border-2 border-red bg-red/10 text-red rounded-2xl p-4 mt-4">
                                Il va falloir faire des efforts, mais à coeur
                                vaillant rien d&apos;impossible.
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex w-ful justify-center">
                        <Button
                            onClick={() => {
                                setFormEnded(false)
                                setCurrentQuestion(1)
                                setPoints(0)
                            }}
                        >
                            Rejouer
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    )
}
