import { useEffect } from 'react';

function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio('.src\Components\BackgroundMusic\Epona - Misty.mp3');
    audio.volume = 0.5; // Adjust the volume as needed
    audio.loop = true; // Enable looping
    audio.play();

    return () => {
      // Clean up the audio element when the component unmounts
      audio.pause();
      audio.src = '';
    };
  }, []);

  return null;
}

export default BackgroundMusic;
