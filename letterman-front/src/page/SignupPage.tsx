import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState, useCallback } from 'react';
import profile from 'images/profile.png';

interface SignUpInfo {
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  password2: FormDataEntryValue | null;
  birth: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
}

function SignupPage() {
  // 이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  // 오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');

  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // 이름
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('🔴');
      setIsName(false);
    } else {
      setNameMessage('🟢');
      setIsName(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('🔴');
      setIsEmail(false);
    } else {
      setEmailMessage('🟢');
      setIsEmail(true);
    }
  }, []);
  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('🟢');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('🔴');
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const signUpUserInfo: SignUpInfo = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      birth: data.get('birth'),
      image: data.get('image'),
    };
    (async () => {
      await axios
        .post(`/users/sign-up/`, signUpUserInfo, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          console.log('회원가입 성공');
          console.log(res.data);
          // {username: 'test213', email: 'test12@naver.com', birth: '2022-08-30'}
          navigate('/');
        })
        .catch((error) => {
          console.log(signUpUserInfo);
          if (error.response.data.username !== undefined) {
            if (error.response.data.email !== undefined) {
              alert('닉네임, 이메일이 중복되었습니다.');
            } else {
              alert('닉네임이 중복되었습니다.');
            }
          }
          if (error.response.data.password !== undefined) {
            alert('비밀번호가 다릅니다.');
          }
          if (error.response.data.username === undefined) {
            if (error.response.data.email !== undefined) {
              alert('아이디가 중복되었습니다.');
            }
          }
        });
    })();
  };

  const [imageUrl, setImageUrl] = useState(profile);
  const imgRef: any = useRef();

  const handleChangeFile = (e: any) => {
    const reader: any = new FileReader();
    const file = imgRef.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      console.log('이미지주소', reader.result);
    };
  };

  return (
    <div className="h-screen" style={{ backgroundColor: ColorSystem.MainColor.Primary }}>
      <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center mt-3 mb-14 text-white text-4xl">
          <span>회원가입</span>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mt-2">
            <div className="flex flex-row justify-center">
              <div className="flex justify-center items-center mr-10 ml-10 pb-28">
                <div className="preview">
                  <label htmlFor="profile">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="profile"
                        className="cursor-pointer flex flex-col justify-center items-center w-80 h-80 
                    rounded-full border-4 border-[#677DC6] bg-white"
                      />
                    )}
                    <input
                      onChange={handleChangeFile}
                      id="profile"
                      className="hidden"
                      ref={imgRef}
                      type="file"
                      name="image"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="ml-10 flex flex-col justify-end">
                <div>
                  <label className="m-1.5 text-white" htmlFor="nickname">
                    <span className="ml-12 my-4 text-lg">닉네임</span>
                    <input
                      className="border-4 border-[#677DC6] w-96 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                      name="username"
                      onChange={onChangeName}
                    />
                    {name.length > 0 && (
                      <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>
                    )}
                  </label>
                </div>
                <div>
                  <label className="m-1.5 text-white" htmlFor="email">
                    <span className="ml-12 my-4 text-lg">이메일</span>
                    <input
                      className="border-4 border-[#677DC6] w-96 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                      name="email"
                      onChange={onChangeEmail}
                    />
                    {email.length > 0 && (
                      <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>
                    )}
                  </label>
                </div>
                <div>
                  <label className="m-1.5 text-white" htmlFor="password">
                    <span className="ml-9 my-4 text-lg">비밀번호</span>
                    <input
                      className="border-4 border-[#677DC6] w-96 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                      type="password"
                      name="password"
                      onChange={onChangePassword}
                    />
                  </label>
                </div>
                <div>
                  <label className="m-1.5 text-white" htmlFor="passwordcheck">
                    <span className="my-4 text-lg">비밀번호 확인</span>
                    <input
                      className="border-4 border-[#677DC6] w-96 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                      type="password"
                      name="password2"
                      onChange={onChangePasswordConfirm}
                    />
                    {passwordConfirm.length > 0 && (
                      <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>
                        {passwordConfirmMessage}
                      </span>
                    )}
                  </label>
                </div>
                <div>
                  <label className="m-1.5 text-white" htmlFor="birthday">
                    <span className="ml-16 my-4 text-lg">생일</span>
                    <input
                      className="border-4 border-[#677DC6] w-96 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                      type="date"
                      name="birth"
                    />
                  </label>
                </div>

                <div className="my-8 flex justify-end">
                  <button type="submit" className="mr-5">
                    <p className="text-white text-xl p-2">다음 &#62;</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupPage;
