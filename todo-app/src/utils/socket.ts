import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from './socketEvents';

const socket = io('http://localhost:8000');

socket.on(SOCKET_EVENTS.CONNECT, () => {
  console.log('Socket connected');
});

socket.on(SOCKET_EVENTS.DISCONNECT, () => {
  console.log('Socket disconnected');
});

socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
  console.error('Socket connection error:', error);
});

export default socket;