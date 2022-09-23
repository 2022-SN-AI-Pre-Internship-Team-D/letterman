import axios from 'axios';
import EachMail from 'components/MailList/EachMail';
import 'tailwindcss/tailwind.css';
import ColorSystem from 'utils/ColorSystem';
import { useState, useEffect } from 'react';
import MoreButton from 'components/MailList/MoreButton';
import { useLocation } from 'react-router';
import { getUUID } from 'utils/getUUID';

function MailListPage() {
  const { state } = useLocation();
  const [mailList, setMailList] = useState([]); // <any[]>
  const [page, setPage] = useState(1);
  const [mailCount, setMailCount] = useState('0');

  const changeBeforePage = () => {
    if (page > 1) {
      window.scrollTo(0, 0);
      return setPage(page - 1);
    }
    return alert('첫 페이지입니다. ');
  };
  const changeFrontPage = () => {
    window.scrollTo(0, 0);
    return setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`letters/users/${getUUID().uuid}/events/${state[0]}/all/pages/${page}`)
        .then((res) => {
          setMailList(res.data);
          if (res.status === 204) {
            alert('더이상 편지가 존재하지 않습니다.');
            setPage(page - 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    (async () => {
      await axios
        .get(`letters/users/${getUUID().uuid}/events/${state[0]}/counts`)
        .then((res) => {
          setMailCount(res.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [page]);

  return (
    <div
      className="flex justify-center items-center flex-col"
      style={{ backgroundColor: ColorSystem.MainColor.Primary }}
    >
      <span className="text-white m-14 text-2xl">총 {mailCount}개의 편지를 받았습니다.</span>

      {Object.values(mailList)?.map((item: any) => (
        <EachMail content={item.text} key={item.id} />
      ))}
      <div className="flex flex-row mb-8">
        <MoreButton handlePage={changeBeforePage} title="<" />
        <MoreButton handlePage={changeFrontPage} title=">" />
      </div>
    </div>
  );
}
export default MailListPage;
