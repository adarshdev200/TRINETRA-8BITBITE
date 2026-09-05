// src/context/SocketContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(undefined);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    let newSocket = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;
    
    const connectSocket = () => {
      try {
        newSocket = io(SOCKET_URL, {
          transports: ['websocket'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 5000,
          forceNew: true
        });

        newSocket.on('connect', () => {
          console.log('Socket connected');
          setIsConnected(true);
          setConnectionError(null);
          reconnectAttempts = 0;
        });

        newSocket.on('disconnect', () => {
          console.log('Socket disconnected');
          setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
          console.log('Socket connection error:', error.message);
          setIsConnected(false);
          setConnectionError(error.message);
          reconnectAttempts++;
          
          if (reconnectAttempts >= maxReconnectAttempts) {
            console.log('Max reconnect attempts reached, giving up');
            newSocket.disconnect();
          }
        });

        newSocket.on('data-update', (data) => {
          setLastMessage(data);
        });

        newSocket.on('initial-data', (data) => {
          setLastMessage(data);
        });

        setSocket(newSocket);
      } catch (error) {
        console.log('Socket initialization failed:', error.message);
        setConnectionError(error.message);
        setIsConnected(false);
      }
    };

    connectSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        newSocket.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, lastMessage, connectionError }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};