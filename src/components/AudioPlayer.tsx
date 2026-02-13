// src/components/AudioPlayer.tsx
"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  X,
} from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isPlaying,
    currentTrack,
    volume,
    isMuted,
    currentTime,
    duration,
    playlist,
    togglePlay,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    setCurrentTrack,
    playTrack,
  } = useAudioPlayer();

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Botão compacto na navbar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Player de áudio"
      >
        <Music className="w-5 h-5" />
        {isPlaying && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Player expandido */}
      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl p-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Player de Áudio</h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Fechar player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Track Info */}
          <div className="mb-4">
            <h4 className="font-medium text-sm truncate">
              {playlist[currentTrack].title}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
              {playlist[currentTrack].artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Música anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-3 rounded-full bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <Pause
                  className="w-5 h-5 text-white dark:text-black"
                  fill="currentColor"
                />
              ) : (
                <Play
                  className="w-5 h-5 text-white dark:text-black"
                  fill="currentColor"
                />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Próxima música"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={isMuted ? "Ativar som" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Playlist */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-semibold mb-2 text-neutral-600 dark:text-neutral-400">
              PLAYLIST
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {playlist.map((track, index) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => playTrack(index)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                    index === currentTrack
                      ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  <div className="truncate">{track.title}</div>
                  <div className="text-neutral-500 dark:text-neutral-400 truncate">
                    {track.artist}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estilos customizados para os sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
