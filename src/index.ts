// const dotenv = require("dotenv")
import * as dotenv from "dotenv";
dotenv.config();

import OpenAI = require ("openai"); 
// const OpenAI = require("openai");

// console.log(process.env.OPENAI_KEY);
 
//Create an instance of OpenAI class
const openai = new OpenAI({
    apiKey : process.env.OPENAI_KEY, 
});

const main = async () => {

    //Define the prompt
    const prompt = "How big is Singapore?";

    //send API request
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
console.log(response.choices?.[0]?.message?.content);

};

main();


// import * as dotenv from "dotenv";
// dotenv.config();

// import OpenAI from "openai";

// // Define type for environment variable
// const OPENAI_KEY: string = process.env.OPENAI_KEY ?? "";

// // Create an instance of OpenAI client
// const openai = new OpenAI({
//   apiKey: OPENAI_KEY,
// });

// // Define main function with async/await
// const main = async (): Promise<void> => {
//   // Define the prompt
//   const prompt: string = "How big is Singapore?";

//   // Send API request
//   const response = await openai.chat.completions.create({
//     model: "gpt-4.1",
//     messages: [
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//   });

//   // Handle response safely
//   console.log(response.choices?.[0]?.message?.content ?? "No response received");
// };

// // Run main
// main().catch((error) => {
//   console.error("Error:", error);
// });
