import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import Google from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiConfig";


const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(`${API_URL}/auth/google`, {
        email: user.email,
        name: user.displayName,
      });

      console.log(res.data);
      localStorage.setItem("userId", res.data.user.users_id);
      navigate("/News");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.buttons}>
      <button
        style={styles.primaryBtn}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <img style={styles.logo} src={Google} alt="Google Logo" />
        {loading ? "Signing in..." : "Continue with Google"}
      </button>
    </div>
  );
};

export default GoogleLoginButton;

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  primaryBtn: {
    padding: "0.8rem 1.4rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    background: "#fff",
    color: "#000",
  },
  logo: {
    width: "20px",
    height: "20px",
  },
};
