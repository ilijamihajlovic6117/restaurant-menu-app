import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuList from "./pages/MenuList";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuList />} />
        <Route path="/dodaj" element={<AddItem />} />
        <Route path="/izmeni/:id" element={<EditItem />} />

      </Routes>
    </BrowserRouter>
  );
}
