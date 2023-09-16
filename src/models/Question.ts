export interface QuestionProps  {
    id: number
    question: string
    possibleAnswer: AnswerProps[]
}

export interface AnswerProps {
    id: number
    answer: string
}