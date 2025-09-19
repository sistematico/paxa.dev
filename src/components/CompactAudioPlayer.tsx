'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

interface CompactAudioPlayerProps {
  track: Track;
  autoPlay?: boolean;
}

export default function CompactAudioPlayer({ track, autoPlay = false }: CompactAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    if (autoPlay) {
      audio.play();
      setIsPlaying(true);
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [autoPlay]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
      <audio ref={audioRef} src={track.src} preload="metadata">
        <track kind="captions" label="Sem legendas disponíveis" />
      </audio>
      
      <div className="flex items-center space-x-4">
        {/* Play Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex-shrink-0"
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        {/* Track Info & Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="truncate">
              <h4 className="text-white text-sm font-medium truncate">
                {track.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {track.artist}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <Volume2 className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}