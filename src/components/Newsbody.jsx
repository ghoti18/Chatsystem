import "./News.css";
import { API_URL } from "../apiConfig";

import Createnews from "./Createnews";
import { useEffect, useState } from "react";

function Newsbody() {
    const [posts, setPosts] = useState([]);
    const [role, setRole] = useState(null);
    const userId = localStorage.getItem("userId");;

    useEffect(() => {
        if (!userId) return;
        fetch(`${API_URL}/api/profile/${userId}`)
            .then((res) => res.json())
            .then((profile) => {
                const userRole = profile?.role || "Student";
                setRole(userRole);
            })
            .catch(() => setRole("Student"));
    }, [userId]);


    useEffect(() => {
        if (!role) return;
        fetch(`${API_URL}/api/news/${role}`)
            .then((res) => res.json())
            .then((data) => setPosts(Array.isArray(data) ? data : []))
            .catch((err) => console.error("Error fetching posts:", err));
    }, [role]);

    return (
        <>
            <Createnews />
            <section className="news-container">
                <div className="news-body">
                    {posts.length === 0 ? (
                        <p>No news available.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.news_id} className="news-item">
                                <div className="news-item-header">
                                    <div className="news-user-info">
                                        <h2 className="news-item-name">{post.name} &nbsp; &nbsp;</h2>
                                        <p className="news-date">
                                            {new Date(
                                                String(post.created_at).replace(" ", "T")
                                            ).toLocaleString(undefined, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    {/* Badge showing which audience the post targets */}
                                    <span className="news-audience-badge">{post.target_audience}</span>
                                </div>

                                <div className="news-item-body">
                                    <h2 className="news-title">{post.title}</h2>
                                    <p>{post.content}</p>
                                </div>

                                {post.image_url && (
                                    <div className="news-image-wrapper">
                                        <img
                                            src={`${API_URL}/uploads/${post.image_url}`}
                                            alt={post.title}
                                            className="news-image"
                                        />
                                    </div>
                                )}

                                {post.attachment_url && (
                                    <div className="attachment-container">
                                        <a
                                            href={`${API_URL}/uploads/${post.attachment_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="attachment-link"
                                        >
                                            View Attachment
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default Newsbody;