import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader'; 
import RollingPaperDetail from './pages/RollingPaperDetail';

function App() {
  return (
    <Router>
      <MainHeader /> 
      
      <Routes>
        <Route path="/" element={<div>메인 페이지 내용</div>} />

        <Route path="/post" element={<div>만들기 페이지</div>} />
        <Route path="/post/:id" element={<RollingPaperDetail />} />

        <Route path="/list" element={<div>목록 페이지</div>} />        
      </Routes>
    </Router>
  );
}


export default App;