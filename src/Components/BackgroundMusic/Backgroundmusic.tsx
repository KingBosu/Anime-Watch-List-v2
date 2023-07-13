import { useEffect, useState } from 'react';
 
export function BackgroundMusic() {
 
  // use Audio constructor to create HTMLAudioElement
  const audioTune = new Audio('../../../public/Epona - Misty.mp3');
 
  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(true);
 
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
 
  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])
 
   // play audio sound
   const playSound = () => {
    audioTune.play();
  }
 
  // pause audio sound
  const pauseSound = () => {
    audioTune.pause();
  }
 
 
  return (
    <div>
     

      <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
      <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
 
      <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
    </div>
  );
}