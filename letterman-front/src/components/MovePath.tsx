import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUUID } from 'utils/getUUID';

// function MovePath({content = ''}) {
    // const [dDay, setDDay] = useState('0');
    // useEffect(() => {
    //     // 생일
    //     (async () => {
    //       await axios
    //         .get(`/letters/users/${getUUID().uuid}/events/birth/check-birth-date`)
    //         .then((res) => {
    //         //   console.log(res.data);
    //           setDDay(res.data.status);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     })();
    
    //   }, []);
    
      const MovePath = ({content = ''}) => {
        if (content === 'true') {
          console.log("편지 열람 가능");
          navigate('/birthmaillistpage');
        }
        else {
          console.log("편지 열람 불가")
          navigate('/birthremainingdayspage');
        }
      }
      
    //   return (
    //     dDayReturn
    //   );
// }
export default MovePath;

function navigate(arg0: string) {
    throw new Error('Function not implemented.');
}
