const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {//global middleware(always use index.html)
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const userSocketMap ={}
function getAllConnectedClients(roomId){
    // returns array of objects
    return Array.from(io.sockets.adapter.rooms.get(roomId) // this is map
                || [])//this is array
                    .map((socketId)=>{//this map is function of array
                        return{
                            socketId,
                            username:userSocketMap[socketId]}
                    })
}
io.on("connection",(socket)=>{
    console.log("socket connected",socket.id)
    
    // listening for join event-->frontend will emit this event to backend
    socket.on(ACTIONS.JOIN,({roomId,username})=>{
        userSocketMap[socket.id] = username
        
        socket.join(roomId)// add this socket in room with id=roomId

        // on new join-->send notification to all joined
        const clients = getAllConnectedClients(roomId)
        // console.log(clients)
        clients.forEach(({socketId})=>{
            // telling frontend that username joined
            io.to(socketId).emit(ACTIONS.JOINED,{clients,username,socketId:socket.id})//clients--a-->all clients, username-->new user
        })
    })
    // listening for code change -->frontend will emit this event to backend
    socket.on(ACTIONS.CODE_CHANGE,({roomId,code})=>{
        // send to frontend 
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code})
    })
    // this to sync code for newly joined member in room 
    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });
    
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
             if (roomId === socket.id) return;
            // telling front end that username left the room
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        // socket.leave();
    });
    
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
