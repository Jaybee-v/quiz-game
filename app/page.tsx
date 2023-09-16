import { FormContent } from "@/src/components/FormContent"
import { QuestionProps } from "@/src/models/Question"
import fs from "fs"

// Spécifiez le chemin du fichier JSON (chemin relatif depuis le fichier actuel)
const jsonFilePath = "src/assets/data.json"

// Lisez le fichier JSON de manière synchrone
const jsonData = fs.readFileSync(jsonFilePath, "utf-8")

export default function Home() {
    const questions: QuestionProps[] = JSON.parse(jsonData)
    return (
        <main className="p-8">
            <FormContent questionsData={questions} />

            {/* <Card>
                <CardTitle>Test de titre</CardTitle>
                <CardContent>Test</CardContent>
                <CardFooter className="w-full flex justify-evenly">
                    <Button>Question précedente</Button>
                    <Button>passer</Button>
                </CardFooter>
            </Card> */}
        </main>
    )
}
