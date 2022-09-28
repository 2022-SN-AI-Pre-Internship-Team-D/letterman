import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthRouter } from 'components/App/AuthRouter';
import LoginPage from 'page/LoginPage';
import MailListPage from 'page/MailListPage';
import MailWritePage from 'page/MailWritePage';
import SignupPage from 'page/SignupPage';
import MyPage from 'page/Mypage';
import BirthMailListPage from 'page/BirthMailListPage';

import MainPage from './page/MainPage';
import MainPage2 from './page/MainPage2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mainpage2:uuid" element={<MainPage2 />} />
        <Route path="/mailwritepage" element={<MailWritePage />} />

        <Route element={<AuthRouter />}>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/maillistpage" element={<MailListPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/birthmaillistpage" element={<BirthMailListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
