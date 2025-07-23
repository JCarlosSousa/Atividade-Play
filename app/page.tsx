'use client';

import styles from '@/app/Home.module.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const startSeek = () => setIsSeeking(true);
  const endSeek = () => setIsSeeking(false);


  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleMetadata = () => {
      if (!isNaN(video.duration)) {
        setDuration(video.duration);
        setSeekValue(video.currentTime);
      }
    };

    // Caso já esteja carregado (ex: após F5), capturamos manualmente
    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, []);
  
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
    if (!isFinite(time) || isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const checkDuration = () => {
        if (!isNaN(video.duration) && video.duration > 0) {
          setDuration(video.duration);
        } else {
          // Retry em 200ms até ter uma duração válida
          setTimeout(checkDuration, 200);
        }
      };
      checkDuration();
    }
  };



  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && !isSeeking) {
      setCurrentTime(video.currentTime);
      setSeekValue(video.currentTime);
    }
  };


  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setSeekValue(newTime);
  };

  const handleSeekCommit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newTime = parseFloat(e.target.value);
    if (video && !isNaN(newTime)) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
      setSeekValue(newTime);
    }
  };


  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      video.muted = false;
    }
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      const newTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
      video.currentTime = newTime;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <video
          ref={videoRef}
          src="/Alok & Ina Wroldsen - Favela (Official Music Video).mp4"
          preload="metadada"
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
          <div className={styles.timeLabel}>
            ⏱ {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={seekValue}
            onChange={handleSeekChange}
            onMouseDown={startSeek}
            onMouseUp={(e) => { endSeek(); handleSeekCommit(e as any); }}
            onTouchStart={startSeek}
            onTouchEnd={(e) => { endSeek(); handleSeekCommit(e as any); }}
            className={styles.progressBarStyled}
          />
        </div>


        {/* Botões de controle */}
        <div className={styles.buttons}>
          <button type="button" onClick={() => skipTime(-10)}>&#9664;&#9664; </button>
          <button type="button" onClick={togglePlay} className={styles.playButton}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" onClick={() => skipTime(10)}> &#9654;&#9654;</button>
        </div>

        {/* Controles de volume */}
        <div className={styles.volumeControls}>
          <button type="button" onClick={toggleMute} className={styles.volumeButton}>
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={changeVolume}
            className={styles.volumeSliderStyled}
          />
        </div>
      </div>
    </div>
  );
}
