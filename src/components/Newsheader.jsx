import { Link, useNavigate } from "react-router-dom";
import "./News.css";
import { useEffect, useState } from "react";

function Newsheader() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Active section tracking
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        const sections = document.querySelectorAll("section, #home");
        sections.forEach(section => observer.observe(section));

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            <header className={`header ${isScrolled ? "scrolled" : ""}`}>
                <div className="news-logo">
                    <h1>Sx</h1>
                </div>
                <nav>
                    <ul className="nav">
                        <li><Link to="/Chats">Chats</Link></li>
                        <li><Link to="/News">News</Link></li>
                        <li><Link to="/Profile">Profile</Link></li>
                        <li onClick={handleLogout} style={{ cursor: "pointer", fontWeight: "500" }}>Logout</li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Newsheader;