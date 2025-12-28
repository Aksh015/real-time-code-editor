Real-Time Code Editor

Features :

    Real-time collaborative code editing

    Room-based collaboration using unique room IDs

    Instant code synchronization using Socket.IO

    WebSocket-based communication

    Full-stack setup with React and Node.js

    Online deployment for easy access

Live Demo :

    https://real-time-code-editor-qy0g.onrender.com

Tech Used :

  Frontend:

    React

    CodeMirror (code editor)

    Toast notifications

  Backend :

    Node.js

    Express

    Real-time Socket.IO

  Deployment :

    Render (free tier)

How to Run Locally :

1. Clone the repository :

        https://github.com/Aksh015/real-time-code-editor.git

2.go to that directory/folder :

    cd real-time-code-editor

3. Install dependencies :

Frontend side :

    npm install react-router-dom

    npm install uuid

    npm install react-hot-toast

    npm install react-avatar

    npm install codemirror

Backend side :

    npm install express

    npm install socket.io socket.io-client

    npm install dotenv

Development tools :

    npm install -g nodemon


Suggestion:
    
  If you face any CORS issues during development, you can use a proxy server by adding the backend URL in package.json.

3. Run in development :

       npm run server:dev


Open in browser:

    http://localhost:5000

Build & Run for Production :

    npm run build
    
    npm run server:prod

What I Learned from This Project :

    Use of socket.io along with express server

    On particular Event , how frontend server and backend server talks with each other

    Serving both frontend and backend from a single server  ,using React build and serving it statically with Express

    concept of cors and how to deal with it

Reference & Learning Source :

  I built this project while learning from a YouTube tutorial by Rakesh K (Coders Gyan).

Tutorial link: 

    https://youtu.be/jOv8jb6rCU0

  I used this tutorial as a reference to understand the core concepts, and then implemented and deployed the project on my own.
