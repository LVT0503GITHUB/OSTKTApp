"use client";
import { useEffect, useState } from "react";
import ReceiptForm, { CommonField, DetailColumn } from "@/app/components/ReceiptForm";


export default function DemoThuChiPage() {
  const [commonFields, setCommonFields] = useState<CommonField[]>([]);
  const [detailCols, setDetailCols] = useState<DetailColumn[]>([]);

  useEffect(() => {
    fetch("/api/screen/phieu_thu")
      .then((res) => res.json())
      .then(({ screen, titbr }) => {
        // Map common fields
        const commons: CommonField[] = screen.common_fields.map((f: string) => {
          const meta = titbr.find((t: any) => t.field === f);
          return {
            key: f,
            label: meta?.caption || f,
            type: meta?.type || "text"
          };
        });

        // Map detail fields
        const details: DetailColumn[] = screen.detail_fields.map((f: string) => {
          const meta = titbr.find((t: any) => t.field === f);
          return {
            key: f,
            label: meta?.caption || f,
            type: meta?.type || "text",
            align: meta?.align || "left"
          };
        });

        setCommonFields(commons);
        setDetailCols(details);
      });
  }, []);

  if (!commonFields.length || !detailCols.length) {
    return <div className="p-4">Đang tải cấu hình...</div>;
  }

  return (
    // <div className="p-4 bg-[#eef3fb] min-h-screen">
    <div className="p-4 bg-[#f5f5f5]">
      <ReceiptForm
        title="PHIẾU THU TIỀN MẶT"
        commonFields={commonFields}
        commonColumns={3}
        detailsColumns={detailCols}
        initialRows={12}
        theme={{ brand: "GIẢI PHÁP TỐI ƯU" }}
      />
    </div>
  );
}
