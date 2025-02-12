import { io } from "socket.io-client"

// update during deployment
const socket = io("http://localhost:5000");

export default socket;