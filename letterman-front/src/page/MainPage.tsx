import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import React, { useState, useEffect } from 'react';
import 'utils/pageStyle.css';
import ResultModal from 'components/ResultModal';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { getUUID } from 'utils/getUUID';
import { Link } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const arrEvent: any = [];

  useEffect(() => {
    axios.get(`/letters/events/all`).then((res) => {
      for (let i = 0; i < 3; i += 1) {
        arrEvent[i] = res.data[i].uuid;
      }
      setEventList(arrEvent);
    });
  }, []);

  // asdfsfafsfasfsaf

  console.log(': 모듈을 이용한 유유아디', getUUID().uuid);
  // asdfsfafsfasfsaf
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const { id } = event.currentTarget;
    console.log(event.currentTarget.id);
    await axios
      .get(`/letters/events/${id}/check-date`)
      // .get(`/letters/events/fdbfce22-ac18-4bc7-99cb-2bc44b2dd64d/check-date`)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === 'false') {
          navigate('/remainingdayspage', { state: [res.data.days, id] }); // 남은일수와 , 이벤트 id
        } else {
          navigate('/maillistpage', { state: [id] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(eventList);
  console.log(eventList[1]);

  const [dDay, setDDay] = useState('0');
  const {uuid} = getUUID()
  const handleBirthClick = () => {
    (async () => {
      await axios
        .get(`/letters/users/${uuid}/events/birth/check-birth-date`)
        .then((res) => {
          setDDay(res.data.status);
          if (dDay === 'true') {
            console.log("편지 확인 가능");
            navigate('/birthmaillistpage');
          }
          else {
            console.log("편지 확인 불가")
            navigate('/birthremainingdayspage');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
    }
      
  const [modalOC, setModalOC] = useState(false);
  // ⭕️
  
  const [username, setUserName] = useState("Name")
  
  useEffect(() => {
    (async () => {
      await axios
      .get(`/users/${uuid}/get-profile/`)
      .then((res) => {
        setUserName(res.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
    })();
  }, []);


  return (
    <div
      className="flex justify-center font-press-start  h-screen"
      style={{ backgroundColor: ColorSystem.MainColor.Primary }}
    >
      {/* 2023 */}
      <button
        onClick={handleClick}
        id={eventList[2]}
        type="button"
        className="scaleup flex justify-center h-fit w-60 md:w-80 lg:w-2/6"
      >
        <img src="images/newyearimg.png" alt="a" className="" />
      </button>

      <div className="absolute top-5 left-10">
        <Link to="/mypage">
          <span className="flex justify-center text-white font-bold text-xl">{username} 님</span>
        </Link>
      </div>
      {/* 편지 */}
      <div className="flex flex-col absolute top-5 left-5 md:m-10 w-20 md:w-28 lg:w-1/12 ">
        <button 
        onClick={handleBirthClick} 
        type="button" className="scaleup">
            <img src="images/letterimg.png" alt="a" />
        </button>
      </div>
      {/* 추석 */}
      <button
        onClick={() => alert('업데이트 예정입니다.')}
        className="scaleup absolute bottom-0 left-0 w-60 md:w-80 lg:w-2/6"
        type="button"
      >
        <img src="images/thankimg.png" alt="a" />
      </button>
      {/* 크리스마스 */}
      <button onClick={handleClick} id={eventList[0]} type="button">
        <img
          src="images/treeimg.png"
          alt="a"
          className="scaleup absolute bottom-0 right-0 m-1 md:m-3  w-60 md:w-80 lg:w-2/6 "
        />
      </button>
      {/* 호박 선물 */}
      <div className="flex flex-row absolute bottom-0 right-0 w-60 md:w-80 lg:w-2/5 ">
        <button onClick={handleClick} className="scaleup" type="button" id={eventList[1]}>
          <img src="images/halloweenimg.png" alt="a" className="origin-center hover:origin-top" />
        </button>
        <button onClick={() => alert('업데이트 예정입니다.')} className="scaleup" type="button">
          <img src="images/valentineimg.png" alt="a" />
        </button>
      </div>
      {/* ⭕️ */}
      <ResultModal openinit={modalOC} closeModal={() => setModalOC(false)} />
      {/* ⭕️ */}
    </div>
  );
}

export default MainPage;
