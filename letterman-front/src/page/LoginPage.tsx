import 'tailwindcss/tailwind.css';
import pencilImg from 'images/pencilImage.svg';
import star from 'images/star.svg';
import Enter from 'images/Enter.png';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, decodeAccessToken } from 'utils/tokenManager';
import { useSelector, useDispatch } from 'react-redux';
import { setUUID } from 'redux/userID';

interface LoginInfo {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  // 이메일
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 아닙니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userInfo: LoginInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    (async () => {
      await axios
        .post(`api/v1/users/sign-in`, userInfo)
        .then((res) => {
          setToken(res.data.access, res.data.refresh); // 토큰 localstorage에 저장
          const uuid = decodeAccessToken(getToken().access || ''); // 🤚 이거 다음에 확인
          dispatch(setUUID(uuid));
          navigate('/mainpage');
        })
        .catch((error) => {
          alert('정보가 잘못되었습니다.');
        });
    })();
  };

  const goToSign = () => {
    navigate('/signup');
  };

  return (
    <div className=" font-press-start text-2xl absolute overflow-hidden w-screen h-full bg-[#0E1733] flex justify-center flex-col items-center">
      <img src={star} alt="star" className="absolute bg-repeat" />
      <div style={{ marginLeft: '60px' }} className="flex">
        <h4 className=" text-[#9CA6C5] text-5xl  text-center ">LOGIN</h4>
        <img style={{ position: 'relative', right: '20px', bottom: '10px' }} src={pencilImg} alt="pencil" />
      </div>

      <form
        className="md:w-2/4 md:h-2/4 w-80 h-96 items-center flex-col flex justify-center center bg-grey rounded-lg"
        onSubmit={handleLogin}
      >
        <div className=" justify-center flex flex-col md:w-96 w-44">
          <label className=" text-background text-2xl  flex flex-col" htmlFor="email">
            <p className="mb-2">이메일</p>
            <input
              className=" placeholder-[#9CA6C5] text-xl  border-4 border-[#677DC6]  font-light drop-shadow-lg mb-3 px-3 py-2.5 rounded-2xl"
              name="email"
              placeholder="email address"
              onChange={onChangeEmail}
            />
            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
          </label>
          <label className="text-background flex flex-col mt-5 pb-1" htmlFor="password">
            <p className="mb-2">비밀번호</p>
            <input
              className="placeholder-[#9CA6C5] border-4 border-[#677DC6] text-xl font-light drop-shadow-lg mb-3 px-3 py-2.5 rounded-2xl"
              name="password"
              placeholder="password"
              type="password"
            />
          </label>
        </div>

        <div className="sm:flex-row flex-col flex relative mt-8  content-center ">
          <button
            type="submit"
            className="flex-row flex justify-center items-center mb-4 rounded-xl border-none bg-[#677DC6] h-fit  drop-shadow-lg px-4  text-white font-semibold  bg-button-500"
          >
            <img className="w-7" src={Enter} alt="pencil" />
            Login
          </button>

          <button
            type="button"
            className="flex-row flex justify-center items-center md:ml-4 rounded-xl border-none bg-[#677DC6] h-fit  drop-shadow-lg px-4  text-white font-semibold  bg-button-500"
            onClick={goToSign}
          >
            <img className="w-7" src={Enter} alt="pencil" /> Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
