import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const SENTENCES = [
  'Copying is easy, pasting is tricky.',
  'Practice makes perfect.',
  'Ctrl+C and Ctrl+V save time.',
  'Stay curious and keep learning!',
  'React is a JavaScript library for building UIs.',
];

const CopyPractice = () => {
  const nav = useNavigate();
  const [target, setTarget] = useState('');
  const [input,  setInput]  = useState('');
  const textAreaRef = useRef(null);

  // 랜덤 문장 생성
  useEffect(() => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput('');
  }, []);

  // 붙여넣기 이벤트 리스너 (Ctrl+V)
  const handlePaste = e => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    setInput(paste);
  };

  const handleSubmit = () => {
    if (input.trim() === target.trim()) {
      alert('복사/붙여넣기 연습 통과!');
      nav('/practice');
    } else {
      alert('문장이 다릅니다. 다시 시도해 보세요.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-16 px-4 text-center">
      <h1 className="text-3xl font-bold">복사 / 붙여넣기 연습</h1>
      <p className="max-w-xl text-lg text-gray-300">
        아래 <span className="font-semibold text-yellow-400">파란 박스</span>의 문장을 <br /> <kbd className="bg-gray-800 px-2 py-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-800 px-2 py-1 rounded">C</kbd> 로 복사한 뒤,<br />
        입력 박스에 <kbd className="bg-gray-800 px-2 py-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-800 px-2 py-1 rounded">V</kbd> 로 붙여넣어 보세요.
      </p>

      <div className="bg-blue-700 text-white px-8 py-6 rounded-2xl select-text">
        {target}
      </div>

      <textarea
        ref={textAreaRef}
        onPaste={handlePaste}
        placeholder="여기에 붙여넣기…"
        className="w-full max-w-xl h-32 px-4 py-3 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
      >
        제출
      </button>
    </div>
  );
};
export default CopyPractice;