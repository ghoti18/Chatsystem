import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Chats from "./pages/Chats";
import News from "./pages/News";
import Profile from "./pages/Profile";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Chats" element={<Chats />} />
        <Route path="/News" element={<News />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
