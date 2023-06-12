import { useState } from "react";
import { auth, db } from '../firebase-config';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import '../styles/Chat.css';
import { useEffect } from "react";
const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room), orderBy("createAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
            messages.push({...doc.data(), id: doc.id});
        })
        setMessages(messages);
    })
    return () => unsuscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage === "") return;

    await addDoc(messageRef, {
        text: newMessage,
        createAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
    })

    setNewMessage("");
  }
  return (
    <div className="chat-app">
        <div className="header">
            <h1>Welcome To Room : {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
            { messages.map((message) => (
                <div className="message" key={message.id}>
                    <span className="user">{message.user}:</span> {message.text}
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input
                className="new-message-input"
                placeholder="Type your message here..." 
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button 
                type="submit"
                className="send-button"
            >
                Send
            </button>
        </form>
    </div>
  )
}

export default Chat;