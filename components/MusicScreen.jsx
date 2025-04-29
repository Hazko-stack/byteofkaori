"use client";

import { useState, useEffect } from 'react';

export default function MusicScreen({ onHome }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Start with the first song in the playlist
  
  const playlist = [
    { title: "On Bended Knee", artist: "Boyz II Men", duration: "5:29", totalSeconds: 329 },
    { title: "(Everything I Do) I Do It For You", artist: "Bryan Adams", duration: "6:34", totalSeconds: 394 },
    { title: "Just the Two of Us", artist: "Grover Washington Jr.", duration: "7:18", totalSeconds: 438 },
    { title: "Nothing's Gonna Change My Love For You", artist: "Glenn Medeiros", duration: "3:52", totalSeconds: 232 },
    { title: "How Deep Is Your Love", artist: "Bee Gees", duration: "3:58", totalSeconds: 238 }
  ];

  const currentSong = playlist[currentSongIndex];
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime >= currentSong.totalSeconds) {
            // Move to next song when current song ends
            if (currentSongIndex < playlist.length - 1) {
              setCurrentSongIndex(prevIndex => prevIndex + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return currentSong.totalSeconds;
            }
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.totalSeconds, currentSongIndex, playlist.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentTime(0);
    }
  };

  const handlePrevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentTime(0);
    } else {
      // Restart current song if at beginning of playlist
      setCurrentTime(0);
    }
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="h-full flex flex-col text-green-400 font-mono">
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
        <div className="relative h-2 bg-green-800 rounded-full my-1">
          <div 
            className="absolute h-full bg-yellow-400 rounded-full" 
            style={{ width: `${(currentTime / currentSong.totalSeconds) * 100}%` }}
          ></div>
        </div>
        
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
          className="bg-green-800 px-2 py-1 rounded flex-grow flex items-center justify-center"
          onClick={handlePlayPause}
        >
          {isPlaying ? "II" : "▶"}
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