import MailInput from 'components/MailList/MailInput';
import 'tailwindcss/tailwind.css';
import html2canvas from 'html2canvas';

import postcard from 'images/postcard.png';
import shareimg from 'images/shareimg.png';
import AudioPlayer from 'components/Audio/audioPlayer';

function EachMail({ content = '', imgfile = '', audiofile = '', divid = '' }) {
  const opts = {
    allowTaint: false,
    useCORS: true,
  };
  const onCapture = () => {
    console.log('onCapture');
    html2canvas(document.getElementById(divid) as HTMLElement, opts).then((canvas) => {
      onSavaAs(canvas.toDataURL('image/png'), 'image-download.png');
    });
  };

  const onSavaAs = (url: string, filename: string) => {
    console.log('onSaveAs');
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = url;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  const img = imgfile;

  return (
    <div id={divid}>
      <div className="md:w-w43 md:h-w38 w-fit relative m-20 rounded-xl items-center flex flex-col-reverse bg-white p-4 ">
        <div className="absolute top-0 right-0 w-10 m-5">
          <button type="button" onClick={onCapture}>
            <img src={shareimg} alt="share" />
          </button>
        </div>
        <MailInput content={content} />
        <AudioPlayer recordUrl={audiofile} />

        <img src={img} alt="sa" className="object-cover w-84 h-48 mb-5 rounded-xl" />

        <img src={postcard} alt="sa" className="top-0 mb-5 w-24" />
      </div>
    </div>
  );
}
export default EachMail;
