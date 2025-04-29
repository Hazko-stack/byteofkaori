"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MusicScreen from './MusicScreen';

const screens = {
  LOADING: 'loading',
  HOME: 'home',
  MESSAGE: 'message',
  MUSIC: 'music',
};

export default function GameBoy() {
  const [currentScreen, setCurrentScreen] = useState(screens.LOADING);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const thoughtsOnLife = [
    "A programmer usually writes clean code, deploying logic into functions, and breaking problems down into manageable components.",
    "But there are things that can't be handled with if-else statements, can't be rolled back, let alone git reverted. Feelings arise out of nowhere—without warnings, without exceptions—and when a crash happens, there's no stack trace to guide the way.",
    "He tries to refactor himself, removing dependencies on the past, but somehow, every time he runs, he returns to the same state—an infinite loop that never ends, as if constantly waiting to be executed with uncertain results",
    "Behind all the syntax highlighting and auto-complete, something feels different. Like variables beginning to connect in ways no parameter can explain",
    "There's no documentation for these feelings—they appear without reason, without warning. And sometimes, the only return is a smile—like a value never clearly defined in the code, yet still filling the empty spaces."
  ];

  useEffect(() => {
    // Simulate loading
    if (currentScreen === screens.LOADING) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentScreen(screens.HOME), 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    if (screen === screens.MESSAGE) {
      setMessageIndex(0);
    }
  };

  const handleNextMessage = () => {
    if (messageIndex < thoughtsOnLife.length - 1) {
      setMessageIndex(messageIndex + 1);
    }
  };

  const handlePrevMessage = () => {
    if (messageIndex > 0) {
      setMessageIndex(messageIndex - 1);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case screens.LOADING:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="screen-text text-xl mb-4">Kaori</h2>
            <div className="mb-2 w-full px-4">
              <div className="flex items-center">
                <p className="screen-text mr-2">&gt; READY!</p>
                <span className="screen-text animate-blink">_</span>
              </div>
              <div className="progress-bar mt-2">
                <div className="progress-fill" style={{ width: `${loadingProgress}%` }}></div>
              </div>
            </div>
            <p className="screen-text text-yellow-300 mt-4">SMILE!</p>
          </div>
        );
      case screens.HOME:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="screen-text text-2xl mb-4">HALLO</h2>
            <h2 className="screen-text text-2xl mb-6">WELCOME!</h2>
            <p className="screen-text text-yellow-300 font-semibold">Press Start Button</p>
          </div>
        );
      case screens.MESSAGE:
        return (
          <div className="flex flex-col h-full">
            <h2 className="screen-text text-xl mb-2">Message</h2>
            <div className="screen-text text-sm whitespace-pre-wrap flex-grow">
              {thoughtsOnLife[messageIndex]}
            </div>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handlePrevMessage}
                disabled={messageIndex === 0}
                className={`px-3 py-1 rounded ${messageIndex === 0 ? 'bg-gray-500' : 'bg-blue-500'}`}
              >
                SKIP
              </button>
              <button 
                onClick={handleNextMessage}
                disabled={messageIndex === thoughtsOnLife.length - 1}
                className={`px-3 py-1 rounded ${messageIndex === thoughtsOnLife.length - 1 ? 'bg-gray-500' : 'bg-green-500'}`}
              >
                NEXT
              </button>
            </div>
            <button 
              onClick={() => handleNavigate(screens.HOME)}
              className="w-full mt-2 py-1 bg-red-500 rounded"
            >
              HOME
            </button>
          </div>
        );
      case screens.MUSIC:
        return <MusicScreen onHome={() => handleNavigate(screens.HOME)} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-2xl shadow-xl max-w-md w-full border-4 border-gray-400">
      {/* GameBoy Top Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full relative">
            <div className="absolute -top-1 -left-1 w-2 h-1 bg-white opacity-40 rounded-full"></div>
          </div>
          <span className="ml-2 text-black font-semibold text-xs">POWER</span>
        </div>
        <h1 className="text-black font-bold text-md">KAORI</h1>
      </div>
      
      {/* Screen with border */}
      <div className="bg-gray-700 p-3 rounded-md mb-4">
        <div className="bg-green-900 p-4 rounded-md screen-container h-90">
          {renderScreen()}
        </div>
      </div>
      
      <div className="text-xs mb-2 text-gray-500 flex justify-between">
        <span>DOT MATRIX WITH STEREO SOUND</span>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="ml-1 text-xs">BATTERY</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Left side: D-pad */}
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24">
            {/* D-pad cross shape */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-8 h-24 bg-gray-800 rounded-md"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="w-24 h-8 bg-gray-800 rounded-md"></div>
            </div>
            
            {/* D-pad buttons with 3D effect */}
            <button className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gray-700 border-b-2 border-gray-900 rounded-t-md hover:bg-gray-600">
              <span className="absolute top-1.5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">▲</span>
            </button>
            <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gray-700 border-t-2 border-gray-900 rounded-b-md hover:bg-gray-600">
              <span className="absolute top-1.5 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">▼</span>
            </button>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-10 bg-gray-700 border-r-2 border-gray-900 rounded-l-md hover:bg-gray-600">
              <span className="absolute top-1/2 left-1.5 transform -translate-y-1/2 text-xs text-gray-400">◄</span>
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-10 bg-gray-700 border-l-2 border-gray-900 rounded-r-md hover:bg-gray-600">
              <span className="absolute top-1/2 right-1.5 transform -translate-y-1/2 text-xs text-gray-400">►</span>
            </button>
            
            {/* Center button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-md"></div>
          </div>
        </div>
        
        {/* Right side: A B buttons */}
        <div className="flex justify-end items-center">
          <div className="relative w-28 h-24">
            {/* A & B buttons with 3D effect and angled positioning */}
            <button 
              className="absolute top-2 right-0 w-12 h-12 bg-red-600 rounded-full transform -rotate-12 shadow-md hover:bg-red-500 border-2 border-red-800"
              onClick={() => {
                if (currentScreen === screens.HOME) {
                  handleNavigate(screens.MESSAGE);
                }
              }}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-red-900">A</span>
              <div className="absolute top-1 left-1 w-2 h-1 bg-white opacity-30 rounded-full"></div>
            </button>
            <button 
              className="absolute bottom-2 left-2 w-12 h-12 bg-red-600 rounded-full transform -rotate-12 shadow-md hover:bg-red-500 border-2 border-red-800"
              onClick={() => handleNavigate(screens.HOME)}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-red-900">B</span>
              <div className="absolute top-1 left-1 w-2 h-1 bg-white opacity-30 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 border-b-2 border-blue-700"
          onClick={() => handleNavigate(screens.MESSAGE)}
        >
          MESSAGE
        </button>
        <Link href="/archives" className="block">
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 border-b-2 border-red-700 w-full"
          >
            ARCHIVES
          </button>
        </Link>
        <button 
          className="bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600 border-b-2 border-purple-700"
          onClick={() => handleNavigate(screens.MUSIC)}
        >
          MUSIC
        </button>
        <Link href="/github" className="block">
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 border-b-2 border-red-700 w-full"
          >
            GITHUB
          </button>
          </Link>
      </div>
      
      {/* Select/Start buttons */}
      <div className="flex justify-center space-x-12 mb-4">
        <div className="relative">
          <button 
            className="w-16 h-6 bg-gray-800 rounded-md transform rotate-6 shadow-md hover:bg-gray-700 border-b-2 border-gray-900"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-300">Select</div>
          </button>
        </div>
        <div className="relative">
          <button 
            className="w-16 h-6 bg-gray-800 rounded-md transform rotate-6 shadow-md hover:bg-gray-700 border-b-2 border-gray-900"
            onClick={() => {
              if (currentScreen === screens.HOME) {
                handleNavigate(screens.MESSAGE);
              }
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-300">Start</div>
          </button>
        </div>
      </div>
      
      {/* Speaker holes */}
      <div className="flex justify-end mb-4">
        <div className="grid grid-cols-6 gap-1 transform rotate-12">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Bottom ridges */}
      <div className="flex space-x-1 justify-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-8 h-2 bg-gray-300 rounded-b-lg"></div>
        ))}
      </div>
    </div>
  );
}