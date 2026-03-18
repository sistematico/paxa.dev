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
    playTrack,
  } = useAudioPlayer();

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) return "0:00";
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
        className="relative p-2 rounded-lg hover:bg-surface-alt transition-colors"
        aria-label="Player de áudio"
      >
        <Music className="w-5 h-5" />
        {isPlaying && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Player expandido */}
      {isOpen && (
        <div className="fixed top-16 right-4 w-80 bg-surface border border-border rounded-lg shadow-2xl p-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Player de Áudio</h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-surface-alt transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Track Info */}
          <div className="mb-4">
            <h4 className="font-medium text-sm truncate">
              {playlist[currentTrack].title}
            </h4>
            <p className="text-xs text-muted truncate">
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
              className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-surface-alt transition-colors"
              aria-label="Música anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-3 rounded-full bg-accent hover:bg-accent-hover transition-colors"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <Pause
                  className="w-5 h-5 text-background"
                  fill="currentColor"
                />
              ) : (
                <Play className="w-5 h-5 text-background" fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-surface-alt transition-colors"
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
              className="p-1 rounded hover:bg-surface-alt transition-colors"
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
              className="flex-1 h-1 bg-border rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Playlist */}
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold mb-2 text-muted">PLAYLIST</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {playlist.map((track, index) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => playTrack(index)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                    index === currentTrack
                      ? "bg-surface-alt font-medium"
                      : "hover:bg-surface-alt/50"
                  }`}
                >
                  <div className="truncate">{track.title}</div>
                  <div className="text-muted truncate">{track.artist}</div>
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
