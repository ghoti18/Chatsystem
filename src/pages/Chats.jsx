import { useState } from "react";
import Friends from "./Friends";
import ChatBody from "../components/Chatbody";
import NewsHeader from "../components/Newsheader";
function Chats() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const userId = localStorage.getItem("userId");

    return (
        <>
            <NewsHeader />

            <div className="chat-page">
                <Friends onSelectFriend={setSelectedFriend} />

                {selectedFriend ? (
                    <ChatBody friend={selectedFriend} userId={userId} />
                ) : (
                    <div className="chat-placeholder" style={{ display: "none" }}>
                        Select a friend to start chat
                    </div>
                )}
            </div>
        </>
    );
}

export default Chats;
