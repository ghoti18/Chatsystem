import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../header.css";
function Menu(){
    return(
        <>
        <ul className="nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#explore">Explore</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
        </>
    );
}
export default Menu;