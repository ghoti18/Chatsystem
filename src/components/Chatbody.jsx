import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../apiConfig";
import "./Chats.css";
import cameraIcon from "../assets/camera-icon.png";
import sendIcon from "../assets/send.png";
import uploadIcon from "../assets/upload.png";

function Chatbody({ friend, userId }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!friend || !userId) return;

    const fetchMessages = () => {
      axios
        .get(`${API_URL}/messages`, {
          params: {
            user_id: userId,
            friend_id: friend.id,
          },
        })
        .then((res) => {
          setMessages(res.data);
        })
        .catch(console.error);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [friend, userId]);

  const sendTextMessage = () => {
    if (!text.trim()) return;

    axios
      .post(`${API_URL}/messages`, {
        sender_id: userId,
        receiver_id: friend.id,
        message: text,
      })
      .then((res) => {
        setMessages((prev) => [...prev, res.data]);
        setText("");
      })
      .catch(console.error);
  };


  return (
    <div className="chat-container">
      <h2>Chat with {friend ? friend.name : "Select a friend"}</h2>

      <div className="chat-window">
        {messages.length === 0 && (
          <div className="welcome-screen">
            <h2>Sender Flix</h2>
            <p>No Conversation made yet.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${String(msg.sender_id) === String(userId) ? "user" : "friend"}`}
          >
            <div className="message-bubble">
              {msg.message.startsWith("[IMAGE]") ? (
                <img
                  src={msg.message.replace("[IMAGE] ", "")}
                  alt="chat-image"
                  className="chat-img"
                />
              ) : (
                <p className="message">{msg.message}</p>
              )}
            </div>
          </div>
        ))
        }
      </div >

      <div className="input-area">
        <div className="input-bar">
          <div
            className="icon-group"
            onClick={() => fileInputRef.current.click()}
          >
            <button className="icon-btn">
              <img src={uploadIcon} alt="Upload" />
            </button>
          </div>

          <div
            className="icon-group"
            onClick={() => cameraInputRef.current.click()}
          >
            <button className="icon-btn">
              <img src={cameraIcon} alt="Camera" />
            </button>
          </div>

          <div className="vertical-divider"></div>

          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendTextMessage()}
          />
          <button className="send-btn" onClick={sendTextMessage}>
            <img src={sendIcon} alt="send" />
          </button>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        style={{ display: "none" }}
      />
    </div >
  );
}

export default Chatbody;
