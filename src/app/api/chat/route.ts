import { type CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {

        const { messages }: { messages: CoreMessage[] } = await req.json();
        console.log("Messages received:", messages);

        if (!messages || messages.length === 0) {
            throw new Error("No messages provided.");
        }

        const result = await streamText({
            model: google("models/gemini-1.5-flash-latest"),
            system: "You are a helpful assistant",
            messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("Error in /api/chat:", error);
    }
}
