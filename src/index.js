import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config();

console.log(process.env.OPENAI_KEY);

//Create an instance of OpenAI class
const openai = new OpenAI({apiKey : process.env.OPENAI_KEY})

const main = async () => {
    //Define the prompt
    const prompt = "How big is Singapore?";

    //send API request\
    const response = await openai.chat.completions.create(
        {
            model: "gpt-4.1",
            messages : [{
                role : "user",
                content: prompt,
            },
            ]
        }
    )
console.log(response.choices[0].message.content);

};

main();



