import { useEffect, useState } from 'react';

export function BackgroundMusic() {

  const audioTune = new Audio('../../../public/Epona - Misty.mp3');
  const [playInLoop, setPlayInLoop] = useState(true);

  useEffect(() => {
    audioTune.load();
    audioTune.play(); // Autoplay by default
  }, []);

  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop]);

  const playSound = () => {
    audioTune.play();
  }

  const pauseSound = () => {
    audioTune.pause();
  }

  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
  }

  return (
    <div>
      <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
      <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
      <input type="button" className="btn btn-danger" value="Stop" onClick={stopSound}></input>

      {/* <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)}/></label> */}
    </div>
  );
}
