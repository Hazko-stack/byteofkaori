"use client";

import { useState, useEffect, useRef } from 'react';

export default function MusicScreen({ onHome }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Referensi ke audio element
  const audioRef = useRef(null);
  
  // Playlist dengan URL audio
  const playlist = [
    { 
      title: "loml", 
      artist: "Taylor Swift", 
      duration: "4:01", 
      totalSeconds: 241,
      audioUrl: "/music/loml.mp3" 
    },
    { 
      title: "Dunia Tipu-Tipu", 
      artist: "Yura Yunita", 
      duration: "5:28", 
      totalSeconds: 328,
      audioUrl: "/music/Dunia Tipu-Tipu.mp3" 
    },
    { 
      title: "L", 
      artist: "Hal", 
      duration: "3:38", 
      totalSeconds: 218,
      audioUrl: "/music/L Hal.mp3" 
    },
    { 
      title: "The Cut That Always Bleeds", 
      artist: "Glenn Medeiros", 
      duration: "5:54", 
      totalSeconds: 354,
      audioUrl: "/music/the cut that always bleeds.mp3" 
    },
    { 
      title: "12:45", 
      artist: "Etham", 
      duration: "0:30", 
      totalSeconds: 30,
      audioUrl: "/music/12:45.mp3" 
    }
  ];

  const currentSong = playlist[currentSongIndex];
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update audio source when current song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = currentSong.audioUrl;
      setIsLoaded(false);
      
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentSongIndex, currentSong.audioUrl]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update current time display
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    // Update time frequently
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Event handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const handlePrevSong = () => {
    if (currentTime > 3) {
      // If more than 3 seconds into song, restart current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else if (currentSongIndex > 0) {
      // Otherwise go to previous song
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      // If at beginning of playlist, restart current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleSongEnd = () => {
    // Auto play next song when current song ends
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
    // Update duration from actual audio file if needed
    // You could update your playlist with actual duration here
  };

  const handleSeek = (e) => {
    const seekPosition = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = seekPosition;
      setCurrentTime(seekPosition);
    }
  };

  return (
    <div className="h-full flex flex-col text-green-400 font-mono">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {/* Header */}
      <h2 className="text-center text-xl font-bold">Music Player</h2>
      
      {/* Song Info */}
      <div className="bg-green-950 rounded p-1 mb-1">
        {/* Song Title and Artist */}
        <div className="text-center">
          <p className="text-lg truncate">{currentSong.title}</p>
          <p className="text-yellow-300 text-sm">{currentSong.artist}</p>
        </div>
        
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={currentSong.totalSeconds}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-green-800 rounded-full my-1 appearance-none"
          style={{
            background: `linear-gradient(to right, #facc15 0%, #facc15 ${
              (currentTime / currentSong.totalSeconds) * 100
            }%, #134e4a ${(currentTime / currentSong.totalSeconds) * 100}%, #134e4a 100%)`
          }}
        />
        
        {/* Time Display */}
        <div className="flex justify-between text-xs mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{currentSong.duration}</span>
        </div>
      </div>
      
      {/* Playback Controls */}
      <div className="flex mb-1">
        <button 
          className="bg-green-800 px-2 py-1 rounded mr-1 flex-none w-10 flex items-center justify-center"
          onClick={handlePrevSong}
        >
          ◄◄
        </button>
        <button 
          className="bg-green-800 px-2 py-1 rounded flex-grow flex items-center justify-center relative"
          onClick={handlePlayPause}
          disabled={!isLoaded}
        >
          {!isLoaded ? (
            <span className="animate-pulse">Loading...</span>
          ) : isPlaying ? (
            "II"
          ) : (
            "▶"
          )}
        </button>
        <button 
          className="bg-green-800 px-2 py-1 rounded ml-1 flex-none w-10 flex items-center justify-center"
          onClick={handleNextSong}
        >
          ►►
        </button>
      </div>
      
      {/* Playlist */}
      <div className="flex-grow">
        <p className="text-yellow-300 text-sm mb-1">PLAYLIST:</p>
        <div className="bg-green-950 overflow-y-auto rounded p-1" style={{ maxHeight: "80px" }}>
          {playlist.map((song, index) => (
            <div 
              key={index} 
              className={`flex justify-between p-1 text-xs cursor-pointer ${index === currentSongIndex ? 'bg-green-800 rounded' : ''}`}
              onClick={() => handleSongSelect(index)}
            >
              <div className="flex">
                <span className="mr-1">{index + 1}.</span>
                <span className={index === currentSongIndex ? 'text-yellow-300' : ''}>
                  {song.title}
                </span>
              </div>
              <span>{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Return Button */}
      <button 
        onClick={onHome}
        className="w-full mt-1 py-1 bg-green-800 rounded"
      >
        HOME
      </button>
    </div>
  );
}