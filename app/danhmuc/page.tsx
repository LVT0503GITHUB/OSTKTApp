'use client';
import TS from '@/app/components/TS';

export default function TSPage() {
  const handleClose = () => {
    // xử lý gì đó khi đóng, hoặc để trống nếu không cần
    console.log("Đóng TS");
  };

  return <TS onClose={handleClose} />;
}