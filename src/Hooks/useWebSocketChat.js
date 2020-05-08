import { useEffect, useReducer, useRef, useState, useCallback } from 'react';

const wsURL = process.env.REACT_APP_SOCKET_URL;

const initialHistory = [];
function historyReducer(state, action) {
  switch (action.type) {
    case 'history':
      return action.data
    case 'message':
      return [...state, action.data]
    case 'edit':
    case 'delete':
      const index = action.data.index;
      const newState = state.map(msg => msg.index === index
        ? {
          ...msg,
          deleted: action.data.deleted,
          edited: action.data.edited,
          message: action.data.message
        }
        : msg
      )
      return newState
    default:
      return state;
  }
}

export default function useWebSocketChat(userName) {
  const wsRef = useRef();
  const [history, dispatch] = useReducer(historyReducer, initialHistory);
  const [clients, setClients] = useState([]);

  const sendWSMessage = useCallback((messageText) => {
    if (wsRef.current) {
      const data = {
        time: Date.now(),
        type: 'message',
        message: messageText,
        userName
      }
      wsRef.current.send(JSON.stringify(data))
    }
  }, [userName]);

  const sendUpdatedWSMessage = useCallback((updateType, newMessage, index) => {
    if (wsRef.current) {
      const data = {
        time: Date.now(),
        type: updateType,
        message: newMessage,
        index,
        userName
      }
      wsRef.current.send(JSON.stringify(data))
    }
  }, [userName]);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(wsURL);
    }

    wsRef.current.onopen = function open(e) {
      // identify this client with the server
      wsRef.current.send(JSON.stringify({
        time: Date.now(),
        type: 'identification',
        userName
      }))
    }

    wsRef.current.onmessage = function incoming(e) {
      const event = JSON.parse(e.data);
      // intercept events regarding the chat room's
      // participation and update 'clients' data structure
      if (event.type === 'clients') {
        setClients(event.data)
      }
      // useReducer to synchronize message history for the session
      dispatch(event);
    }
  }, [userName])

  return {
    clients,
    history,
    sendUpdatedWSMessage,
    sendWSMessage
  }
}
