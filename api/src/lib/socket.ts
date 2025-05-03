import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

export function getReceiverSocketId(userId: any) {
  return userSocketMap[userId];
}

const userSocketMap: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;

  if (typeof userId === 'string') {
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    if (typeof userId === 'string') {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }
  });
});
