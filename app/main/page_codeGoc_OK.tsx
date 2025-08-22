// npm install react-router-dom@6.23.1 react-router@6.23.1
// npm install @mui/material@^6.4.4 @mui/icons-material@^6.4.4 @mui/x-date-pickers@^7.26.0

// code chỗ này nằm trong main chính hiện ra data table - kết hợp TS.tsx và makeData.tsx
// import { StrictMode } from 'react';
// import ReactDOM from 'react-dom/client';
// import Example from './TS';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <StrictMode>
//     <Example />
//   </StrictMode>,
// );


'use client';
import { FaUser, FaAngleDown } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
                            onClick={() => {
                                //alert(`/screen/${sub.toLowerCase()}`);
                                // Điều hướng sang trang screen/[sub]
                                // router.push(`/screen/${sub.toLowerCase()}`);
                                router.push(`/screen/phieu_thu`);
                                // Tùy chọn thêm xử lý khi click submenu tại đây
                                //console.log(`Click submenu: ${sub}`);
                            }}
                        >
                            {sub}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


// 'use client';

// import { FaUser, FaAngleDown } from "react-icons/fa";
// import { useMemo, useRef, useState, useEffect } from "react";

// const mainMenus = [
//     "QUẢN LÝ VÉ",
//     "NHẬP VÉ",
//     "DANH MỤC",
//     "THU CHI",
//     "KHO",
//     "HÓA ĐƠN",
//     "TỔNG HỢP",
//     "CUỐI THÁNG",
//     "TÌM KIẾM",
//     "BÁO CÁO",
//     "PHÂN QUYỀN",
// ];

// const generateSubMenus = (count: number) => {
//     return Array.from({ length: count }, (_, i) => `Mục ${i + 1}`);
// };

// export default function MainPage() {
//     const menuWithSub = useMemo(() => {
//         return mainMenus.map((menu) => {
//             const randomCount = Math.floor(Math.random() * 4) + 2;
//             return {
//                 title: menu,
//                 submenus: generateSubMenus(randomCount),
//             };
//         });
//     }, []);

//     const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
//     const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);

//     // ref mảng cho các <li> menu cha
//     const menuRefs = useRef<(HTMLLIElement | null)[]>([]);

//     useEffect(() => {
//         if (activeMenuIndex !== null && menuRefs.current[activeMenuIndex]) {
//             const rect = menuRefs.current[activeMenuIndex]!.getBoundingClientRect();
//             setDropdownPosition({
//                 x: rect.left,
//                 y: rect.bottom,
//             });
//         } else {
//             setDropdownPosition(null);
//         }
//     }, [activeMenuIndex]);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans relative">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm z-50 relative">
//                 <div className="flex items-center space-x-4">
//                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
//                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
//                 </div>
//                 <div className="flex items-center space-x-2 text-blue-900">
//                     <FaUser className="text-lg" />
//                     <span className="text-sm">admin</span>
//                 </div>
//             </div>

//             {/* Navbar */}
//             <nav className="bg-white border-b shadow-sm relative z-50">
//                 <div className="overflow-x-auto overflow-y-hidden w-full">
//                     <ul className="flex text-sm font-medium text-blue-900 py-3 px-4 min-w-max whitespace-nowrap">
//                         {menuWithSub.map((menu, index) => (
//                             <li
//                                 key={index}
//                                 ref={(el) => { menuRefs.current[index] = el; }}
//                                 className={`relative cursor-pointer px-4 ${activeMenuIndex === index ? "bg-blue-700 text-white" : ""}`}
//                                 onMouseEnter={() => setActiveMenuIndex(index)}
//                                 onMouseLeave={() => setActiveMenuIndex(null)}
//                             >
//                                 <div className="flex items-center gap-1 py-1">
//                                     {menu.title}
//                                     <FaAngleDown className="text-xs mt-[2px]" />
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </nav>

//             {/* Nội dung chính */}
//             <div className="p-6 relative z-10">
//                 <div className="text-center text-blue-900 text-lg">
//                     Chào mừng bạn đến với hệ thống!
//                 </div>
//             </div>

//             {/* Dropdown menu gắn ngoài, vị trí fixed, không bị che */}
//             {activeMenuIndex !== null && dropdownPosition && (
//                 <ul
//                     className="fixed bg-white border rounded shadow-md min-w-[160px] pt-0 pb-0 z-[9999]"
//                     style={{
//                         top: dropdownPosition.y,
//                         left: dropdownPosition.x,
//                     }}
//                     onMouseEnter={() => setActiveMenuIndex(activeMenuIndex)}
//                     onMouseLeave={() => setActiveMenuIndex(null)}
//                 >
//                     {menuWithSub[activeMenuIndex].submenus.map((sub, i) => (
//                         <li
//                             key={i}
//                             className="px-4 py-2 text-sm whitespace-nowrap cursor-pointer text-blue-900 hover:bg-blue-700 hover:text-white"
//                         >
//                             {sub}
//                         </li>
//                     ))}
//                 </ul>

//             )}
//         </div>
//     );
// }


// 'use client';

// import { FaUser, FaAngleDown } from "react-icons/fa";
// import { useMemo } from "react";

// const mainMenus = [
//     "QUẢN LÝ VÉ",
//     "NHẬP VÉ",
//     "DANH MỤC",
//     "THU CHI",
//     "KHO",
//     "HÓA ĐƠN",
//     "TỔNG HỢP",
//     "CUỐI THÁNG",
//     "TÌM KIẾM",
//     "BÁO CÁO",
//     "PHÂN QUYỀN"
// ];

// const generateSubMenus = (count: number) => {
//     return Array.from({ length: count }, (_, i) => `Mục ${i + 1}`);
// };

// export default function MainPage() {
//     const menuWithSub = useMemo(() => {
//         return mainMenus.map(menu => {
//             const randomCount = Math.floor(Math.random() * 6) + 3; // 3-8 mục
//             return {
//                 title: menu,
//                 submenus: generateSubMenus(randomCount)
//             };
//         });
//     }, []);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
//                 <div className="flex items-center space-x-4">
//                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
//                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
//                 </div>
//                 <div className="flex items-center space-x-2 text-blue-900">
//                     <FaUser className="text-lg" />
//                     <span className="text-sm">admin</span>
//                 </div>
//             </div>

//             {/* Navbar */}
//             <nav className="bg-white border-b shadow-sm">
//                 <ul className="flex justify-center flex-wrap space-x-8 text-sm font-medium text-blue-900 py-3 relative z-10">
//                     {menuWithSub.map((menu, index) => (
//                         <li
//                             key={index}
//                             className="relative group cursor-pointer"
//                             // Thêm hiệu ứng khi hover vào menu cha
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.classList.add('bg-blue-100', 'text-blue-700');
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.classList.remove('bg-blue-100', 'text-blue-700');
//                             }}
//                         >
//                             <div className="flex items-center gap-1">
//                                 {menu.title}
//                                 <FaAngleDown className="text-xs mt-[2px]" />
//                             </div>
//                             {/* Dropdown */}
//                             <ul
//                                 className="absolute top-[calc(100%+4px)] left-0 bg-white border rounded shadow-md opacity-0
//                                     group-hover:opacity-100 group-hover:translate-y-0
//                                     transition-all duration-200 ease-in-out min-w-[160px] py-2 z-20"
//                             >
//                                 {menu.submenus.map((sub, i) => (
//                                     <li
//                                         key={i}
//                                         className="px-4 py-2 text-sm whitespace-nowrap cursor-pointer"
//                                         onMouseEnter={(e) => {
//                                             // Tô màu cho menu cha
//                                             const parentLi = e.currentTarget.closest('li.group');
//                                             if (parentLi) parentLi.classList.add('bg-blue-100', 'text-blue-700');
//                                             // Tô màu cho mục con
//                                             e.currentTarget.classList.add('bg-blue-700', 'text-white');
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             const parentLi = e.currentTarget.closest('li.group');
//                                             if (parentLi) parentLi.classList.remove('bg-blue-100', 'text-blue-700');
//                                             e.currentTarget.classList.remove('bg-blue-700', 'text-white');
//                                         }}
//                                     >
//                                         {sub}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {/* Nội dung chính */}
//             <div className="p-6">
//                 <div className="text-center text-blue-900 text-lg">
//                     Chào mừng bạn đến với hệ thống!
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { FaUser, FaAngleDown } from "react-icons/fa";
// import { useMemo } from "react";

// const mainMenus = [
//     "QUẢN LÝ VÉ",
//     "NHẬP VÉ",
//     "DANH MỤC",
//     "THU CHI",
//     "KHO",
//     "HÓA ĐƠN",
//     "TỔNG HỢP",
//     "CUỐI THÁNG",
//     "TÌM KIẾM",
//     "BÁO CÁO",
//     "PHÂN QUYỀN"
// ];

// const generateSubMenus = (count: number) => {
//     return Array.from({ length: count }, (_, i) => `Mục ${i + 1}`);
// };

// export default function MainPage() {
//     const menuWithSub = useMemo(() => {
//         return mainMenus.map(menu => {
//             const randomCount = Math.floor(Math.random() * 6) + 3; // 3-8 mục
//             return {
//                 title: menu,
//                 submenus: generateSubMenus(randomCount)
//             };
//         });
//     }, []);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
//                 <div className="flex items-center space-x-4">
//                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
//                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
//                 </div>
//                 <div className="flex items-center space-x-2 text-blue-900">
//                     <FaUser className="text-lg" />
//                     <span className="text-sm">admin</span>
//                 </div>
//             </div>

//             {/* Navbar */}
//             <nav className="bg-white border-b shadow-sm">
//                 <ul className="flex justify-center flex-wrap space-x-8 text-sm font-medium text-blue-900 py-3 relative z-10">
//                     {menuWithSub.map((menu, index) => (
//                         <li
//                             key={index}
//                             className="relative group cursor-pointer"
//                         >
//                             <div className="flex items-center gap-1 group-hover:text-blue-700">
//                                 {menu.title}
//                                 <FaAngleDown className="text-xs mt-[2px]" />
//                             </div>
//                             {/* Dropdown */}
//                             <ul
//                                 className="absolute top-[calc(100%+4px)] left-0 bg-white border rounded shadow-md opacity-0
//                                     group-hover:opacity-100 group-hover:translate-y-0
//                                     transition-all duration-200 ease-in-out min-w-[160px] py-2 z-20"
//                             >
//                                 {menu.submenus.map((sub, i) => (
//                                     <li
//                                         key={i}
//                                         className="px-4 py-2 text-sm whitespace-nowrap
//                                             hover:bg-blue-100 hover:text-blue-700
//                                             group-hover:text-blue-700"
//                                     >
//                                         {sub}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {/* Nội dung chính */}
//             <div className="p-6">
//                 <div className="text-center text-blue-900 text-lg">
//                     Chào mừng bạn đến với hệ thống!
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { FaUser, FaAngleDown } from "react-icons/fa";
// import { useMemo } from "react";

// // Danh sách menu chính
// const mainMenus = [
//     "QUẢN LÝ VÉ",
//     "NHẬP VÉ",
//     "DANH MỤC",
//     "THU CHI",
//     "KHO",
//     "HÓA ĐƠN",
//     "TỔNG HỢP",
//     "CUỐI THÁNG",
//     "TÌM KIẾM",
//     "BÁO CÁO",
//     "PHÂN QUYỀN"
// ];

// // Hàm tạo mảng submenu ngẫu nhiên
// const generateSubMenus = (count: number) => {
//     return Array.from({ length: count }, (_, i) => `Mục ${i + 1}`);
// };

// export default function MainPage() {
//     // Tạo submenu ngẫu nhiên cho mỗi menu chính (memo để không random lại mỗi lần render)
//     const menuWithSub = useMemo(() => {
//         return mainMenus.map(menu => {
//             const randomCount = Math.floor(Math.random() * 6) + 3; // Từ 3 đến 8
//             return {
//                 title: menu,
//                 submenus: generateSubMenus(randomCount)
//             };
//         });
//     }, []);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
//                 <div className="flex items-center space-x-4">
//                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
//                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
//                 </div>
//                 <div className="flex items-center space-x-2 text-blue-900">
//                     <FaUser className="text-lg" />
//                     <span className="text-sm">admin</span>
//                 </div>
//             </div>

//             {/* Navbar */}
//             <nav className="bg-white border-b shadow-sm">
//                 <ul className="flex justify-center flex-wrap space-x-8 text-sm font-medium text-blue-900 py-3 relative z-10">
//                     {menuWithSub.map((menu, index) => (
//                         <li key={index} className="relative group cursor-pointer">
//                             <div className="flex items-center gap-1 hover:text-blue-700">
//                                 {menu.title}
//                                 <FaAngleDown className="text-xs mt-[2px]" />
//                             </div>
//                             {/* Dropdown */}
//                             <ul className="absolute top-full left-0 bg-white border rounded shadow-md mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out min-w-[160px] py-2 z-20">
//                                 {menu.submenus.map((sub, i) => (
//                                     <li
//                                         key={i}
//                                         className="px-4 py-2 text-sm hover:bg-blue-100 whitespace-nowrap"
//                                     >
//                                         {sub}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {/* Nội dung chính */}
//             <div className="p-6">
//                 <div className="text-center text-blue-900 text-lg">
//                     Chào mừng bạn đến với hệ thống!
//                 </div>
//             </div>
//         </div>
//     );
// }

// // 'use client';

// // import { FaUser } from "react-icons/fa";
// // import { FaAngleDown } from "react-icons/fa"; // Biểu tượng sổ xuống đẹp hơn

// // export default function MainPage() {
// //     return (
// //         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans">
// //             {/* Header */}
// //             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
// //                 <div className="flex items-center space-x-4">
// //                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
// //                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
// //                 </div>
// //                 <div className="flex items-center space-x-2 text-blue-900">
// //                     <FaUser className="text-lg" />
// //                     <span className="text-sm">admin</span>
// //                 </div>
// //             </div>

// //             {/* Navbar */}
// //             <nav className="bg-white border-b">
// //                 <ul className="flex justify-center flex-wrap space-x-8 text-[15px] font-medium text-blue-900 py-4">
// //                     {[
// //                         "QUẢN LÝ VÉ",
// //                         "NHẬP VÉ",
// //                         "DANH MỤC",
// //                         "THU CHI",
// //                         "KHO",
// //                         "HÓA ĐƠN",
// //                         "TỔNG HỢP",
// //                         "CUỐI THÁNG",
// //                         "TÌM KIẾM",
// //                         "BÁO CÁO",
// //                         "PHÂN QUYỀN"
// //                     ].map((item, index) => (
// //                         <li key={index} className="cursor-pointer hover:text-blue-700 flex items-center gap-1">
// //                             {item}
// //                             {index < 8 && <FaAngleDown className="text-xs" />} {/* Sổ xuống chỉ cho các menu chính */}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </nav>

// //             {/* Nội dung chính */}
// //             <div className="p-6">
// //                 <div className="text-center text-blue-900 text-lg">
// //                     Chào mừng bạn đến với hệ thống!
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// // import { FaUser } from "react-icons/fa";

// // export default function MainPage() {
// //     return (
// //         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
// //             {/* Header */}
// //             <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
// //                 <div className="flex items-center space-x-4">
// //                     <img src="/logo_giaiphap.svg" alt="Logo" className="w-12 h-12" />
// //                     <h1 className="text-xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h1>
// //                 </div>
// //                 <div className="flex items-center space-x-2 text-blue-900">
// //                     <FaUser className="text-lg" />
// //                     <span className="text-sm">admin</span>
// //                 </div>
// //             </div>

// //             {/* Navbar */}
// //             <nav className="bg-white border-b px-6">
// //                 <ul className="flex flex-wrap space-x-6 text-sm font-medium text-blue-900 py-3">
// //                     <li className="cursor-pointer hover:text-blue-700">QUẢN LÝ VÉ ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">NHẬP VÉ ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">DANH MỤC ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">THU CHI ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">KHO ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">HÓA ĐƠN ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">TỔNG HỢP ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">CUỐI THÁNG ▼</li>
// //                     <li className="cursor-pointer hover:text-blue-700">TÌM KIẾM</li>
// //                     <li className="cursor-pointer hover:text-blue-700">BÁO CÁO</li>
// //                     <li className="cursor-pointer hover:text-blue-700">PHÂN QUYỀN</li>
// //                 </ul>
// //             </nav>

// //             {/* Nội dung chính */}
// //             <div className="p-6">
// //                 <div className="text-center text-blue-900 text-lg">
// //                     Chào mừng bạn đến với hệ thống!
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
