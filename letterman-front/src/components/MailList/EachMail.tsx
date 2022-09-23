import MailInput from 'components/MailList/MailInput';
import 'tailwindcss/tailwind.css';
import cookie from 'images/cookieimg.png';
import postcard from 'images/postcard.png';
import shareimg from 'images/shareimg.png';

function EachMail({ content = '' }) {
  return (
    <div
      className="relative m-20 rounded-xl items-center flex flex-col-reverse bg-white p-4 "
      style={{ height: '43rem', width: '38rem' }}
    >
      <div className="absolute top-0 right-0 w-10 m-5">
        <button type="button" onClick={() => alert('공유버튼')}>
          <img src={shareimg} alt="share" />
        </button>
      </div>
      <MailInput content={content} />
      <img src={cookie} alt="sa" className="py-10" />
      <img src={postcard} alt="sa" className="top-0 mb-7 w-32" />
    </div>
  );
}
export default EachMail;
