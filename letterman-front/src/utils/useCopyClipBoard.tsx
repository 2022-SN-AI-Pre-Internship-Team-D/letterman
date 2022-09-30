import { useState } from 'react';

type onCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [boolean, onCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: onCopyFn = async (text: string) => {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('text가 복사됨');
      });
      return true;
    }
    // execCommand 사용
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      setIsCopy(true);
    } catch (err) {
      console.error('복사 실패', err);
      setIsCopy(false);
    }
    textArea.setSelectionRange(0, 0);
    document.body.removeChild(textArea);
    console.log('text가 복사됨');

    return true;

    // try {
    //   await window.navigator.clipboard.writeText(text);
    //   setIsCopy(true);
    //   console.log('gooood');

    //   return true;
    // } catch (error) {
    //   console.error(error);
    //   setIsCopy(false);

    //   return false;
    // }
  };

  return [isCopy, onCopy];
}

export default useCopyClipBoard;
