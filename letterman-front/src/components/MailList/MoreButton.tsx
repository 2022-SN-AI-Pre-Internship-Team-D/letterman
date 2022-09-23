import { useEffect, useState } from 'react';

interface Props {
  handlePage: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
}
function MoreButton({ handlePage, title }: Props) {
  const [kindOfBtn, setKindOfBtn] = useState(false);

  useEffect(() => {
    if (title === '<') {
      setKindOfBtn(true);
    }
  });

  return (
    <button
      type="button"
      className={`${
        kindOfBtn
          ? ' fixed top-1/2 left-0 m-2 font-press-start text-white text-3xl rounded-full p-1'
          : ' fixed top-1/2 right-0 m-2 font-press-start text-white text-3xl rounded-full p-1'
      }`}
      onClick={handlePage}
    >
      {title}
    </button>
  );
}

export default MoreButton;
