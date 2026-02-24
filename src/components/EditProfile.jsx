import { useState, useEffect } from "react";
import { API_URL } from "../apiConfig";

import "./Profile.css";

function EditProfile({ userId, onCancel, onSave }) {
    const [formData, setFormData] = useState({
        role: "",
        course: "",
        yearandsection: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/api/profile/${userId}`);
                const data = await res.json();
                if (data) {
                    setFormData({
                        role: data.role || "",
                        course: data.course || "",
                        yearandsection: data.yearandsection || "",
                    });
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        if (userId) fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`${API_URL}/api/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, users_id: userId }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Profile updated successfully!");
                if (onSave) onSave();
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error("Error saving profile:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-profile-container">
            <h3>Edit Profile</h3>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {formData.role === "Student" && (
                    <>
                        <div className="form-group">
                            <label>Course</label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required={formData.role === "Student"}
                            >
                                <option value="">Select Course</option>
                                <option value="IT Department">IT Department</option>
                                <option value="Math Department">Math Department</option>
                                <option value="English Department">English Department</option>
                                <option value="Filipino Department">Filipino Department</option>
                                <option value="Social Studies Department">Social Studies Department</option>
                                <option value="Hospitality Management Department">Hospitality Management Department</option>
                                <option value="Physical Education Department">Physical Education Department</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Year & Section</label>
                            <select
                                name="yearandsection"
                                value={formData.yearandsection}
                                onChange={handleChange}
                                required={formData.role === "Student"}
                            >
                                <option value="">Select Year & Section</option>
                                <option value="1-A">1-A</option>
                                <option value="1-B">1-B</option>
                                <option value="2-A">2-A</option>
                                <option value="2-B">2-B</option>
                                <option value="3-A">3-A</option>
                                <option value="3-B">3-B</option>
                                <option value="4-A">4-A</option>
                                <option value="4-B">4-B</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="save-btn">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="cancel-btn">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
