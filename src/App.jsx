import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/main/MainPage";
import ListPage from "./pages/list/ListPage";
import MessagePage from "./pages/message/MessagePage";
import DetailPage from "./pages/detail/DetailPage";
import BackButton from "./components/BackButton";
import GlobalStyle from "./styles/GlobalStyle";
import SearchPage from "./pages/search/SearchPage";
import { device } from "./styles/media";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from "./pages/post/PostPage";

function App() {
  return (
    <>
      <ThemeProvider theme={device}>
        <GlobalStyle />
        <Router>
          <MainHeader />
          <BackButton />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/post/:id/edit" element={<DetailPage />} />
            <Route path="/post/:id/message" element={<MessagePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
