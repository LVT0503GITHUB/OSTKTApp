'use client';
import { FaUser, FaAngleDown } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TS from '@/app/components/TS'; // hoặc đúng path của bạn


// Danh sách menu chính và submenu tương ứng
const menuWithSub = [
    {
        title: "QUẢN LÝ VÉ",
        submenus: ["Nhập CODESIGN", "Download vé VN", "Update đối tượng từ Booker Nhập",
            "Xem công nợ Đại Lý", "Booker Nhập", "Chính sách CK", "Bảng khai báo CK chi tiết"],
    },
    {
        title: "NHẬP VÉ",
        submenus: ["Doanh thu vé", "Doanh số hãng"],
    },
    {
        title: "DANH MỤC",
        submenus: ["Khách hàng", "Hãng hàng Không", "NV Kinh Doanh", "Tai khoản", "Vật tư, Sản phẩm, Hàng hoá",
            "Kho", "Khoản mục", "Bộ phận", "Vụ việc", "TSCĐ - CPTT"],
    },
    {
        title: "THU CHI",
        submenus: ["Phiếu thu tiền mặt", "Phiếu chi tiền mặt", "Phiếu thu tiền ngân hàng", "Phiếu chi tiền ngân hàng"],
    },
    {
        title: "KHO",
        submenus: ["Nhập mua hàng hoá", "Nhập khẩu", "Nhập hàng trả lại", "Nhập kho thành phẩm", "Nhập khác",
            "Xuất kho vật tư hàng hoá", "Xuất sản xuất", "Xuất kho trung tâm ra quầy", "Lập định mức"],
    },
    {
        title: "HÓA ĐƠN",
        submenus: ["Hóa đơn bán hàng", "Hóa đơn dịch vụ vé", "Hóa đơn dịch vụ vé - Xuất huỷ",
            "Hoá đơn dịch vụ mua vào", "Hoá đơn dịch vụ bán ra"],
    },
    {
        title: "TỔNG HỢP",
        submenus: ["Hạch toán tổng hợp", "Hạch toán khác", "Số dư công nợ đầu kỳ", "Số dư vật tư đầu kỳ", "Số dư tài khoản đầu kỳ"],
    },
    {
        title: "CUỐI THÁNG",
        submenus: ["Chuyển dữ liệu vé sang kế toán", "Phân bổ CPTT", "Khấu hao TSCĐ", "Kết chuyển PBCP",
            "Kết chuyển xác định KQKD", "Tính giá vốn"],
    },
    {
        title: "TÌM KIẾM",
        submenus: [],
    },
    {
        title: "BÁO CÁO",
        submenus: [],
    },
    {
        title: "PHÂN QUYỀN",
        submenus: [],
    },
];

export default function MainPage() {
    const router = useRouter(); // ✅ hook đặt ở top-level
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null); // Lưu menu đang được click
    const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);

    const menuRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        if (activeMenuIndex !== null && menuRefs.current[activeMenuIndex]) {
            const rect = menuRefs.current[activeMenuIndex]!.getBoundingClientRect();
            setDropdownPosition({
                x: rect.left,
                y: rect.bottom,
            });
        } else {
            setDropdownPosition(null);
        }
    }, [activeMenuIndex]);

const handleSubMenuClick = (mainTitle: string, subTitle: string, index: number) => {
// const handleMainMenuClick = (menuTitle: string, index: number) => {
  setSelectedMenuIndex(index);
  //console.log("Bạn vừa click submenu:", subTitle, "thuộc menu:", mainTitle);

  switch (mainTitle.toUpperCase()) {
    case "QUẢN LÝ VÉ":
    case "NHẬP VÉ":
    case "THU CHI":
    case "KHO": 
    case "HÓA ĐƠN":
    case "TỔNG HỢP":
        console.log(`Thực hiện 0000 /screen/${mainTitle.toLowerCase()} -> ${subTitle.toLowerCase()}`);
        // router.push(`/screen/${mainTitle.toLowerCase()}`);
        router.push(`/screen/phieu_thu`);
        break;
    case "DANH MỤC":
      router.push('/danhmuc');
      break;
    case "TÌM KIẾM":
      alert("Đang thực hiện, vui lòng quay lại sau ...... ");
      console.log("Thực hiện bbb");
      // router.push("/tim-kiem");
      break;
    case "SỔ SÁCH":
      alert("Đang thực hiện, vui lòng quay lại sau ...... ");
      // router.push("/so-sach");
      break;
    default:
      // Nếu có submenu thì mở dropdown
      alert("Đang thực hiện, vui lòng quay lại sau ...... ");
      break;
    //   const hasSubmenu = menuWithSub[index].submenus.length > 0;
    //   if (hasSubmenu) {
    //     setActiveMenuIndex(index);
    //   } else {
    //     setActiveMenuIndex(null);
    //   }
    //     router.push(`/screen/phieu_thu`);
  }
};


    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm z-50 relative">
                <div className="flex items-center space-x-4">
                    <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
                    <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
                </div>
                <div className="flex items-center space-x-2 text-blue-900">
                    <FaUser className="text-lg" />
                    <span className="text-sm">admin</span>
                </div>
            </div>

            {/* Navbar */}
            <nav className="bg-white border-b shadow-sm relative z-50">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <ul className="flex justify-between text-sm font-medium text-blue-900 py-3">
                        {menuWithSub.map((menu, index) => (
                            <li
                                key={index}
                                ref={(el) => { menuRefs.current[index] = el; }}
                                className={`
            relative cursor-pointer px-4 py-1 rounded-md transition-all duration-150
            ${selectedMenuIndex === index ? "bg-blue-800 text-white" : ""}
            hover:bg-blue-100 hover:text-blue-900
          `}
                                onMouseEnter={() => {
                                    if (menu.submenus.length > 0) {
                                        setActiveMenuIndex(index);
                                    }
                                }}
                                onMouseLeave={() => setActiveMenuIndex(null)}
                                onClick={() => setSelectedMenuIndex(index)}
                            >
                                <div className="flex items-center gap-1">
                                    {menu.title}
                                    {menu.submenus.length > 0 && (
                                        <FaAngleDown className="text-xs mt-[2px]" />
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Nội dung chính */}
            <div className="p-6 relative z-10">
                <div className="text-center text-blue-900 text-lg">
                    Chào mừng bạn đến với hệ thống!
                </div>
            </div>

            {/* Dropdown menu gắn ngoài, vị trí fixed */}
            {activeMenuIndex !== null && dropdownPosition && menuWithSub[activeMenuIndex].submenus.length > 0 && (
                <ul
                    className="fixed bg-white border rounded shadow-md min-w-[180px] py-1 z-[9999]"
                    style={{
                        top: dropdownPosition.y,
                        left: dropdownPosition.x,
                    }}
                    onMouseEnter={() => setActiveMenuIndex(activeMenuIndex)}
                    onMouseLeave={() => setActiveMenuIndex(null)}
                >
                    {menuWithSub[activeMenuIndex].submenus.map((sub, i) => (
                        <li
                            key={i}
                            className="px-4 py-[10px] text-[15px] whitespace-nowrap cursor-pointer text-blue-900 hover:bg-blue-700 hover:text-white transition-colors"
                            // onClick={() => handleMainMenuClick(sub, i)}
                            onClick={() => handleSubMenuClick(menuWithSub[activeMenuIndex].title, sub, i)}
                            // onClick={() => {
                            // //     //alert(`/screen/${sub.toLowerCase()}`);
                            // //     // Điều hướng sang trang screen/[sub]
                            // //     // router.push(`/screen/${sub.toLowerCase()}`);
                            // //     router.push(`/screen/phieu_thu`);
                            // // router.push('/danhmuc');
                            // //     // Tùy chọn thêm xử lý khi click submenu tại đây
                            // //     //console.log(`Click submenu: ${sub}`);
                            // }}
                        >
                            {sub}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
