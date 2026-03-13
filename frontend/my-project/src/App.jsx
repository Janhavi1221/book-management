import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import ViewBooks from "./pages/ViewBooks";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import SearchPage from "./pages/SearchPage";
import CategoryManagement from "./pages/CategoryManagement";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/view-books" element={<ViewBooks />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;