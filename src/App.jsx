import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import GuideProfile from "./pages/GuideProfile";
import Destinations from "./pages/Destinations";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/guides/:id" element={<GuideProfile />} />
      <Route path="/destinations" element={<Destinations />} />
    </Routes>
  );
};

export default App;
