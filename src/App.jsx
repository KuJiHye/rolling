import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import MessagePage from "./pages/MessagePage";
import BackButton from "./components/BackButton";
import GlobalStyle from "./styles/GlobalStyle";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <MainHeader />
        <BackButton />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<DetailPage />} />
          <Route path="/post/:id/edit" element={<DetailPage />} />
          <Route path="/post/:id/message" element={<MessagePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
