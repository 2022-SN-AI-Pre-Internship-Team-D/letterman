import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState, useCallback } from 'react';
import profile from 'images/profile.png';
import star from 'images/star.svg';
import BackBtn from 'components/BackBtn';

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
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다 :)');
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
      setEmailMessage('이메일 형식이 틀렸어요');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요.');
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

    if (signUpUserInfo.birth === '' || signUpUserInfo.password2 === '') {
      alert('모두 입력해주세요');
    } else {
      (async () => {
        await axios
          .post(`api/v1/users/sign-up`, signUpUserInfo, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
            console.log('회원가입 성공');
            console.log(res.data);
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
    }
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
    <div
      className="font-press-start text-2xl absolute overflow-hidden w-screen h-screen flex justify-center"
      style={{ backgroundColor: ColorSystem.MainColor.Primary }}
    >
      <img src={star} alt="star" className="z-10 absolute bg-repeat " />
      <div className="z-30 flex flex-col justify-center h-screen item-center">
        <div
          className=" text-white border-solid border-2 rounded-lg flex flex-col 
      items-center justify-center"
          style={{ height: '50rem', width: '70rem' }}
        >
          <div className="flex justify-center mt-3 mb-14 text-white text-5xl">
            <span>회원가입</span>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mt-2">
              <div className="flex md:flex-row flex-col justify-center">
                <div className="flex justify-center items-center mr-10 ml-10 md:pb-28 pb-5">
                  <div className="preview">
                    <label htmlFor="profile">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="profile"
                          className="object-cover w-80 h-80 md:w-80 cursor-pointer flex flex-col justify-center items-center 
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

                <div className="ml-10 flex flex-col justify-end  ">
                  <div className="">
                    <label className="m-1.5 text-white flex flex-row" htmlFor="nickname">
                      <span className="ml-6 my-4">닉네임</span>
                      <div className="flex flex-col">
                        <input
                          className="border-4 border-[#677DC6] md:w-96 w-64 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                          name="username"
                          onChange={onChangeName}
                        />
                        {name.length > 0 && (
                          <span className={`message ${isName ? 'success' : 'error'} ml-10`}>{nameMessage}</span>
                        )}
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="m-1.5 text-white flex flex-row" htmlFor="email">
                      <span className="ml-6 my-4">이메일</span>
                      <div className="flex flex-col">
                        <input
                          className="border-4 border-[#677DC6] md:w-96 w-64 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                          name="email"
                          onChange={onChangeEmail}
                        />
                        {email.length > 0 && (
                          <span className={`message ${isEmail ? 'success' : 'error'} ml-10`}>{emailMessage}</span>
                        )}
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="m-1.5 text-white" htmlFor="password">
                      <span className="ml-4 my-4">비밀번호</span>
                      <input
                        className="border-4 border-[#677DC6] md:w-96 w-64 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                        type="password"
                        name="password"
                        onChange={onChangePassword}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="m-1.5 text-white flex flex-row" htmlFor="passwordcheck">
                      <span className="ml-3 my-4 ">비번확인</span>
                      <div className="flex flex-col">
                        <input
                          className="border-4 border-[#677DC6] md:w-96 w-64 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                          type="password"
                          name="password2"
                          onChange={onChangePasswordConfirm}
                        />
                        {passwordConfirm.length > 0 && (
                          <span className={`message ${isPasswordConfirm ? 'success' : 'error'} ml-10`}>
                            {passwordConfirmMessage}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="m-1.5 text-white" htmlFor="birthday">
                      <span className="ml-9 my-4">생일</span>
                      <input
                        className="border-4 border-[#677DC6] md:w-96 w-64 mx-5 my-2 px-2.5 py-2.5 rounded-2xl text-background"
                        type="date"
                        name="birth"
                      />
                    </label>
                  </div>
                  <div className="absolute top-3 right-3">
              <BackBtn />
            </div>
                  <div className="my-8 flex justify-end">
                    <button type="submit" className="mr-5">
                      <p className="text-white text-3xl p-2">다음 &#62;</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
