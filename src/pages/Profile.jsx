import { useState, useEffect } from "react";
import { API_URL } from "../apiConfig";

import "../components/Profile.css";
import NewsHeader from "../components/Newsheader";
import EditProfile from "../components/EditProfile";
import unknown_profile from "../assets/unknown_profile.jpg";
function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const userId = localStorage.getItem("userId") || 1;

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${API_URL}/api/profile/${userId}`);
            const data = await res.json();
            if (data) setProfile(data);
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    return (
        <>
            <NewsHeader />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img src={unknown_profile} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <h2>{profile?.name || "User"}</h2>
                        <p>{profile?.role || "No Role Set"}</p>
                    </div>
                </div>

                {!isEditing ? (
                    <div className="view-profile">
                        <div className="profile-details">
                            <div className="detail-item">
                                <label>Course</label>
                                <span>{profile?.course || "Not Set"}</span>
                            </div>
                            <div className="detail-item">
                                <label>Year & Section</label>
                                <span>{profile?.yearandsection || "Not Set"}</span>
                            </div>
                        </div>
                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <EditProfile
                        userId={userId}
                        onCancel={() => setIsEditing(false)}
                        onSave={() => {
                            setIsEditing(false);
                            fetchProfile();
                        }}
                    />
                )}
            </div>
        </>
    );
}
export default Profile;