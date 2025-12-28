import { io } from 'socket.io-client';
// console.log( "123 debugging ... ", process.env.REACT_APP_BACKEND_URL); 
export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    // // Calling io() creates and returns a socket instance
    return io(process.env.REACT_APP_BACKEND_URL, options);
    // return io("http://localhost:5000",options);
};

