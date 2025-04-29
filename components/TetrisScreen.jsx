"use client";

export default function TetrisScreen({ onHome }) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="screen-text text-xl mb-4">Tetris</h2>
      <div className="screen-text text-center flex-grow">
        [Tetris game would appear here]
        <p className="mt-4">Press START to play</p>
      </div>
      <button 
        onClick={onHome}
        className="w-full mt-2 py-1 bg-red-500 rounded"
      >
        KEMBALI
      </button>
    </div>
  );
}
