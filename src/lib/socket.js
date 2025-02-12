import { io } from "socket.io-client"

const API_URI = "https://eventr-b.onrender.com"
// update during deployment
const socket = io(API_URI);

export default socket;