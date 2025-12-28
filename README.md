Project Name : Real-Time Code Editor

Features :

Real-time collaborative code editing
Room-based collaboration using unique room IDs
Instant code synchronization using Socket.IO
WebSocket-based communication
Full-stack setup with React and Node.js
Online deployment for easy access

Live Demo:
https://real-time-code-editor-qy0g.onrender.com

Tech used :

Frontend: React ,CodeMirror (code editor) , Toast notifications
Backend: Node.js, Express
Real-time: Socket.IO
Deployment: Render (free tier)

How to run locally :

1. Clone the repository
git clone https://github.com/Aksh015/real-time-code-editor.git
cd real-time-code-editor

2. Install dependencies
frontend side :
npm install react-router-dom
npm install uuid
npm install react-hot-toast
npm install react-avatar
npm install codemirror

backend side :
npm install express
npm install socket.io socket.io-client
npm install dotenv

development side used :
npm install -g nodemon

{suggestion :u can use proxy server if any cors issue is arrives,add proxy url in package.json}

3. Run in development
npm run server:dev

Open in browser :

http://localhost:5000

Build & run for production
npm run build
npm run server:prod

What I learned from this project :

Real-time communication using Socket.IO
Managing rooms and connected users
serving frontend and backend both by 1 single server by using react build and serving it statically using express

Reference & learning source :

I built this project while learning from a YouTube tutorial by Rakesh K (Coders Gyan).

Tutorial link: https://youtu.be/jOv8jb6rCU0

I used this tutorial as a reference to understand the core concepts, and then implemented and deployed the project on my own.
Full credit for the teaching content goes to Rakesh K.
