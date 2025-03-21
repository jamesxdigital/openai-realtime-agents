/**
 * Web Search Test - Manual test script for the Omni search functionality
 * 
 * This is a simple test script that can be run to validate the web search functionality.
 * Run this with:
 * 
 * ts-node src/app/test/webSearchTest.ts
 */

// Add a delay function to ensure the server is ready
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function testWebSearch() {
  console.log("Testing web search functionality...");
  
  try {
    // Wait for server to be ready
    console.log("Waiting for server to be ready...");
    await delay(3000);
    
    console.log("Testing direct API call...");
    
    // Test direct API call
    try {
      const apiResponse = await fetch("http://localhost:3000/api/web-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: "Who is the President of the United States?", 
          focus: "recent" 
        }),
      });
      
      if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.status} ${apiResponse.statusText}`);
      }
      
      const apiResult = await apiResponse.json();
      console.log("API Response:");
      console.log(JSON.stringify(apiResult, null, 2).substring(0, 500) + "...");
      
      // Simulate tool call from omniSearch
      console.log("\nSimulating tool call from omniSearch...");
      
      // This would be the toolLogic.web_search function from omniSearch.ts
      const toolResponse = await fetch("http://localhost:3000/api/web-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: "Who is the President of the United States?", 
          focus: "recent" 
        }),
      });
      
      if (!toolResponse.ok) {
        throw new Error(`Tool Error: ${toolResponse.status} ${toolResponse.statusText}`);
      }
      
      const searchResults = await toolResponse.json();
      
      // Process the results as the toolLogic would
      console.log("Processed Tool Response (Sample):");
      console.log(JSON.stringify({
        status: "success", 
        query: searchResults.search_query,
        focus: searchResults.focus,
        timestamp: searchResults.timestamp,
        // Show just a sample of the results for brevity
        response_snippet: searchResults.results.substring(0, 200) || "No content"
      }, null, 2));
      
      console.log("\nTests completed successfully!");
    } catch (fetchError) {
      console.error("Error connecting to the server:", fetchError);
      console.log("\nMake sure your Next.js server is running with 'npm run dev' and try again.");
      console.log("If the server is running, check if the API endpoint is correctly implemented.");
    }
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

// Run the test
testWebSearch(); 