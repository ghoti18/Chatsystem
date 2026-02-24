import { useState } from "react";
import { API_URL } from "../apiConfig";

import "./News.css";
function CreateNewsForm({ onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [targetRole, setTargetRole] = useState("student");
    const [isPinned, setIsPinned] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", description);
        formData.append("target_audience", targetRole);
        formData.append("is_pinned", isPinned);
        formData.append("image", imageFile);
        formData.append("attachment", attachmentFile);

        try {
            const response = await fetch(`${API_URL}/api/news`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data);

            alert("News created successfully!");

            setTitle("");
            setDescription("");
            setFile(null);

            if (onSuccess) onSuccess(); // close popup after success

        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="News Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="News Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <label>Image</label>
            <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
            />
            <label>Attachment</label>
            <input
                type="file"
                onChange={(e) => setAttachmentFile(e.target.files[0])}
            />
            <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
            >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit">Create News</button>
        </form>
    );
}

export default CreateNewsForm;
