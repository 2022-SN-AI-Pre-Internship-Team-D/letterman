import back from 'images/back.png';
import { useNavigate } from 'react-router-dom';

function BackBtn() {
  const navigate = useNavigate();
  return (
    <button
      className="flex justify-center"
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      <img className="" src={back} alt="뒤로가기" />
    </button>
  );
}

export default BackBtn;
