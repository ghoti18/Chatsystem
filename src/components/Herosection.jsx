import GoogleLoginButton from "./Googlebutton";

function Herosection() {
  return (
    <section style={styles.hero}>
      <div style={styles.content}>
        <h1 style={styles.title}>Simple Messaging for School</h1>

        <p style={styles.subtitle}>
          Connect students, teachers, and staff in one reliable platform.
          Share announcements, updates, and alerts without the noise.
        </p>

        <GoogleLoginButton />
      </div>
    </section>
  );
}

const styles = {
  hero: {
    minHeight: "92vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6e6e6e, #000000)",
    color: "#fff",
    padding: "0 1.5rem",
    textAlign: "center",
    width:"100%",
  },
  content: {
    maxWidth: "500px",
    position: "absolute",
    top: "30%",
    left: "1%",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    opacity: 0.9,
  },
};

export default Herosection;
