# Omni Web Search Mode

## Overview

The Web Search mode for Omni enables the agent to access and integrate real-time information from the web into conversations. This feature allows Omni to:

- Find current information on topics
- Verify facts with up-to-date sources
- Provide context from multiple perspectives
- Enhance discussions with external knowledge

## How It Works

### Architecture

The web search feature consists of three main components:

1. **Frontend (Omni Search Mode)**: A specialized Omni mode that handles user interactions related to web search.
2. **API Endpoint**: A Next.js API route that integrates with OpenAI's web search capabilities.
3. **Integration**: Connections between the search mode and other Omni modes.

### Implementation Details

- The web search functionality uses OpenAI's function-calling pattern with a tool that has type "function" and function.name "web_search"
- Search requests are processed through the `/api/web-search` endpoint
- The endpoint makes two API calls to OpenAI:
  1. Initial call with web_search tool enabled to perform the search
  2. Follow-up call that passes the tool response back to generate a comprehensive, human-friendly response
- Results are formatted with source attributions and returned to the agent
- The agent synthesizes information before presenting it to users

## API Structure

The `/api/web-search` endpoint:

```typescript
// Request format
{
  "query": "What are the latest developments in AI?",
  "focus": "recent" // Optional: recent, scholarly, news, technical, general
}

// Response format
{
  "original_completion": {
    // The raw OpenAI completion with tool_calls
  },
  "enhanced_data": {
    "query": "What are the latest developments in AI?",
    "focus": "recent",
    "timestamp": "2025-03-21T12:27:32.247Z"
  },
  "enhanced_response": {
    // The follow-up OpenAI completion with comprehensive, formatted results
  }
}
```

## Testing

To test the web search functionality:

1. Start the development server:
   ```
   npm run dev
   ```

2. Run the automated test script:
   ```
   npx ts-node src/app/test/webSearchTest.ts
   ```

3. Test the API directly with curl:
   ```
   curl -X POST http://localhost:3000/api/web-search \
     -H "Content-Type: application/json" \
     -d '{"query":"What are the latest developments in AI?", "focus":"recent"}'
   ```

4. Use the Omni web search mode in the UI by:
   - Selecting the Omni agent
   - Asking a question that requires web search
   - Omni will automatically use or suggest the web search mode

## Conversation Flow

A typical web search interaction follows these steps:

1. **Clarify Search Need**: Omni understands what information is needed
2. **Perform Search**: Omni sends a search query to the web-search API
3. **Process Results**: The API performs the search and formats the results
4. **Synthesize Findings**: Omni organizes and contextualizes the search results
5. **Relate to Context**: Omni connects the information to the original discussion
6. **Check Satisfaction**: Omni ensures the information meets the user's needs

## Customization Options

- **Search Focus**: Specify the type of information to prioritize
  - `recent`: Information from the past year
  - `scholarly`: Academic and research sources
  - `news`: News articles and current events
  - `technical`: Technical documentation and specifications
  - `general`: Balanced information from various sources

## Limitations

- Search results are dependent on OpenAI's web search tool capabilities
- The current implementation doesn't maintain search history between sessions
- Search focus parameters are suggestions and may not always be strictly followed
- This implementation uses a simulation of web search results in the second API call

## Troubleshooting

- If the test fails with a connection error, ensure the Next.js server is running
- If search results are empty, try using a more specific search query
- If the enhanced response is not generated, check for errors in the API endpoint

## Future Enhancements

- Integration with specialized knowledge bases
- Improved source tracking and citation
- Custom search filters for specific domains
- Visual representation of search results
- Persistent search history for follow-up questions 