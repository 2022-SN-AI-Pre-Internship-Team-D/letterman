/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import pauseimg from 'images/pauseAudio.png';
import playimg from 'images/playAudio.png';

export default function AudioPlayer({ recordUrl = '' }) {
  const audioPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);

  const play = () => {
    audioPlayer.current.play();
  };
  const pause = () => {
    audioPlayer.current.pause();
  };

  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue((audioPlayer.current.currentTime / audioPlayer.current.duration) * 100);
  };

  return (
    <div className="flex justify-center justify-center items-center flex-wrap h-full mb-2">
      <audio src={recordUrl} ref={audioPlayer} onTimeUpdate={onPlaying}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <br />

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={seekValue}
        onChange={(e) => {
          const seekto = audioPlayer.current.duration * (+e.target.value / 100);
          audioPlayer.current.currentTime = seekto;
          setSeekValue(e.target.value);
        }}
      />

      <button onClick={play} type="button">
        <img src={playimg} alt="mic" className="w-8" />
      </button>
      <button onClick={pause} type="button">
        <img src={pauseimg} alt="mic" className="w-8" />
      </button>
    </div>
  );
}
