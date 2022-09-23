import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthRouter } from 'components/App/AuthRouter';
import LoginPage from 'page/LoginPage';
import MailListPage from 'page/MailListPage';
import MailWritePage from 'page/MailWritePage';
import SignupPage from 'page/SignupPage';
import MyPage from 'page/Mypage';
import BirthMailListPage from 'page/BirthMailListPage';
import BirthRemainingDaysPage from 'page/BirthRemainingDaysPage';
import BirthMailWritePage from 'page/BirthMailWritePage';
import MainPage from './page/MainPage';
import RemainingDaysPage from './page/RemainingDaysPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<AuthRouter />}>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/remainingdayspage" element={<RemainingDaysPage />} />
          <Route path="/maillistpage" element={<MailListPage />} />
          <Route path="/mailwritepage" element={<MailWritePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/birthremainingdayspage" element={<BirthRemainingDaysPage />} />
          <Route path="/birthmaillistpage" element={<BirthMailListPage />} />
          <Route path="/birthmailwritepage" element={<BirthMailWritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
