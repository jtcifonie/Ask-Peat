#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

class AskPeatMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'ask-peat-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_project_info',
            description: 'Get information about the current React project',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'analyze_code',
            description: 'Analyze code files in the project',
            inputSchema: {
              type: 'object',
              properties: {
                filePath: {
                  type: 'string',
                  description: 'Path to the file to analyze',
                },
              },
              required: ['filePath'],
            },
          },
          {
            name: 'create_component',
            description: 'Create a new React component',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the component',
                },
                type: {
                  type: 'string',
                  enum: ['functional', 'class'],
                  description: 'Type of React component',
                  default: 'functional',
                },
              },
              required: ['name'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_project_info':
          return await this.getProjectInfo();
        
        case 'analyze_code':
          return await this.analyzeCode(args.filePath);
        
        case 'create_component':
          return await this.createComponent(args.name, args.type || 'functional');
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async getProjectInfo() {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    try {
      const packageJson = JSON.parse(
        await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8')
      );
      
      return {
        content: [
          {
            type: 'text',
            text: `Project: ${packageJson.name}
Version: ${packageJson.version}
Description: ${packageJson.description || 'No description'}
Dependencies: ${Object.keys(packageJson.dependencies || {}).length} packages
Scripts: ${Object.keys(packageJson.scripts || {}).join(', ')}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error reading project info: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async analyzeCode(filePath) {
    const fs = await import('fs/promises');
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n').length;
      const characters = content.length;
      
      return {
        content: [
          {
            type: 'text',
            text: `File Analysis for ${filePath}:
- Lines: ${lines}
- Characters: ${characters}
- File size: ${Math.round(content.length / 1024 * 100) / 100} KB`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing file ${filePath}: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async createComponent(name, type) {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const componentDir = path.join(process.cwd(), 'src', 'components');
    
    try {
      // Ensure components directory exists
      await fs.mkdir(componentDir, { recursive: true });
      
      let componentCode;
      if (type === 'functional') {
        componentCode = `import React from 'react';
import './${name}.css';

const ${name} = () => {
  return (
    <div className="${name.toLowerCase()}">
      <h2>${name}</h2>
      {/* Add your component content here */}
    </div>
  );
};

export default ${name};`;
      } else {
        componentCode = `import React, { Component } from 'react';
import './${name}.css';

class ${name} extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="${name.toLowerCase()}">
        <h2>${name}</h2>
        {/* Add your component content here */}
      </div>
    );
  }
}

export default ${name};`;
      }
      
      const componentPath = path.join(componentDir, `${name}.js`);
      await fs.writeFile(componentPath, componentCode);
      
      // Create CSS file
      const cssCode = `.${name.toLowerCase()} {
  /* Add your styles here */
}`;
      await fs.writeFile(path.join(componentDir, `${name}.css`), cssCode);
      
      return {
        content: [
          {
            type: 'text',
            text: `Successfully created ${type} component "${name}" at ${componentPath}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating component ${name}: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Ask Peat MCP Server running on stdio');
  }
}

const server = new AskPeatMCPServer();
server.run().catch(console.error);

