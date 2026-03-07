import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import MessagePage from "./pages/MessagePage";

const App = () => {
  return (
    <>
      <Router>
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/post/:id/message" element={<MessagePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
