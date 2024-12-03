import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/api';
import './Chat.css'

const Chat = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const senderId = localStorage.getItem('userId');
    const loginToken = localStorage.getItem('loginToken')
    const [message, setMessage]= useState('');

    useEffect(() => {
        fetch(`${API_URL}/chat/history/${senderId}/${receiverId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.log(error));
    }, [senderId, receiverId]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const messageData = {
                sender: senderId,
                receiver: receiverId,
                message: newMessage,
            };
            const formData = new FormData();
            formData.append('message', message)
            formData.append('senderId', senderId)
            formData.append('receiverId', receiverId)

            try {
                const response = await fetch(`${API_URL}/chat/sentMessage`, {
                    method: 'POST',
                    headers:{
                        'token': `${loginToken}`,
                        'Content-Type':'application/json'
                    },
                    body: formData
                });

                if (response.ok) {
                    const savedMessage = await response.json();
                    setMessages([...messages, savedMessage]);
                    setNewMessage('');
                } else {
                    console.error('Failed to send message');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="chat-component">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === senderId ? 'sent' : 'received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={()=>sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
