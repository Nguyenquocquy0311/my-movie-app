import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getDarkMode } from '@/slices/redux';
import { Instagram, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
    const isDarkMode = useSelector(getDarkMode);

    return (
        <div className={classNames('h-auto','bg-slate-900 text-white')}>
            <div className={classNames('flex px-10 items-center justify-between h-28')}>
                <div className='text-[24px] font-bold'>NextJS Movie app PRO</div>
                <div className='flex items-center space-x-4'>
                    <ul className='flex space-x-6 mx-6'>
                        <li className='flex items-center'>Contact Us</li>
                        <li className='flex items-center'>About Us</li>
                    </ul>
                    <div className='flex space-x-5'>
                        <Instagram className='hover:text-slate-500 cursor-pointer' />
                        <Twitter className='hover:text-slate-500 cursor-pointer' />
                        <YouTube className='hover:text-slate-500 cursor-pointer' />
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center border-t-[0.1px] border-t-slate-500 h-24 px-5 w-[150vh] mx-auto'>
                ©Copyright 2024 My-movie-app.com. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
