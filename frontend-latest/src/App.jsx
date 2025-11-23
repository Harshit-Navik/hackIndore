import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
