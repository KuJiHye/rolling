import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import MainPage from './pages/MainPage';
import Post from './pages/Post';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
    <>
      <MainHeader /> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="/post/:id/edit" element={<DetailPage />} />
        <Route path="/list" element={<ListPage />} />        
      </Routes>
    </>
  );
};

export default App;
