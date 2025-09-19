"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Music,
} from "lucide-react";

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
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none");

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLButtonElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  const handleNext = useCallback(() => {
    if (repeatMode === "one") {
      // Repetir música atual
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    let newIndex: number;
    if (isShuffled) {
      // Modo shuffle
      do {
        newIndex = Math.floor(Math.random() * tracks.length);
      } while (newIndex === currentTrackIndex && tracks.length > 1);
    } else {
      // Modo sequencial
      newIndex = currentTrackIndex + 1;
      if (newIndex >= tracks.length) {
        if (repeatMode === "all") {
          newIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }
    setCurrentTrackIndex(newIndex);
  }, [repeatMode, isShuffled, tracks.length, currentTrackIndex]);

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
    <div className="bg-gray-900 rounded-xl p-5 shadow-2xl max-w-md mx-auto">
      <audio ref={audioRef} preload="metadata">
        <track kind="captions" label="Sem legendas disponíveis" />
      </audio>

      {/* Track Info */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Music className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-1 truncate">
            {currentTrack?.title || "Sem música"}
          </h3>
          <p className="text-gray-400 text-sm truncate">
            {currentTrack?.artist || "Artista desconhecido"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <button
          type="button"
          ref={progressRef}
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer mb-2 relative overflow-hidden block"
          onClick={handleProgressClick}
          onKeyDown={handleProgressKeyDown}
          aria-label="Controle de progresso"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
          <div
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-300"
            style={{ left: `calc(${progressPercentage}% - 8px)` }}
          />
        </button>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          disabled={tracks.length === 0}
          aria-label="Música anterior"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={tracks.length === 0}
          aria-label={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          disabled={tracks.length === 0}
          aria-label="Próxima música"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        {/* Shuffle & Repeat */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setIsShuffled(!isShuffled)}
            className={`text-sm transition-colors duration-200 ${
              isShuffled ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
            aria-label={
              isShuffled ? "Desativar modo aleatório" : "Ativar modo aleatório"
            }
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const modes: ("none" | "one" | "all")[] = ["none", "one", "all"];
              const currentIndex = modes.indexOf(repeatMode);
              const nextIndex = (currentIndex + 1) % modes.length;
              setRepeatMode(modes[nextIndex]);
            }}
            className={`text-sm transition-colors duration-200 relative ${
              repeatMode !== "none"
                ? "text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            aria-label={`Modo de repetição: ${repeatMode}`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === "one" && (
              <span className="absolute -top-1 -right-1 text-xs">1</span>
            )}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors duration-200"
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
            className="w-16 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
            aria-label="Controle de volume"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
