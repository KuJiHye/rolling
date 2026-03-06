import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import RollingPaperDetail from './pages/RollingPaperDetail';
import MainPage from './pages/MainPage';
import Post from './pages/Post';
import ListPage from './pages/ListPage';

const App = () => {
  return (
    <Router>
      <MainHeader /> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<RollingPaperDetail />} />
        <Route path="/list" element={<ListPage />} />        
      </Routes>
    </Router>
  );
};

export default App;
