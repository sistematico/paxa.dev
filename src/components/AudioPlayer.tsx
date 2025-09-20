"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration?: number;
}

interface AudioPlayerProps {
  tracks: Track[];
  autoPlay?: boolean;
}

export default function AudioPlayer({
  tracks,
  autoPlay = false,
}: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  const handleNext = useCallback(() => {
    const newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) {
      setIsPlaying(false);
      return;
    }
    setCurrentTrackIndex(newIndex);
  }, [tracks.length, currentTrackIndex]);

  // Inicializar áudio quando o track muda
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      if (autoPlay || isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [currentTrack, autoPlay, isPlaying]);

  // Atualizar tempo atual
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleNext]);

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
      console.error("Erro ao reproduzir áudio:", error);
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // Se passou mais de 3 segundos, volta para o início da música atual
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      // Senão, vai para a música anterior
      const newIndex =
        currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleProgressClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm border border-gray-700/30 max-w-xl mx-auto">
      <audio ref={audioRef} preload="metadata">
        <track kind="captions" label="Sem legendas disponíveis" />
      </audio>

      {/* Single Line Layout */}
      <div className="flex items-center gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center flex-shrink-0">
            <Music className="w-4 h-4 text-gray-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-gray-200 text-sm font-medium truncate">
              {currentTrack?.title || "Sem música"}
            </div>
            <div className="text-gray-400 text-xs truncate">
              {currentTrack?.artist || "Artista desconhecido"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handlePrevious}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
            disabled={tracks.length === 0}
            aria-label="Música anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-gray-200 transition-colors"
            disabled={tracks.length === 0}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
            disabled={tracks.length === 0}
            aria-label="Próxima música"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 min-w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <button
            type="button"
            ref={progressRef}
            className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer relative overflow-hidden block"
            onClick={handleProgressClick}
            onKeyDown={handleProgressKeyDown}
            aria-label="Controle de progresso"
          >
            <div
              className="h-full bg-gray-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </button>
          <span className="text-xs text-gray-400 min-w-8">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
            aria-label={isMuted ? "Ativar som" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-12 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
            aria-label="Controle de volume"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9ca3af;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9ca3af;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
