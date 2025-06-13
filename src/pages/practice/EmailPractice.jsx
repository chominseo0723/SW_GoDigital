import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_TOTAL_SIZE = 25 * 1024 * 1024; 

const EmailPractice = () => {
  const nav = useNavigate();


  const [to, setTo]         = useState("");
  const [subject, setSub]   = useState("");
  const [body, setBody]     = useState("");
  const [files, setFiles]   = useState([]); 


  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(1);


  const handleFileChange = e => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
   
    e.target.value = "";
  };

 
  const removeFile = idx => {
    setFiles(f => f.filter((_, i) => i !== idx));
  };


  const handleSubmit = e => {
    e.preventDefault();

    if (!to.trim().includes("@")) return alert("받는 사람 이메일을 확인하세요!");
    if (!subject.trim()) return alert("제목을 입력하세요!");

    if (totalSize > MAX_TOTAL_SIZE) {
      return alert(`첨부파일이 너무 큽니다! 총 용량: ${totalSizeMB} MB (최대 25 MB)`);
    }

    if (!window.confirm("정말 이메일을 전송하시겠습니까?")) return;

    alert("이메일이 전송되었습니다!");
    nav("/practice");
  };

  return (
    <div className="flex flex-col items-center gap-12 py-16 px-4 select-none touch-pan-y">
      <h1 className="text-4xl font-bold">이메일 전송 연습</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-6 text-lg"
      >
        {/* 받는 사람 */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="to">받는 사람</label>
          <input
            id="to"
            type="email"
            placeholder="예: example@domain.com"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
            aria-label="받는 사람 이메일 주소"
          />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="subject">제목</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={e => setSub(e.target.value)}
            className="px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
            aria-label="이메일 제목"
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="body">본문</label>
          <textarea
            id="body"
            value={body}
            onChange={e => setBody(e.target.value)}
            className="h-48 px-6 py-4 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
            aria-label="이메일 본문"
          />
        </div>

        {/* 첨부 */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">첨부파일 (최대 25 MB)</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            aria-label="첨부파일 선택"
          />
          {files.length > 0 && (
            <ul className="bg-gray-100 p-4 rounded-xl space-y-2">
              {files.map((f, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{f.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{(f.size / 1024).toFixed(0)} KB</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-600 font-bold pr-2"
                      aria-label="첨부 삭제"
                    >×</button>
                  </div>
                </li>
              ))}
              <li className="text-right font-semibold pt-2">총 {totalSizeMB} MB</li>
            </ul>
          )}
        </div>

        {/* 전송 버튼 */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl text-xl font-semibold active:scale-95 transition"
        >전송</button>
      </form>
    </div>
  );
};

export default EmailPractice;
