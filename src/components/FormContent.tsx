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

interface FormContentProps {
    questionsData: QuestionProps[]
}

export const FormContent: React.FC<FormContentProps> = ({ questionsData }) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(1)
    const [questions, setQuestions] = useState<QuestionProps[] | null>(null)
    const [answers, setAnswers] = useState<AnswerProps[] | null>(null)

    useEffect(() => {
        const getQuestions = async () => {
            setQuestions(questionsData)
            console.log("ICI ON OBSERVE", questionsData)

            setAnswers(questionsData[currentQuestion - 1].possibleAnswer)
        }
        getQuestions()
    }, [currentQuestion])

    return (
        <>
            {questions?.map((question: QuestionProps, index: number) => (
                <>
                    {currentQuestion === index + 1 ? (
                        <Card key={`question_${index}`}>
                            <CardTitle className="p-4">
                                Question n°{question.id}
                            </CardTitle>
                            <CardContent>
                                <div>{question.question}</div>
                                <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2">
                                    {answers?.map(
                                        (
                                            answer: AnswerProps,
                                            index: number
                                        ) => (
                                            <Toggle
                                                aria-label="Toggle italic"
                                                key={`answer_${index}`}
                                            >
                                                {answer.answer}
                                            </Toggle>
                                        )
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="w-full flex justify-evenly">
                                {currentQuestion > 1 && (
                                    <Button
                                        onClick={() => {
                                            if (currentQuestion > 1) {
                                                setCurrentQuestion(
                                                    currentQuestion - 1
                                                )
                                            }
                                        }}
                                    >
                                        Question précedente
                                    </Button>
                                )}
                                {currentQuestion < questions.length && (
                                    <Button
                                        onClick={() => {
                                            if (
                                                currentQuestion <
                                                questions?.length
                                            ) {
                                                setCurrentQuestion(
                                                    currentQuestion + 1
                                                )
                                            }
                                        }}
                                    >
                                        passer
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ) : null}
                </>
            ))}
        </>
    )
}
