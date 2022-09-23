import 'tailwindcss/tailwind.css';
import back from 'images/back.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import profile from 'images/profile.png';
import { getUUID } from 'utils/getUUID';
import { useNavigate } from 'react-router';

function MyPage() {
  const {uuid} = getUUID()
  const [username, setUserName] = useState("Name")
  const [birth, setBirth] = useState('');
  const [image, setImage] = useState(profile);

  const [birthMail, setBirthMail] = useState('0')
  const [newYearMail, setNewYearMail] = useState('0');
  const [halloweenMail, sethalloweenMail] = useState('0');
  const [christmasMail, setChristmasMail] = useState('0');

  useEffect(() => {
    (async () => {
      await axios
      .get(`/users/${uuid}/get-profile/`)
      .then((res) => {
        setUserName(res.data.username);
        setBirth(res.data.birth);
        setImage(res.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
    })();

    // 생일
    (async () => {
      await axios
        .get(`letters/users/${uuid}/birth/counts`)
        .then((res) => {
          setBirthMail(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    // 새해
    (async () => {
      await axios
        .get(`letters/users/${uuid}/events/483eb9c4-70b2-41bb-a783-8c00d28dbe47/counts`)
        .then((res) => {
          setNewYearMail(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    // 할로윈
    (async () => {
      await axios
        .get(`letters/users/${uuid}/events/7c97bce0-27d5-413e-b30c-a37ee9216f87/counts`)
        .then((res) => {
          sethalloweenMail(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    // 크리스마스
    (async () => {
      await axios
        .get(`letters/users/${uuid}/events/6eabfb36-4e35-4a11-a043-33b7c8887a98/counts`)
        .then((res) => {
          setChristmasMail(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  // const handleFileOnChange = async() => {
  //   const options = { maxSizeMB: 1, maxWidthOrHeight: 50 };
  //   try {
  //     const compressedFile = await imageCompression(image, options);
  //     const resultFile = new File([compressedFile], compressedFile.name, {
  //       type: compressedFile.type,
  //     });
  //     return resultFile;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/mainpage");
  }
    

  return (
    <div className=" pt-20 bg-[#0E1733] flex justify-center h-screen items-center">
      <div className=" text-white border-solid border-2 rounded-lg w-4/6 h-4/5 flex flex-col items-center justify-center">
        <img
          style={{ position: 'absolute', top: '45px' }}
          className="h-36 w-36 object-fit:cover text-white border-2 rounded-full"
          src={image}
          alt="유저사진"
        />

        <div className="mb-12 pt-3 text-2xl font-mypage-font flex justify-center">
          {username}
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-press-start mb-5 text-3xl">Your Birthday</h2>
          <ul className="list-disc">
            <li>Birthday [{birth}]</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-press-start mt-20 mb-5 text-3xl">Letters</h2>
          <ul className="list-disc flex flex-col justify-center items-center">
            <li>Birthday [{birthMail}]</li>
            <li>New Year [{newYearMail}]</li>
            <li>Halloween [{halloweenMail}]</li>
            <li>Christmas [{christmasMail}]</li>
          </ul>
        </div>
        {/* <button type="button" className="font-press-start mt-10">
          Account Settings
        </button> */}
        <button className="flex justify-center" type='button' onClick={goToMain}>
         <img
          style={{ position: 'absolute', bottom: '112px' }}
          className=""
          src={back}
          alt="뒤로가기"
        />
        </button>
      </div>
    </div>
  );
}

export default MyPage;
