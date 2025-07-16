'use client';

import styles from '@/app/Home.module.css';
import { useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <video
          ref={videoRef}
          src="/Alok & Ina Wroldsen - Favela (Official Music Video).mp4"
          className={styles.videoPlayer}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
          controls={false}
        />
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>Alok & Ina Wroldsen - Favela (Official Music Video)</div>
          <div className={styles.artist}>Fonte: YouTube</div>
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
      </div>
    </div>
  );
}

