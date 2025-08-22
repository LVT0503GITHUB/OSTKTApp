import { NextResponse } from "next/server";

// Demo: giả lập đọc từ DB
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    // Ví dụ dữ liệu giả lập
    const screen = {
        ma_man_hinh: "phieu_thu",
        common_fields: ["ngay", "chung_tu", "ong_ba", "but_toan"],
        detail_fields: ["chi_tiet", "ma_dt", "so_tien", "ngay_hd"],
        sum_fields: ["so_tien"]
    };

    const titbr = [
        { ma_man_hinh: "phieu_thu", field: "ngay", caption: "Ngày", type: "date" },
        { ma_man_hinh: "phieu_thu", field: "chung_tu", caption: "Chứng từ", type: "text" },
        { ma_man_hinh: "phieu_thu", field: "ong_ba", caption: "Ông bà", type: "text" },
        { ma_man_hinh: "phieu_thu", field: "but_toan", caption: "Bút toán", type: "text" },
        { ma_man_hinh: "phieu_thu", field: "chi_tiet", caption: "Chi tiết các khoản", type: "text" },
        { ma_man_hinh: "phieu_thu", field: "ma_dt", caption: "Mã ĐT", type: "text" },
        { ma_man_hinh: "phieu_thu", field: "so_tien", caption: "Số tiền", type: "number", align: "right" },
        { ma_man_hinh: "phieu_thu", field: "ngay_hd", caption: "Ngày HĐ", type: "date" }
    ];

    return NextResponse.json({ screen, titbr });
}
