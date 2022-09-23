import 'tailwindcss/tailwind.css';
import pencilImg from 'images/pencilImage.svg';
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

  // 비밀번호
  // const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  //   const passwordCurrent = e.target.value;
  //   setPassword(passwordCurrent);

  //   if (!passwordRegex.test(passwordCurrent)) {
  //     setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
  //     setIsPassword(false);
  //   } else {
  //     setPasswordMessage('안전한 비밀번호에요 : )');
  //     setIsPassword(true);
  //   }
  // }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userInfo: LoginInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    (async () => {
      await axios
        .post(`/users/sign-in/`, userInfo)
        .then((res) => {
          // console.log('로그인 성공');
          setToken(res.data.access, res.data.refresh); // 토큰 localstorage에 저장
          // console.log(getToken(), ' localstorage 들어갔는지 확인');
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

  // const tk: string | null = localStorage.getItem('access_token');
  // checkAccessToken(tk!);

  return (
    <div className="h-screen bg-[#0E1733] flex justify-center flex-col items-center">
      <div style={{ marginLeft: '60px' }} className="flex">
        <h4 className=" text-[#9CA6C5] text-5xl font-press-start text-center pt-20 pb-35">LOGIN</h4>
        <img style={{ position: 'relative', right: '20px', top: '45px' }} src={pencilImg} alt="pencil" />
      </div>

      <form
        className="w-2/4 h-2/4 m-50 items-center flex-col flex justify-center center p-20 bg-grey rounded-lg"
        onSubmit={handleLogin}
      >
        <div className=" justify-center flex flex-col w-80">
          <label className=" text-background flex flex-col" htmlFor="email">
            <p className="mb-2">이메일</p>
            <input
              className=" placeholder-[#9CA6C5]  border-4 border-[#677DC6] text-sm font-light drop-shadow-lg mb-3 px-3 py-2.5 rounded-2xl"
              name="email"
              placeholder="email address"
              onChange={onChangeEmail}
            />
            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
          </label>
          <label className="text-background flex flex-col mt-5 pb-1" htmlFor="password">
            <p className="mb-2">비밀번호</p>
            <input
              className="placeholder-[#9CA6C5] border-4 border-[#677DC6] text-sm font-light drop-shadow-lg mb-3 px-3 py-2.5 rounded-2xl"
              name="password"
              placeholder="password"
              type="password"
            />
          </label>
        </div>

        <div className="flex-row flex relative mt-8  content-center">
          <img style={{ position: 'absolute', top: '-2px', left: '14px', zIndex: '1' }} src={Enter} alt="pencil" />
          <button
            type="submit"
            className=" rounded-xl border-none bg-[#677DC6] w-36 mr-4 drop-shadow-lg px-14 pr-4 py-2.5  text-white font-semibold  bg-button-500"
          >
            Login
          </button>
          <img style={{ position: 'absolute', top: '-2px', right: '93px', zIndex: '1' }} src={Enter} alt="pencil" />
          <button
            type="button"
            className="rounded-xl border-none bg-[#677DC6]  w-36 ml-4 drop-shadow-lg px-14 pr-4 py-2.5 text-white font-semibold  bg-button-500"
            onClick={goToSign}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
