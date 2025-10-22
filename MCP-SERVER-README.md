# Ask Peat MCP Server

This project includes a Model Context Protocol (MCP) server that provides tools for working with your React project.

## Features

The MCP server provides the following tools:

1. **get_project_info** - Get information about the current React project
2. **analyze_code** - Analyze code files in the project
3. **create_component** - Create new React components (functional or class-based)

## Setup

The MCP server is already configured and ready to use. Here's what was set up:

### Dependencies
- `@modelcontextprotocol/sdk` - MCP SDK for Node.js

### Files Created
- `mcp-server.js` - Main MCP server implementation
- `.cursor-mcp.json` - Cursor MCP configuration
- Updated `package.json` with ES module support and MCP scripts

## Usage

### Running the MCP Server

You can run the MCP server using:

```bash
npm run mcp-server
```

For development with debugging:

```bash
npm run mcp-server:dev
```

### Using with Cursor

The MCP server is configured in `.cursor-mcp.json` and should be automatically available in Cursor. You can use the tools through Cursor's AI features.

### Available Tools

#### get_project_info
Returns information about the current project including:
- Project name and version
- Number of dependencies
- Available scripts

#### analyze_code
Analyzes a code file and returns:
- Number of lines
- Character count
- File size

Usage: `analyze_code(filePath: string)`

#### create_component
Creates a new React component with:
- Component file (.js)
- CSS file (.css)
- Support for both functional and class components

Usage: `create_component(name: string, type?: 'functional' | 'class')`

## Configuration

The MCP server configuration is in `.cursor-mcp.json`:

```json
{
  "mcpServers": {
    "ask-peat-server": {
      "command": "node",
      "args": ["mcp-server.js"],
      "cwd": "/Users/toddcifonie/ask-peat"
    }
  }
}
```

## Development

To extend the MCP server with new tools:

1. Add the tool definition to the `ListToolsRequestSchema` handler
2. Add the tool implementation to the `CallToolRequestSchema` handler
3. Implement the tool logic in a new method

## Troubleshooting

If the MCP server doesn't work:

1. Ensure Node.js is installed
2. Run `npm install` to install dependencies
3. Check that the server starts without errors: `npm run mcp-server`
4. Verify the `.cursor-mcp.json` configuration is correct

