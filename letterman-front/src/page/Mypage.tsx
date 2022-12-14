import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import profile from 'images/profile.png';
import star from 'images/star.svg';
import { getUUID } from 'utils/getUUID';
import { useNavigate } from 'react-router';
import BackBtn from 'components/BackBtn';

function MyPage() {
  const { uuid } = getUUID();
  const [username, setUserName] = useState('Name');
  const [birth, setBirth] = useState('');
  const [image, setImage] = useState(profile);

  const [birthMail, setBirthMail] = useState('0');
  const [newYearMail, setNewYearMail] = useState('0');
  const [halloweenMail, sethalloweenMail] = useState('0');
  const [christmasMail, setChristmasMail] = useState('0');
  const [chuseok, setChuseok] = useState('0');
  const [children, setChildren] = useState('0');

  const arrEvent: any = [];

  useEffect(() => {
    (async () => {
      await axios
        .get(`api/v1/users/${uuid}/info`)
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
        .get(`api/v1/letters/users/${uuid}/birth/counts`)
        .then((res) => {
          setBirthMail(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    axios.get('api/v1/letters/events/all').then((res) => {
      for (let i = 0; i < 5; i += 1) {
        arrEvent[i] = res.data[i].uuid;
        console.log(arrEvent[i]);
      }

      // 새해
      (async () => {
        await axios
          .get(`api/v1/letters/users/${uuid}/events/${arrEvent[2]}/counts`)
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
          .get(`api/v1/letters/users/${uuid}/events/${arrEvent[1]}/counts`)
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
          .get(`api/v1/letters/users/${uuid}/events/${arrEvent[0]}/counts`)
          .then((res) => {
            setChristmasMail(res.data[0].count);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
      
      // 추석
      (async () => {
        await axios
          .get(`api/v1/letters/users/${uuid}/events/${arrEvent[3]}/counts`)
          .then((res) => {
            setChuseok(res.data[0].count);
          })
          .catch((error) => {
            console.log(error);
          });
      })();

      // 어린이날
      (async () => {
        await axios
          .get(`api/v1/letters/users/${uuid}/events/${arrEvent[4]}/counts`)
          .then((res) => {
            setChildren(res.data[0].count);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    });  
  }, []);

  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/mainpage');
  };

  return (
    <div className="font-press-start text-xl absolute overflow-hidden pt-20 md:pt-10 bg-[#0E1733] flex justify-center w-screen h-screen items-center">
    <img src={star} alt="star" className="absolute bg-repeat h-screen" />
    <div className="mt-10 text-white bor border-solid border-2 rounded-lg w-4/6 h-4/5 flex flex-col items-center justify-center">
      <img
        style={{ position: 'absolute', top: '70px' }}
        className="h-36 w-36 object-cover text-white border rounded-full"
        src={image}
        alt="유저사진"
      />
      <div className="flex items-center flex-col">
        <div className="absolute top-2 md:left-0 top-2 left-2 md:relative text-4xl md:text-5xl font-mypage-font flex justify-center">
          Hi, {username}
        </div>

        <div className="flex flex-col justify-center items-center m-5">
          <h2 className="font-press-start mt-3 text-3xl">Your Birthday</h2>
          <ul className="list-disc">
            <li>Birthday [{birth}]</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center items-center m-8">
          <h2 className="font-press-start mt-/static/media/star.5483d88297ea1f7ce35e750c519d7b58.svg20  text-3xl">
            Letters
          </h2>
          <ul className="list-disc flex flex-col justify-center items-center m-1">
            <li>Birthday [{birthMail}]</li>
            <li>New Year [{newYearMail}]</li>
            <li>Halloween [{halloweenMail}]</li>
            <li>Christmas [{christmasMail}]</li>
            <li>Chuseok [{chuseok}]</li>
            <li>Children&apos;s Day [{children}]</li>
          </ul>
        </div>
        <div className="absolute top-3 right-3">
            <BackBtn />
          </div>
      </div>
    </div>
  </div>
  );
}

export default MyPage;
