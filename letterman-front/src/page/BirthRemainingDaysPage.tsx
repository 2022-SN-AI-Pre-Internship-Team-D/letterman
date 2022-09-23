import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import FooterCookies from 'components/RemainingDays/FooterCookies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUUID } from 'utils/getUUID';

function BirthDaysPage() {
  const [birthdDay, setbirthDay] = useState('0');
  const [birthMailCount, setbirthMailCount] = useState('0');
  const {uuid} = getUUID()

  useEffect(() => {
    // 생일까지 남은 디데이
    (async () => {
      await axios
        .get(`/letters/users/${uuid}/events/birth/check-birth-date`)
        .then((res) => {
          setbirthDay(res.data.days);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    // 생일에 받은 편지 수
    (async () => {
      await axios
        .get(`/letters/users/${uuid}/birth/counts`)
        .then((res) => {
          setbirthMailCount(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <div className="flex justify-center h-screen" style={{ backgroundColor: ColorSystem.MainColor.Primary }}>
      <div className="flex justify-center flex-col items-center">
        <p className="text-white text-4xl mb-3">{birthdDay} days left</p>
        <p className="text-slate-300">{birthMailCount} 개의 편지가 당신을 기다리고 있습니다.</p>
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

export default BirthDaysPage;
function then(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}
