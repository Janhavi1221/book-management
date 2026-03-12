import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import ViewBooks from "./pages/ViewBooks";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/view-books" element={<ViewBooks />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;