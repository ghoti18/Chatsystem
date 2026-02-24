import { useEffect, useState } from "react";
import { API_URL } from "../apiConfig";

import "./News.css";
import CreateNewsForm from "./CreateNewsForm";
import Newsbody from "./Newsbody";

const messages = [
    "What's happening?",
    "Announce something?",
    "Share your thoughts?",
    "Post a news?"
];

function Createnews() {
    const [index, setIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [targetRole, setTargetRole] = useState("student");
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const fetchPosts = async (role = "student") => {
        try {
            const res = await fetch(`${API_URL}/api/news/${role}`);
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };
    useEffect(() => {
        fetchPosts(targetRole);
    }, [targetRole]);
    return (
        <>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h2>Create News</h2>
                            <button onClick={() => setShowPopup(false)}>X</button>
                        </div>
                        <div className="popup-body">
                            <CreateNewsForm
                                onSuccess={() => {
                                    setShowPopup(false);
                                    fetchPosts(targetRole);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            <section className="create-news">
                <div className="create-news-header-ul" onClick={() => setShowPopup(true)}>
                    <h2 className="changing-text">
                        {messages[index]}
                    </h2>
                </div>

            </section>
        </>
    );

}
export default Createnews;