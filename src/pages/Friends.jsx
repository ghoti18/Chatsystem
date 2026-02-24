import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../apiConfig";

function Friends({ onSelectFriend }) {
  const [categorized, setCategorized] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profiles`)
      .then((res) => {
        const data = res.data;
        setCategorized(typeof data === "object" && !Array.isArray(data) ? data : {});
      })
      .catch(() => setCategorized({}));
  }, []);

  const hasAny = Object.keys(categorized).length > 0;

  return (
    <aside className="friends-list">
      <h2>People</h2>

      {!hasAny ? (
        <p style={{ padding: "8px 12px", color: "#888" }}>No profiles found</p>
      ) : (
        Object.entries(categorized).map(([role, courses]) => (
          <div key={role} className="friends-role-group">
            {/* ── Role header ── */}
            <h3 className="friends-role-label">{role}</h3>

            {Object.entries(courses).map(([course, sections]) => (
              <div key={course} className="friends-course-group">
                {/* Only show course for students */}
                {course !== "N/A" && (
                  <h4 className="friends-course-label">{course}</h4>
                )}

                {Object.entries(sections).map(([section, users]) => (
                  <div key={section} className="friends-section-group">
                    {/* Only show section for students */}
                    {section !== "N/A" && (
                      <span className="friends-section-label">{section}</span>
                    )}

                    <ul>
                      {users.map((person) => (
                        <li
                          key={person.id}
                          onClick={() => onSelectFriend(person)}
                          className="friends-item"
                          style={{ cursor: "pointer" }}
                        >
                          {person.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </aside>
  );
}

export default Friends;
