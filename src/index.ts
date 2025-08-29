import * as dotenv from "dotenv";
import { encoding_for_model } from "tiktoken";
dotenv.config();

import OpenAI from "openai";
import { log } from "console";

// Define type for environment variable
const OPENAI_KEY: string = process.env.OPENAI_KEY ?? "";

// Create an instance of OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

// Define main function with async/await
const main = async (): Promise<void> => {
  // Define the prompt
  const prompt: string = "How big is Singapore?";

  // Send API request
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        //to make the output in more sequenced way
        role : "system",
        content : `You respond to the greetings in the beginning in a friendly manner. 
        Always respond in JSON Format, like this : {"greetings" : "greetings here",
          "Result" : "result of prompt here}`
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Handle response safely
  console.log(response.choices?.[0]?.message?.content ?? "No response received");
};

const encodePrompt = (prompt : string) => {
  // Load encoding for a specific model
  const encoder = encoding_for_model("gpt-4.1");
  // Encode the text → returns an array of token IDs (numbers)
  const tokens = encoder.encode(prompt);

  console.log(tokens);
  //total numbers of token
  console.log("Number of tokens:", tokens.length);


}

encodePrompt("Singapore is a small island city-state located in Southeast Asia. Its total land area is approximately **733 square kilometers** (about **283 square miles**). Despite its small size, Singapore is highly developed and densely populated, with over 5.5 million residents as of 2023. ");

// Run main
main().catch((error) => {
  console.error("Error:", error);
});



// // const dotenv = require("dotenv")
// import * as dotenv from "dotenv";
// dotenv.config();

// import OpenAI = require ("openai"); 
// // const OpenAI = require("openai");

// // console.log(process.env.OPENAI_KEY);
 
// //Create an instance of OpenAI class
// const openai = new OpenAI({
//     apiKey : process.env.OPENAI_KEY, 
// });

// const main = async () => {

//     //Define the prompt
//     const prompt = "How big is Singapore?";

//     //send API request
//     const response = await openai.chat.completions.create(
//         {
//             model: "gpt-4.1",
//             messages : [{
//                 role : "user",
//                 content: prompt,
//             },
//             ]
//         }
//     )
// console.log(response.choices?.[0]?.message?.content);

// };

// main();


