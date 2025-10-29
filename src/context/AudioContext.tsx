"use client";

import { tracks } from "@/config";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

interface AudioContextType {
  track: Track;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  currentTime: number;
  duration: number;
  handleCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setTrack: (track: Track) => void;
  play: () => void;
  next: () => void;
  prev: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [duration, setDuration] = useState(0);
  const [track, setTrack] = useState<Track>({
    id: 1,
    title: "Hackers",
    artist: "Karl Casey",
    src: "/audio/Karl Casey - Hackers.mp3",
  });
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);

  const handleCurrentTime = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  const handleNext = useCallback(() => {
    const newIndex = currentTrack + 1;
    if (newIndex >= tracks.length) {
      setIsPlaying(false);
      return;
    }
    setCurrentTrack(newIndex);
  }, [currentTrack]);

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

  const next = () => {
    const nextIndex = currentTrack < tracks.length - 1 ? currentTrack + 1 : 0;
    const newTrack = tracks[nextIndex];
    setCurrentTrack(nextIndex);
    setTrack(newTrack);

    if (audioRef.current) {
      audioRef.current.src = newTrack.src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const prev = () => {
    const prevIndex = currentTrack > 0 ? currentTrack - 1 : tracks.length - 1;
    const newTrack = tracks[prevIndex];
    setCurrentTrack(prevIndex);
    setTrack(newTrack);

    if (audioRef.current) {
      audioRef.current.src = newTrack.src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const play = () => {
    if (audioRef.current) {
      setTrack(track);
      audioRef.current.src = track.src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolume = (volume: number) => {
    setVolumeState(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (volume === 0) {
        setMuted(true);
      } else if (muted) {
        setMuted(false);
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        track,
        setTrack,
        currentTime,
        duration,
        handleCurrentTime,
        setDuration,
        play,
        next,
        prev,
        pause,
        volume,
        setVolume,
        muted,
        setMuted,
      }}
    >
      {children}
      <audio ref={audioRef} muted={muted} onTimeUpdate={onTimeUpdate} />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
