// src/contexts/AudioPlayerContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

interface AudioPlayerContextType {
  // Estado
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playlist: Track[];

  // Ações
  togglePlay: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleVolumeChange: (volume: number) => void;
  toggleMute: () => void;
  handleSeek: (time: number) => void;
  setCurrentTrack: (index: number) => void;
  playTrack: (index: number) => void;

  // Ref do audio
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

const playlist: Track[] = [
  {
    id: 1,
    title: "Passo Bem Solto",
    artist: "ATLXS",
    url: "/audio/ATLXS - PASSO BEM SOLTO.mp3",
  },
  {
    id: 2,
    title: "Madagascar Olodum",
    artist: "Banda Reflexus",
    url: "/audio/Banda Reflexus - Madagascar Olodum.mp3",
  },
];

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Usar useCallback para funções que serão usadas em useEffect
  const handleNext = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  const handleSeek = useCallback((newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  const playTrack = useCallback((index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // useEffect para eventos do audio
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

  // useEffect para auto-play quando trocar de música
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentTrack é necessário para resetar o audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Erro ao reproduzir áudio:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  const value = {
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
    audioRef,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      {/* Audio Element global */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].url}
        preload="metadata"
      />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
}
