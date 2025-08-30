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
  const prompt: string = "Give me a detailed overview of India";

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
        //User question
        role: "user",
        content: prompt,
      },
    ],
    max_tokens : 1000,
    temperature : 1,
    top_p : 0.9,
    //no of choices
    n : 2, 
    frequency_penalty : 1.5,



  });

  //Assistant answer
  //for n = 1
  console.log(response.choices?.[0]?.message?.content ?? "No response received");
  
  //for n =2 
  console.log(response.choices?.[1]?.message?.content ?? "No response received");

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