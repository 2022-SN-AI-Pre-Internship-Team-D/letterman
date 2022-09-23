import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import FooterCookies from 'components/RemainingDays/FooterCookies';
import { useLocation } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import { getUUID } from 'utils/getUUID';

function RemainingDaysPage() {
  const { state } = useLocation();
  const [mailNum, setMailNum] = useState('');

  (async () => {
    await axios
      .get(`/letters/users/${getUUID().uuid}/events/${state[1]}/counts`)
      .then((res) => {
        if (res.data.length) {
          setMailNum(res.data[0].count);
          console.log(res);
        } else {
          setMailNum('0');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })();

  return (
    <div className="flex justify-center h-screen" style={{ backgroundColor: ColorSystem.MainColor.Primary }}>
      <div className="flex justify-center flex-col items-center">
        <p className="text-white text-4xl mb-3">{state[0]} days left</p>
        <p className="text-slate-300">{mailNum}개의 편지가 당신을 기다리고 있습니다.</p>
        <img src="images/back3.png" alt="a" className="w-60 md:w-80 lg:96" />
      </div>

      {/* 집 */}
      <img src="images/back2.png" alt="a" className="absolute bottom-0 left-0 w-60 md:w-80 lg:w-2/6" />

      {/* 나무 */}
      <img src="images/back1.png" alt="a" className="absolute bottom-0 right-0 w-80 md:w-96 lg:w-5/12" />
      <FooterCookies />
    </div>
  );
}

export default RemainingDaysPage;
