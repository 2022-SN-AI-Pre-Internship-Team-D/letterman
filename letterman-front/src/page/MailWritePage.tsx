import 'tailwindcss/tailwind.css';
import React, { useEffect, useRef, useState } from 'react';
import ColorSystem from 'utils/ColorSystem';
import postcard from 'images/postcard.png';
import mic from 'images/mic.png';
import pause from 'images/pauseAudio.png';
import stops from 'images/stopAudio.png';
import downloads from 'images/downloadAudio.png';
import ResultModal from 'components/ResultModal';
import { useLocation } from 'react-router';
import axios from 'axios';
import plus from 'images/plus.png';
import { useRecorder } from 'use-recorder';

interface mailForm {
  text: FormDataEntryValue;
  file: FormDataEntryValue | undefined;
  media: FormDataEntryValue | undefined;
}
// var file = new File([myBlob], "name");
function MailWritePage() {
  const RecorderStarus = {
    PAUSED: 'paused',
    RECORDING: 'recording',
    PLAYING: 'playing',
    SILENT: 'silent',
  };

  const [status, setStatus] = useState(RecorderStarus.PAUSED);
  const { start, stop, player, audio } = useRecorder();

  const actions = {
    [RecorderStarus.RECORDING]: start,
    [RecorderStarus.PAUSED]: stop,
    [RecorderStarus.PLAYING]: () => player!.play(),
    [RecorderStarus.SILENT]: () => player!.pause(),
  };

  const handleAction = (action: any) => {
    setStatus(action);
    actions[action]();
  };

  const [imgFile, setImgFile] = useState<File>();
  const [voiceFile, setVoiceFile] = useState<File>();
  const { state } = useLocation();
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<string>(plus);
  const [userName, setUserName] = useState('');

  const mailData: mailForm = {
    text: content,
    file: imgFile,
    media: voiceFile,
  };

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    }
    (async () => {
      await axios
        .get(`api/v1/users/${state[0]}/info`)
        .then((res) => {
          setUserName(res.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [imgFile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state[1] === 'birth') {
      if (mailData.file === undefined || mailData.media === undefined) {
        alert('모든 항목 작성');
      } else {
        axios
          .post(`api/v1/letters/users/${state[0]}/birth/write`, mailData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            console.log(res);
            handleModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (mailData.file === undefined || mailData.media === undefined) {
      alert('모든 항목 작성');
    } else {
      axios
        .post(`api/v1/letters/users/${state[0]}/events/${state[1]}/write`, mailData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res);
          console.log(mailData);

          handleModal();
        })
        .catch((error) => {
          console.log(error);
          console.log(mailData);
        });
    }
  };

  const onChangeImage = async (event: any) => {
    setImgFile(event.target.files![0]);
  };

  const hiddenFileInput = useRef<any | null>();

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file

  // ⭕️
  const handleModal = () => {
    setModalOC(true);
  };

  const [modalOC, setModalOC] = useState(false);
  // ⭕️

  return (
    <div
    className="flex justify-center items-center py-20 h-screen font-press-start"
    style={{ backgroundColor: ColorSystem.MainColor.Primary }}
  >
    <form
      className="rounded-xl flex flex-col items-center bg-white p-4 md:w-1/6"
      style={{ height: '48rem', width: '38rem' }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <img src={postcard} alt="postcard" className="w-14" />
      <p className="italic font-serif text-xl">dear {userName}</p>
      <div className="flex flex-row mt-3">
        {/* 음성녹음 */}

        <div className="flex flex-row">
          {(status === RecorderStarus.PAUSED || status === RecorderStarus.SILENT) && (
            <button type="button" onClick={() => handleAction(RecorderStarus.RECORDING)}>
              <img src={mic} alt="mic" className="" />
            </button>
          )}
          {status === RecorderStarus.RECORDING && (
            <button type="button" onClick={() => handleAction(RecorderStarus.PAUSED)}>
              <img src={stops} alt="mic" className="w-10" />
            </button>
          )}
          {(status === RecorderStarus.PAUSED || status === RecorderStarus.SILENT) && !!player && (
            <button
              type="button"
              onClick={() => handleAction(RecorderStarus.PLAYING)}
              className="rounded-xl bg-subBackground text-2xl"
              style={{ height: '3rem', width: '8rem' }}
            >
              녹음결과 확인
            </button>
          )}
          {status === RecorderStarus.PLAYING && (
            <button type="button" onClick={() => handleAction(RecorderStarus.SILENT)}>
              <img src={pause} alt="mic" className="w-10" />
            </button>
          )}
        </div>
        {!!player && (
          <button
            type="button"
            onClick={() => {
              if (audio instanceof Object) {
                // console.log(mailData.media.blob);
                const test = Object.values(audio);
                console.log(test[2]);
                setVoiceFile(test[2]);
              }
            }}
          >
            <img src={downloads} alt="mic" className="w-10" />
          </button>
        )}
      </div>

      <div className="preview">
        <label htmlFor="imgfile">
          {preview && (
            <img
              src={preview}
              alt="file"
              className="object-cover cursor-pointer m-10 mt-5 w-72 md:w-96 h-48 rounded-xl bg-subBackground"
            />
          )}
          <input
            id="imgfile"
            ref={hiddenFileInput}
            type="file"
            onChange={onChangeImage}
            onClick={handleClick}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
      <div className="h-64 md:w-winput w-96 text-center bg-[url('images/letterbg.png')] rounded-lg h-fit ">
        <textarea
          placeholder="To.."
          cols={45}
          rows={6}
          maxLength={300}
          className="md:w-50 p-4 h-30 rounded-lg bg-transparent text-3xl leading-9 focus:outline-none "
          style={{ width: '530px', height: '20rem', resize: 'none' }}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
      </div>
      <button type="submit" className=" bg-white px-10 py-2 mt-5 rounded-full border-4 border-subBackground">
        전송
      </button>
    </form>

    <ResultModal openinit={modalOC} closeModal={() => setModalOC(false)} id={state[0]} />
  </div>
  );
}
export default MailWritePage;
