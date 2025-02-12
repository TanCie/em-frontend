import { io } from "socket.io-client"

const API_URI = import.meta.env.VITE_PUBLIC_LOCAL_URL;
// update during deployment
const socket = io(API_URI);

export default socket;