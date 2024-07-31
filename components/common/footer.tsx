import React from 'react';
import classNames from 'classnames';
import { Facebook, Twitter, Instagram, YouTube, ExpandLess } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Footer = () => {
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
    return (
        <div className={classNames('h-auto', 'bg-slate-900 text-white')}>
            <div className='px-20 py-10'>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='max-w-[480px]'>
                            <div className='text-2xl font-bold'>PTIT-movie.app</div>
                            <p className='mt-2 text-[14px] text-slate-400'>
                                <span className='font-bold text-blue-300'>PTIT-movie</span> - Trang xem phim Online với giao diện mới được bố trí và thiết kế thân thiện với người dùng. Nguồn phim được tổng hợp từ các website lớn với đa dạng các đầu phim và thể loại vô cùng phong phú.
                            </p>
                        </div>
                    </div>
                    <div className='w-1/2 flex space-x-6'>
                        <div className='w-1/3'>
                            <div className='text-xl font-bold'>Phim mới</div>
                            <ul className='mt-2 text-[14px]'>
                                <li className='text-slate-500'>Phim Khoa Học</li>
                                <li className='text-slate-500'>Phim Kinh Dị</li>
                                <li className='text-slate-500'>Phim Chiếu Rạp</li>
                                <li className='text-slate-500'>Phim Hình Sự</li>
                                <li className='text-slate-500'>Phim Hành Động</li>
                            </ul>
                        </div>
                        <div className='w-1/3'>
                            <div className='text-xl font-bold'>Phim hay</div>
                            <ul className='mt-2 text-[14px]'>
                                <li className='text-slate-500'>Phim Âu Mỹ</li>
                                <li className='text-slate-500'>Phim Hàn Quốc</li>
                                <li className='text-slate-500'>Phim Trung Quốc</li>
                                <li className='text-slate-500'>Phim Nhật Bản</li>
                                <li className='text-slate-500'>Phim Thái Lan</li>
                            </ul>
                        </div>
                        <div className='w-1/3'>
                        <div className='text-xl font-bold'>Thông tin</div>
                        <ul className='mt-2 text-[14px]'>
                            <li className='text-slate-500'><a href='/policy'>Giới thiệu</a></li>
                            <li className='text-slate-500'>Liên hệ chúng tôi</li>
                            <li className='text-slate-500'>Điều khoản sử dụng</li>
                            <li className='text-slate-500'>Chính sách riêng tư</li>
                        </ul>
                    </div>
                    </div>
                </div>

                <div className='mt-6 flex justify-between border-t border-slate-700 pt-4'>
                    <div className='w-full'>
                        © Phimmoi
                    </div>
                    <div className='flex space-x-8 justify-center'>
                        <Facebook className='hover:text-blue-500 cursor-pointer' />
                        <Twitter className='hover:text-blue-300 cursor-pointer' />
                        <Instagram className='hover:text-pink-500 cursor-pointer' />
                        <YouTube className='hover:text-red-500 cursor-pointer' />
                        <Tooltip title='Lên đầu trang' onClick={scrollToTop} className=''>
                            <ExpandLess className='hover:bg-slate-500 cursor-pointer rounded-md'/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
