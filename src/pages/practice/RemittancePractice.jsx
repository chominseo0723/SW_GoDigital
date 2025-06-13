import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


const BANKS = [
  'KB국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  'NH농협',
  'IBK기업은행',
  '카카오뱅크',
  '토스뱅크',
];

const formatAccount = acc => {
  const digits = acc.replace(/\D/g, '');
  return digits.replace(/(\d{4})(?=\d)/g, '$1-');
};

const RemittancePractice = () => {
  const nav = useNavigate();

  // 단계: 1 선택 → 2 금액 → 3 확인
  const [step, setStep]     = useState(1);

  // 입력값 상태
  const [bank, setBank]     = useState('');
  const [account, setAcc]   = useState('');
  const [amount, setAmt]    = useState('');

  // 공통: 처음부터
  const resetAll = useCallback(() => {
    setStep(1);
    setBank('');
    setAcc('');
    setAmt('');
  }, []);

  /** 1단계 → 2단계 */
  const handleBankNext = e => {
    e.preventDefault();
    if (!bank)   return alert('은행을 선택하세요!');
    if (account.replace(/\D/g, '').length < 8)
      return alert('계좌번호를 다시 확인하세요!');
    setStep(2);
  };

  /** 2단계 → 3단계 */
  const handleAmountNext = e => {
    e.preventDefault();
    const numeric = Number(amount.replace(/,/g, ''));
    if (!numeric || numeric <= 0) return alert('금액을 입력하세요!');
    setStep(3);
  };

  /** 최종 확인 */
  const handleConfirm = () => {
    if (
      window.confirm(
        `${bank}\n계좌: ${formatAccount(account)}\n금액: ${Number(
          amount.replace(/,/g, '')
        ).toLocaleString()}원\n\n송금을 진행할까요?`
      )
    ) {
      alert('송금이 완료되었습니다!');
      nav('/practice');
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 py-16 px-4 select-none touch-pan-y">
      <h1 className="text-4xl font-bold">은행 송금 연습</h1>
      {/* 단계 안내 */}
      <p className="text-xl font-semibold mb-4">{step} 단계 / 3</p>

      {/* 1단계: 은행 & 계좌 입력 */}
      {step === 1 && (
        <form
          onSubmit={handleBankNext}
          className="w-full max-w-xl flex flex-col gap-6 text-2xl"
        >
          {/* 은행 선택 */}
          <select
            aria-label="은행 선택"
            value={bank}
            onChange={e => setBank(e.target.value)}
            className="h-20 px-6 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              은행을 선택하세요
            </option>
            {BANKS.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* 계좌번호 입력 */}
          <input
            type="text"
            aria-label="계좌번호"
            placeholder="계좌번호 (숫자만)"
            inputMode="numeric"
            pattern="[0-9-]*"
            value={formatAccount(account)}
            onChange={e => setAcc(e.target.value)}
            className="h-20 px-6 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white h-20 rounded-xl font-bold active:scale-95">
            다음
          </button>
        </form>
      )}

      {/* 2단계: 금액 입력 */}
      {step === 2 && (
        <form
          onSubmit={handleAmountNext}
          className="w-full max-w-xl flex flex-col gap-6 text-2xl"
        >
          <input
            type="text"
            aria-label="금액"
            placeholder="송금액"
            inputMode="numeric"
            pattern="[0-9,]*"
            value={amount.toLocaleString()}
            onChange={e => setAmt(e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))}
            className="h-20 px-6 rounded-xl bg-white text-black border border-gray-400 focus:outline-none"
            required
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white h-20 rounded-xl font-bold active:scale-95"
            >
              이전 단계
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-20 rounded-xl font-bold active:scale-95">
              다음
            </button>
          </div>
        </form>
      )}

      {/* 3단계: 최종 확인 */}
      {step === 3 && (
        <div className="w-full max-w-xl flex flex-col gap-8 text-2xl">
          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="mb-2"><span className="font-semibold">은행</span> : {bank}</p>
            <p className="mb-2"><span className="font-semibold">계좌</span> : {formatAccount(account)}</p>
            <p className="mb-2"><span className="font-semibold">금액</span> : {Number(amount.replace(/,/g, '')).toLocaleString()}원</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white h-20 rounded-xl font-bold active:scale-95"
            >
              이전 단계
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white h-20 rounded-xl font-bold active:scale-95"
            >
              송금하기
            </button>
          </div>
        </div>
      )}

      {/* 하단 취소 버튼 */}
      <button
        onClick={resetAll}
        className="mt-10 text-lg text-red-600 underline"
      >
        ❌ 취소하고 처음부터
      </button>
    </div>
  );
};

export default RemittancePractice;
