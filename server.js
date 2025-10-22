// Root-level server.js for Render deployment
const path = require('path');
const { spawn } = require('child_process');

console.log('Starting Ask Dr. Peat Backend...');

// Change to backend directory and start the server
const backendPath = path.join(__dirname, 'backend');
const serverProcess = spawn('node', ['server.js'], {
  cwd: backendPath,
  stdio: 'inherit',
  env: { ...process.env }
});

serverProcess.on('error', (error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  console.log(`Backend server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  serverProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  serverProcess.kill('SIGINT');
});
