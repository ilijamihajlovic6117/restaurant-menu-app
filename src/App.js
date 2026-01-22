import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuList from "./pages/MenuList";
import AddItem from "./pages/AddItem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuList />} />
        <Route path="/dodaj" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}
