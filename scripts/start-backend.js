const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

console.log('📊 Starting MongoDB and Backend Server...');

// Global flag to prevent starting backend twice
let backendStarted = false;

// Function to kill existing MongoDB process (Windows specific)
function killMongoDB() {
  return new Promise((resolve) => {
    console.log('🛑 Attempting to kill any existing MongoDB processes...');
    exec('taskkill /F /IM mongod.exe', (error) => {
      if (error) {
        console.log('   No running MongoDB process found or could not be killed');
      } else {
        console.log('✅ Killed existing MongoDB process');
      }
      // Always resolve, even if there was an error
      resolve();
    });
  });
}

// Check if data directory exists, if not create it
const dataDir = path.join('C:', 'data', 'db');
if (!fs.existsSync(dataDir)) {
  console.log(`📂 Creating MongoDB data directory at ${dataDir}`);
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    console.error(`❌ Failed to create data directory: ${err.message}`);
    console.log('   You may need to run this script as administrator');
  }
}

// Remove lock file if it exists
const lockFile = path.join(dataDir, 'mongod.lock');
try {
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
    console.log('🔓 Removed MongoDB lock file');
  }
} catch (err) {
  console.error(`❌ Could not remove lock file: ${err.message}`);
}

// Start MongoDB with better error handling
async function startMongoDB() {
  await killMongoDB();
  
  console.log('🔄 Starting MongoDB...');
  const mongodProcess = spawn('mongod', ['--dbpath=C:/data/db']);

  mongodProcess.stdout.on('data', (data) => {
    const dataStr = data.toString();
    console.log(`MongoDB: ${dataStr}`);
    
    // Look for successful connection message
    if (dataStr.includes('Waiting for connections')) {
      console.log('✅ MongoDB started successfully');
      startBackend();
    }
  });

  mongodProcess.stderr.on('data', (data) => {
    console.error(`MongoDB Error: ${data.toString()}`);
  });

  mongodProcess.on('error', (error) => {
    console.error(`❌ Failed to start MongoDB: ${error.message}`);
    console.log('⚠️ Starting backend anyway...');
    startBackend();
  });

  // Set a timeout to start backend even if we don't catch the MongoDB success message
  setTimeout(() => {
    if (!backendStarted) {
      console.log('⏱️ Timeout reached, starting backend anyway...');
      startBackend();
    }
  }, 5000);
}

// Function to start the backend server
function startBackend() {
  if (backendStarted) return; // Prevent starting twice
  backendStarted = true;

  console.log('🔄 Starting Backend Server...');
  const backendProcess = spawn('node', ['server.js'], { cwd: path.resolve('../flutter-backend') });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data.toString()}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data.toString()}`);
  });

  backendProcess.on('error', (error) => {
    console.error(`❌ Failed to start backend: ${error.message}`);
  });

  console.log('✅ Startup script completed');
  console.log('ℹ️ Keep this window open to keep both services running');
}

// Start the process
startMongoDB();

// Handle script termination
process.on('SIGINT', () => {
  console.log('🛑 Shutting down MongoDB and Backend...');
  exec('taskkill /F /IM mongod.exe');
  process.exit(0);
});

// Log instructions
console.log('\n📋 INSTRUCTIONS:');
console.log('1. Wait for both MongoDB and Backend to start');
console.log('2. When you see "MongoDB Connected Successfully", services are ready');
console.log('3. Run your Flutter app with: flutter run');
console.log('4. For physical devices, edit api_service.dart to use your computer\'s IP address');