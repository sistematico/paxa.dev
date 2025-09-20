'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';

interface VoiceTTSProps {
  text: string;
  children: React.ReactNode;
}

declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice: string, options?: {
        rate?: number;
        pitch?: number;
        volume?: number;
        onstart?: () => void;
        onend?: () => void;
        onerror?: (error: Error) => void;
      }) => void;
      cancel: () => void;
      pause: () => void;
      resume: () => void;
      isPlaying: () => boolean;
    };
  }
}

export default function VoiceTTS({ text, children }: VoiceTTSProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [words, setWords] = useState<string[]>([]);
  const [isResponsiveVoiceLoaded, setIsResponsiveVoiceLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setWords(text.split(/\s+/).filter(word => word.length > 0));

    if (!window.responsiveVoice) {
      const script = document.createElement('script');
      script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=FREE';
      script.onload = () => {
        setIsResponsiveVoiceLoaded(true);
      };
      script.onerror = () => {
        setIsResponsiveVoiceLoaded(false);
      };
      document.head.appendChild(script);
    } else {
      setIsResponsiveVoiceLoaded(true);
    }
  }, [text]);

  const getVoiceRSSUrl = (textToSpeak: string): string => {
    const params = new URLSearchParams({
      key: 'demo',
      hl: 'pt-br',
      src: textToSpeak,
      r: '0',
      c: 'mp3',
      f: '44khz_16bit_stereo'
    });
    
    return `https://api.voicerss.org/?${params.toString()}`;
  };

  const simulateWordProgress = () => {
    let wordIndex = 0;
    const wordsPerSecond = 2.5;
    const intervalTime = 1000 / wordsPerSecond;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (wordIndex < words.length && isPlaying) {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
      } else {
        setCurrentWordIndex(-1);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, intervalTime);
  };

  const stopAll = () => {
    if (window.responsiveVoice && isResponsiveVoiceLoaded) {
      window.responsiveVoice.cancel();
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    
    speechSynthesis.cancel();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentWordIndex(-1);
  };

  const speakWithResponsiveVoice = () => {
    if (!window.responsiveVoice) {
      speakWithVoiceRSS();
      return;
    }

    simulateWordProgress();

    window.responsiveVoice.speak(text, 'Portuguese Female', {
      rate: 1,
      pitch: 1,
      volume: isMuted ? 0 : 1,
      onstart: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onend: () => {
        stopAll();
      },
      onerror: () => {
        speakWithVoiceRSS();
      }
    });
  };

  const speakWithVoiceRSS = () => {
    try {
      const audioUrl = getVoiceRSSUrl(text);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      simulateWordProgress();

      audio.onplay = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      audio.onended = () => {
        stopAll();
      };

      audio.onerror = () => {
        speakWithBrowserAPI();
      };

      audio.volume = isMuted ? 0 : 0.8;
      audio.play();

    } catch (error) {
      speakWithBrowserAPI();
    }
  };

  const speakWithBrowserAPI = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    speechSynthesis.cancel();
    simulateWordProgress();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : 0.8;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      stopAll();
    };

    utterance.onerror = () => {
      stopAll();
    };

    speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    stopAll();

    if (isResponsiveVoiceLoaded && window.responsiveVoice) {
      speakWithResponsiveVoice();
    } else {
      speakWithVoiceRSS();
    }
  };

  const handlePause = () => {
    if (window.responsiveVoice && isResponsiveVoiceLoaded) {
      window.responsiveVoice.pause();
    } else if (audioRef.current) {
      audioRef.current.pause();
    } else {
      speechSynthesis.pause();
    }
    setIsPaused(true);
  };

  const handleResume = () => {
    if (window.responsiveVoice && isResponsiveVoiceLoaded) {
      window.responsiveVoice.resume();
    } else if (audioRef.current) {
      audioRef.current.play();
    } else {
      speechSynthesis.resume();
    }
    setIsPaused(false);
  };

  const handleStop = () => {
    stopAll();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      handlePlay();
    } else if (isPaused) {
      handleResume();
    } else {
      handlePause();
    }
  };

  const renderTextWithHighlight = () => {
    return words.map((word, index) => (
      <span
        key={`word-${index}-${word}`}
        className={`tts-word ${index === currentWordIndex ? 'tts-active' : ''} ${
          index < currentWordIndex ? 'tts-spoken' : ''
        }`}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="voice-tts">
      <div className="tts-controls">
        <button
          onClick={handlePlayPause}
          className="tts-control-btn"
          type="button"
          title={!isPlaying ? 'Reproduzir' : isPaused ? 'Continuar' : 'Pausar'}
        >
          {!isPlaying || isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        
        <button
          onClick={handleStop}
          className="tts-control-btn"
          disabled={!isPlaying}
          type="button"
          title="Parar"
        >
          <Square size={16} />
        </button>
        
        <button
          onClick={toggleMute}
          className="tts-control-btn"
          type="button"
          title={isMuted ? 'Ativar som' : 'Silenciar'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        
        <span style={{ marginLeft: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
          {isPlaying ? (isPaused ? 'Pausado' : 'Falando...') : 'Pronto'}
        </span>
      </div>
      
      <div className="tts-text-content">
        {isPlaying ? renderTextWithHighlight() : children}
      </div>
    </div>
  );
}
