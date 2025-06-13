/* src/pages/practice/CopyPractice.jsx — 확대·여백 개선 */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

  /* 랜덤 문장 */
  useEffect(() => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput('');
  }, []);

  /* 붙여넣기 감지 */
  const handlePaste = e => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    setInput(paste);
  };

  /* 제출 */
  const handleSubmit = () => {
    if (input.trim() === target.trim()) {
      alert('복사/붙여넣기 연습 통과!');
      nav('/practice');
    } else {
      alert('문장이 다릅니다. 다시 시도해 보세요.');
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center gap-20 py-24 px-6 text-center">
      <h1 className="text-5xl font-extrabold">복사 / 붙여넣기 연습</h1>

      <p className="max-w-2xl text-2xl text-gray-300 leading-relaxed">
        아래&nbsp;
        <span className="font-semibold text-blue-400">회색 박스</span>
        의 문장을&nbsp;
        <kbd className="bg-gray-800 px-2 py-1 rounded">Ctrl</kbd> +
        <kbd className="bg-gray-800 px-2 py-1 rounded">C</kbd> 로&nbsp;복사한 뒤,
        입력 박스에&nbsp;
        <kbd className="bg-gray-800 px-2 py-1 rounded">Ctrl</kbd> +
        <kbd className="bg-gray-800 px-2 py-1 rounded">V</kbd> 로&nbsp;붙여넣어 보세요.
      </p>

      {/* 대상 문장 */}
      <div className="bg-gray-500 px-10 py-8 rounded-3xl select-text text-2xl text-white max-w-2xl">
        {target}
      </div>

      {/* 입력 박스 */}
      <textarea
        ref={textAreaRef}
        onPaste={handlePaste}
        placeholder="여기에 붙여넣기…"
        className="w-full max-w-2xl h-40 px-6 py-4 rounded-2xl bg-white text-black
                   border border-gray-400 text-xl focus:outline-none focus:ring-2
                   focus:ring-green-600"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-14 py-6
                   rounded-2xl text-xl font-semibold"
      >
        제출
      </button>
    </section>
  );
};

export default CopyPractice;
