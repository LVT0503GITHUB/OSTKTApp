"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';

// Dùng dynamic import để trì hoãn tải TS.tsx cho đến khi click  ****************************
const Example = dynamic(() => import('@/app/components/TS'), {
  ssr: false, // chỉ render phía client
  loading: () => <p>Đang tải...</p>,
});
// Dùng dynamic import để trì hoãn tải TS.tsx cho đến khi click  ****************************


// type DateSearchModalProps = {
//   onClose: () => void;
// };
type DateSearchModalProps = {
  onClose: () => void;
  onSearch2: () => void; // callback khi nhấn Tìm 2
};


// export default function DateSearchModal({ onClose }: DateSearchModalProps) {
export default function DateSearchModal({ onClose, onSearch2 }: DateSearchModalProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showExample, setShowExample] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 font-sans text-[13px]">
      <div className="bg-[#f2f4fc] rounded-[6px] border border-[#cfd8e3] w-[460px] shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between h-10 px-3 bg-gradient-to-b from-[#bccef5] to-[#dbe6f5] text-white rounded-t-[6px]">
          <div className="flex items-center gap-2 font-semibold text-[#1a4c94]">
            <img src="/logo_giaiphap.svg" alt="Logo" className="h-5 w-5" />
            <span>Nhập ngày</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#1a4c94] text-[16px] hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 pt-3 pb-2 bg-[#f2f4fc]">
          <div className="flex items-center gap-2">
            {/* Từ ngày */}
            <label className="text-gray-700 text-[13px]">Từ ngày</label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-[120px] h-[28px] border border-[#cfd8e3] rounded-[4px] px-2 pr-7 text-[13px] bg-white text-[#007bff] font-medium"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                📅
              </span>
            </div>

            {/* Đến ngày */}
            <label className="text-gray-700 text-[13px] ml-2">Đến ngày</label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-[120px] h-[28px] border border-[#cfd8e3] rounded-[4px] px-2 pr-7 text-[13px] bg-white text-[#007bff] font-medium"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                📅
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-2 bg-[#f2f4fc] border-t border-[#cfd8e3] rounded-b-[6px]">
          <button
            className="flex items-center gap-1 px-3 py-[5px] bg-[#3683d6] hover:bg-[#2d6db1] text-white text-sm rounded"
            // onClick={() => {
            //   console.log("Tìm từ:", fromDate, "đến:", toDate);
            //   onClose();
            // }}
            // onClick={() => {
            //   setShowExample(true); // Gọi hàm
            //   // onClose();            // Gọi hàm
            //   }
            // }
            onClick={onSearch2} // Gọi callback từ cha
          >
            🔍 Tìm
          </button>
          <button
            className="px-3 py-[5px] bg-[#e74c3c] hover:bg-[#c0392b] text-white text-sm rounded"
            onClick={onClose}
          >
            Thoát
          </button>
        </div>
      </div>
      
      {/* {showExample && <Example onClose={() => setShowExample(false)} />} */}
    </div>
  );
}
