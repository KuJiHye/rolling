import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import ListPage from "./pages/ListPage";
import MessagePage from "./pages/message/MessagePage";
import DetailPage from "./pages/detail/DetailPage";
import BackButton from "./components/BackButton";
import GlobalStyle from "./styles/GlobalStyle";
import SearchPage from "./pages/Search/SearchPage";
import { device } from "./styles/media";

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
            <Route path="/post" element={<Post />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/post/:id/edit" element={<DetailPage />} />
            <Route path="/post/:id/message" element={<MessagePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
