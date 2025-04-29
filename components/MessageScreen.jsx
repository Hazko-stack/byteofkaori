"use client";

export default function MessageScreen({ thoughtsOnLife, messageIndex, onPrev, onNext, onHome }) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="screen-text text-xl mb-2">Message</h2>
      <div className="screen-text text-sm whitespace-pre-wrap flex-grow">
        {thoughtsOnLife[messageIndex]}
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={onPrev}
          disabled={messageIndex === 0}
          className={`px-3 py-1 rounded ${messageIndex === 0 ? 'bg-gray-500' : 'bg-blue-500'}`}
        >
          SKIP
        </button>
        <button 
          onClick={onNext}
          disabled={messageIndex === thoughtsOnLife.length - 1}
          className={`px-3 py-1 rounded ${messageIndex === thoughtsOnLife.length - 1 ? 'bg-gray-500' : 'bg-green-500'}`}
        >
          NEXT
        </button>
      </div>
      <button 
        onClick={onHome}
        className="w-full mt-2 py-1 bg-red-500 rounded"
      >
        HOME
      </button>
    </div>
  );
}
