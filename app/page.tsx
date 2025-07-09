'use client';

import styles from '@/app/Home.module.css';
import { useRef, useState } from 'react';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <img src="/alok-favela.jpg" alt="Ina Wroldsen, Alok - Favela" className={styles.albumCover} />
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>Ina Wroldsen, Alok - Favela</div>
          <div className={styles.artist}>Youtube</div>
        </div>
        <div className={styles.controls}>
          <div className={styles.time}>{formatTime(currentTime)}</div>
          <div className={styles.time}>{formatTime(duration)}</div>
        </div>
        <div className={styles.buttons}>
          <button>&#9664;</button>
          <button onClick={togglePlay} className={styles.playButton}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button className={styles.volumeIcon}>&#128266;</button>
        </div>
        <audio
          ref={audioRef}
          src="/Ina Wroldsen, Alok - Favela (Lyric Video).mp3"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
}
