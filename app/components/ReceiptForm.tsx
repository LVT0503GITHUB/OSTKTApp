"use client";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Printer,
  Save,
  Search,
  XCircle,
  PlusCircle,
  User2,
} from "lucide-react";
import { useRef, useState } from "react";
// import SearchModal from "@/app/components/DateSearchModal"; // 👈 import modal

import DateSearchModal from '@/app/components/DateSearchModal';
import Example from '@/app/components/TS'; // dynamic import nếu bạn dùng dynamic

export type CommonField = {
  key: string;
  label: string;
  type: string;
};

export type DetailColumn = {
  key: string;
  label: string;
  type: string;
  align?: "left" | "center" | "right";
};

interface ReceiptFormProps {
  title: string;
  commonFields: CommonField[];
  commonColumns: 1 | 2 | 3;
  detailsColumns: DetailColumn[];
  initialRows: number;
  theme: { brand: string };
}

const gridColsClass = (n: 1 | 2 | 3) =>
  n === 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : "grid-cols-3";

const labelCls =
  "shrink-0 w-[72px] text-[13px] text-[#022a59] font-medium leading-[18px]";
const inputCls =
  "h-7 w-full border border-[#cfd8e3] rounded-[3px] px-2 text-[13px] text-[#0b1f3a] focus:outline-none focus:ring-2 focus:ring-[#5b8bd6] focus:border-[#5b8bd6] placeholder:text-[#9aa7b8]";

const smallIconBtn =
  "h-7 w-7 inline-flex items-center justify-center rounded bg-[#2d6db1] text-white hover:bg-[#255d97] active:scale-[0.98] shadow-sm";

const toolBtn = (bg: string) =>
  `inline-flex items-center gap-2 h-7 px-3 rounded text-white text-[13px] ${bg} hover:brightness-110 active:scale-[0.98]`;

export default function ReceiptForm({
  title,
  commonFields,
  commonColumns,
  detailsColumns,
  initialRows,
  theme,
}: ReceiptFormProps) {
  const inputRefs = useRef<HTMLInputElement[][]>([]);
  const [showSearch, setShowSearch] = useState(false); // 👈 quản lý modal

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showExample, setShowExample] = useState(false);


  // gán ref cho từng input
  const registerRef = (r: number, c: number, el: HTMLInputElement | null) => {
    if (!inputRefs.current[r]) inputRefs.current[r] = [];
    if (el) inputRefs.current[r][c] = el;
  };

  // xử lý di chuyển bằng phím
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    r: number,
    c: number
  ) => {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
      e.preventDefault();
      let newR = r;
      let newC = c;

      if (e.key === "ArrowRight" || e.key === "Enter") {
        if (c < detailsColumns.length - 1) newC = c + 1;
        else {
          newC = 0;
          newR = r + 1;
        }
      } else if (e.key === "ArrowLeft") {
        if (c > 0) newC = c - 1;
        else if (r > 0) {
          newR = r - 1;
          newC = detailsColumns.length - 1;
        }
      } else if (e.key === "ArrowUp" && r > 0) newR = r - 1;
      else if (e.key === "ArrowDown" && r < inputRefs.current.length - 1)
        newR = r + 1;

      const nextInput = inputRefs.current[newR]?.[newC];
      if (nextInput) nextInput.focus();
    }
  };

  // chia commonFields thành `commonColumns - 1` cột trái, cột phải dành cho ĐVTT/Tỷ giá/Tk Nợ
  const makeColumns = (fields: CommonField[], cols: number) => {
    if (cols <= 1) return [fields];
    const leftCols = cols - 1;
    const perCol = Math.ceil(fields.length / leftCols);
    const res: CommonField[][] = Array.from({ length: cols }, (_, i) =>
      i < leftCols ? fields.slice(i * perCol, (i + 1) * perCol) : []
    );
    return res;
  };

  const columns = makeColumns(commonFields, commonColumns);

  const renderField = (f: CommonField) => (
    <div key={f.key} className="flex items-center gap-1">
      <label className={labelCls}>{f.label}</label>
      {f.type === "select" ? (
        <select className={`${inputCls} flex-1`}>
          <option>VND</option>
          <option>USD</option>
        </select>
      ) : (
        <input
          type={f.type === "date" ? "date" : "text"}
          className={`${inputCls} flex-1`}
          placeholder={f.label}
        />
      )}
    </div>
  );

  
  

  return (
    // <div className="flex flex-col h-screen bg-[#eef3fb] text-[13px] overflow-hidden">
    <div className="flex flex-col h-screen bg-[#f5f5f5] text-[13px] overflow-hidden">      
      
      {/* === Header === */}
      {/* <div className="flex items-center justify-between h-10 px-3 bg-[#3a6ea8] text-white shadow"> */}
      <div className="flex items-center justify-between h-10 px-3 bg-gradient-to-b from-[#bccef5] to-[#dbe6f5] text-white shadow">
        
        <div className="flex items-center gap-2">
          {/* <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#3a6ea8] font-bold">
            S
          </div> */}
          <div className="flex items-center gap-2 font-semibold text-[#1a4c94]">
            <img src="/logo_giaiphap.svg" alt="Logo" className="h-5 w-5" />
          </div>
          {/* <div className="font-semibold tracking-wide">GIẢI PHÁP TỐI ƯU</div> */}
          <div className="text-[#2f4fa0] text-lg font-bold uppercase tracking-wide">GIẢI PHÁP TỐI ƯU</div>
        </div>
        <div className="flex items-center gap-2 text-[#2f4fa0] font-bold">
          <User2 size={16} />
          <span>Admin</span>
        </div>
      </div>

      {/* === Sub title === */}
      <div className="h-8 flex items-center px-3 text-[#2f4fa0] font-bold ">
        {title}
      </div>

      {/* === Toolbar === */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border-y border-[#d9e2ef]">
        <div className="flex items-center gap-1">
          <button className={smallIconBtn} title="Đầu">
            <ChevronsLeft size={16} />
          </button>
          <button className={smallIconBtn} title="Lùi">
            <ChevronLeft size={16} />
          </button>
          <button className={smallIconBtn} title="Tiến">
            <ChevronRight size={16} />
          </button>
          <button className={smallIconBtn} title="Cuối">
            <ChevronsRight size={16} />
          </button>
          <button className={`${smallIconBtn} ml-2`} title="In ấn">
            <Printer size={16} />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <button className={toolBtn("bg-[#1aaa55]")}>
            <Save size={16} /> Lưu
          </button>
          <button
            className={toolBtn("bg-[#2f6fb1]")}
            // onClick={() => setShowSearch(true)} // 👈 mở modal
            onClick={() => setShowSearchModal(true)} // 👈 mở modal
          >
            <Search size={16} /> Tìm
          </button>
          <button className={toolBtn("bg-[#6b7280]")}>
            <XCircle size={16} /> Hủy
          </button>
          <button className={toolBtn("bg-[#2f6fb1]")}>
            <PlusCircle size={16} /> Mới
          </button>
        </div>
      </div>

      {/* === Thông tin chung === */}
      <div
        className={`grid ${gridColsClass(
          commonColumns
        )} gap-x-2 gap-y-1 px-3 py-2 bg-white border-b border-[#d9e2ef] items-start`}
        style={{ flex: "0 0 auto" }}
      >
        {columns.map((colFields, ci) => (
          <div
            key={ci}
            className={`flex flex-col gap-1 px-2 py-1 min-h-[64px] ${
              ci < columns.length - 1 ? "border-r border-[#e5eaf3]" : ""
            }`}
          >
            {ci === columns.length - 1 && (
              <>
                {/* ĐVTT + Tỷ giá */}
                <div className="grid grid-cols-4 gap-1 items-center">
                  <label className={labelCls}>ĐVTT</label>
                  <select className={`${inputCls}`}>
                    <option>VND</option>
                    <option>USD</option>
                  </select>
                  <label className={labelCls}>Tỷ giá</label>
                  <input defaultValue={1} className={inputCls} />
                </div>
                {/* Tk Nợ */}
                <div className="flex items-center gap-1">
                  <label className={labelCls}>Tk Nợ</label>
                  <input
                    defaultValue="1111"
                    className={`${inputCls} max-w-[120px]`}
                  />
                  <input
                    defaultValue="Tiền mặt"
                    className={`${inputCls} flex-1 bg-[#f5f7fa] text-[#6b7280]`}
                    readOnly
                  />
                </div>
              </>
            )}
            {colFields.map((f) => (
              <div key={f.key}>{renderField(f)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* === Chi tiết === */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-2">
            <button className={smallIconBtn} title="Thêm">
              <PlusCircle size={16} />
            </button>
            <button className={smallIconBtn} title="Lưu dòng">
              <Save size={16} />
            </button>
            <button className={smallIconBtn} title="In">
              <Printer size={16} />
            </button>
          </div>
          <div className="text-[#e11d48] font-semibold">
            <span className="mr-6">Tiền VNĐ:</span>
            <span className="mr-6">Tiền CK:</span>
            <span>Tổng tiền:</span>
          </div>
        </div>

        <div className="flex-1 mt-1 px-2 pb-2 overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="text-[#062b64]">
                {detailsColumns.map((col) => (
                  <th
                    key={col.key}
                    className={[
                      "border border-[#d9e2ef] px-2 py-[6px] font-semibold text-[13px] text-center",
                      col.key === "so_tien" ? "bg-[#feeaa5]" : "bg-[#e6eefc]",
                    ].join(" ")}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 100 }).map((_, r) => (
                <tr
                  key={r}
                  className="even:bg-[#fbfdff] hover:bg-[#f2f6ff] transition"
                >
                  {detailsColumns.map((col, c) => (
                    <td
                      key={`${r}-${col.key}`}
                      className="border border-[#e3eaf5] px-1"
                    >
                      <input
                        ref={(el) => registerRef(r, c, el)}
                        onKeyDown={(e) => handleKeyDown(e, r, c)}
                        className={[
                          "w-full h-7 px-2 rounded-[2px] border border-transparent focus:border-[#5b8bd6] focus:outline-none focus:bg-[#fff7e6]",
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                            ? "text-center"
                            : "text-left",
                        ].join(" ")}
                        placeholder={
                          col.key === "doi_tuong"
                            ? "Type mã or tên..."
                            : col.type === "date"
                            ? "dd/mm/yyyy"
                            : ""
                        }
                        type={
                          col.type === "date"
                            ? "text"
                            : col.type === "number"
                            ? "number"
                            : "text"
                        }
                        defaultValue={
                          col.key === "tk_co" && r === 0 ? "131" : undefined
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Modal tìm kiếm ===
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />} */}

      {/* Modal tìm kiếm */}
      {showSearchModal && (
        <DateSearchModal
          onClose={() => setShowSearchModal(false)}
          onSearch2={() => {
            setShowSearchModal(false);  // đóng modal
            setShowExample(true);       // mở Example
          }}
        />
      )}

      {/* Giao diện Example full màn hình */}
      {showExample && (
        <Example onClose={() => setShowExample(false)} />
      )}


    </div>
  );
}

