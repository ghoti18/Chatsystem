import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./header.css";
import Menu from "./headercontent/Menu";
import Logins from "./headercontent/Logins";
function Header(){
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50 );
        };
        window.addEventListener("scroll", handleScroll);
        return() => window.removeEventListener("scroll", handleScroll);
        },[]);
    return(
            <>
         <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <h2>Sx</h2>
        <Menu/>
        <Logins/>
         </header>
        </>
    );
}
export default Header;
