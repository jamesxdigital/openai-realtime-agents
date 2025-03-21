import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

// Define a type that extends the OpenAI types to include web_search_options
interface WebSearchParams {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
  }[];
  web_search_options?: object;
}

export async function POST(req: Request) {
  try {
    const { query, focus } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Add context based on search focus
    let searchContext = "";
    if (focus) {
      switch (focus) {
        case "recent":
          searchContext = "focusing on the most recent information from the past year";
          break;
        case "scholarly":
          searchContext = "focusing on scholarly and academic sources";
          break;
        case "news":
          searchContext = "focusing on news articles and current events";
          break;
        case "technical":
          searchContext = "focusing on technical details and documentation";
          break;
        default:
          searchContext = "providing general information";
      }
    }

    // Construct the query with context
    const queryWithContext = `${query} ${searchContext ? '- ' + searchContext : ''}`;

    // Call OpenAI's chat completions API with the search-enabled model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-search-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides accurate, up-to-date information by searching the web. Provide comprehensive answers with source citations when available."
        },
        {
          role: "user",
          content: queryWithContext
        }
      ],
      web_search_options: {}
    });

    // Create a simplified response object
    const responseObj = {
      search_query: query,
      focus: focus || "general",
      timestamp: new Date().toISOString(),
      results: completion.choices[0]?.message?.content || "No results found",
      completion: completion
    };

    return NextResponse.json(responseObj);
  } catch (error: any) {
    console.error("Error in /web-search:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 