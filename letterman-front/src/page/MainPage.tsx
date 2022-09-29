/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import React, { useState, useEffect } from 'react';
import 'utils/pageStyle.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { getUUID } from 'utils/getUUID';
import { Link } from 'react-router-dom';
import Share from 'images/urlshare.png';
import useCopyClipBoard from 'utils/useCopyClipBoard';
import RemainModal from 'components/RemainModal';
import star from 'images/star.svg';

interface ModalInfo {
  Dday: string;
  eventID: string;
}
function MainPage() {
  const { uuid } = getUUID();
  const arrEvent: any = [];
  const [isCopy, onCopy] = useCopyClipBoard();
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [username, setUserName] = useState('Name');

  const handleModal = () => {
    setModalOC(true);
  };

  const [modalOC, setModalOC] = useState(false);
  const [test, setTest] = useState<ModalInfo>();

  useEffect(() => {
    axios.get(`api/v1/letters/events/all`).then((res) => {
      for (let i = 0; i < 5; i += 1) {
        console.log(res.data[i]);
        arrEvent[i] = res.data[i].uuid;
      }
      setEventList(arrEvent);
    });
    (async () => {
      await axios
        .get(`api/v1/users/${uuid}/info`)
        .then((res) => {
          setUserName(res.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const { id } = event.currentTarget;
    console.log(event.currentTarget.id);
    await axios
      .get(`api/v1/letters/events/${id}/check-date`)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === 'false') {
          setTest({
            Dday: res.data.days,
            eventID: id,
          });
          // navigate('/remainingdayspage', { state: [res.data.days, id] }); // 남은일수와 , 이벤트 id
          handleModal();
        } else {
          navigate('/maillistpage', { state: [id] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBirthClick = () => {
    (async () => {
      await axios
        .get(`api/v1/letters/users/${uuid}/events/birth/check-birth-date`)
        .then((res) => {
          if (res.data.status === 'true') {
            console.log('편지 확인 가능');
            navigate('/birthmaillistpage');
          } else {
            console.log('편지 확인 불가');
            setTest({
              Dday: res.data.days,
              eventID: '',
            });
            handleModal();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  };

  return (
    <div
    className="flex justify-center font-press-start font-bold   h-screen"
    style={{ backgroundColor: ColorSystem.MainColor.Primary }}
  >
    <img src={star} alt="star" className="absolute bg-repeat h-screen" />
    {/* 2023 */}
    <button
      onClick={handleClick}
      id={eventList[2]}
      type="button"
      className="flex justify-center scaleup absolute md:top-0 top-1/4 md:m-10 w-80 md:w-2/4  "
    >
      <img src="images/newyearimg.png" alt="a" className="" />
    </button>

    <div className="absolute top-5 left-2/5 md:left-20">
      <Link to="/mypage">
        <span className="flex justify-center text-white text-3xl">{username} 님</span>
      </Link>
    </div>
    {/* 편지 */}
    <div className="flex flex-col absolute top-0 left-5 w-28 md:m-10  md:w-28 lg:w-1/12">
      <button onClick={handleBirthClick} type="button" className="scaleup">
        <img src="images/letterimg.png" alt="a" />
      </button>
    </div>
    {/* 추석 */}
    <button
      type="button"
      onClick={handleClick} id={eventList[3]}
      className="scaleup absolute bottom-0 left-0 w-40 md:w-80 lg:w-2/6"
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
      {/* 어린이 날 */}
      <button  onClick={handleClick} className="scaleup" type="button" id={eventList[4]}>
        <img src="images/valentineimg.png" alt="a" />
      </button>
    </div>
    {/* 링크 공유 */}
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="flex absolute top-4 right-4 w-10 ">
      <button
        onClick={() => {
          handleCopyClipBoard(`http://localhost:3000/mainpage2${uuid}`);
          // alert('링크가 복사되었습니다!');
        }}
        type="button"
        className="scaleup"
      >
        <img src={Share} alt="a" className="" />
        {isHovering && <h2 className="text-white">click to copy link!</h2>}
      </button>
    </div>
    <RemainModal openinit={modalOC} closeModal={() => setModalOC(false)} test={test} />
  </div>
  );
}

export default MainPage;
