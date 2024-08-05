import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  DarkModeOutlined,
  LightMode,
  SearchOutlined,
} from "@mui/icons-material";
import { useFilmType } from "../../../context/filmTypeContext";
import { useDarkMode } from "../../../context/darkModeContext";
import { useSearchModal } from "../../../context/SearchContext";
import { useDonateModal } from "@/context/DonateContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const { setFilmType } = useFilmType();
  const { setOpen } = useSearchModal();
  const { setOpenDonate } = useDonateModal()
  const [userInfo, setUserInfo] = useState<string | null>(null);

  const handleDarkTheme = () => {
    toggleDarkMode();
  };

  const goToHome = () => {
    if (router.pathname !== "/") {
      router.push("/");
    } else {
      setIsActive(null);
      setFilmType(null);
    }
  };

  const handleClickType = (type: string) => {
    if (router.pathname !== "/") {
      router.push("/");
    }

    setIsActive(type);
    setFilmType(type);
  };

  const handleOpenSearchModal = () => {
    setOpen(true);
  };

  const handleOpenDonate = () => {
    setOpenDonate(true);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = window.localStorage.getItem("user-info");
      setUserInfo(storedUserInfo);
    }
  }, []);

  return (
    <div
      className={classNames(
        "h-20 shadow-xl px-16 flex items-center justify-between fixed w-full z-50",
        darkMode ? "bg-slate-900 text-white" : "bg-white"
      )}
    >
      <div className="cursor-pointer" onClick={goToHome}>
        <img
          src="https://movie-web-two-jade.vercel.app/img/logo.a124619a.png"
          alt="Logo"
          className="h-24"
        />
      </div>
      <div className="flex justify-end space-x-5">
        <div className="flex space-x-4">
          <div
            className={classNames(
              "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
              darkMode && "hover:text-black",
              isActive === "phim-bo" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("phim-bo")}
          >
            Phim bộ
          </div>
          <div
            className={classNames(
              "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
              darkMode && "hover:text-black",
              isActive === "phim-le" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("phim-le")}
          >
            Phim lẻ
          </div>
          <div
            className={classNames(
              "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
              darkMode && "hover:text-black",
              isActive === "anime" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("anime")}
          >
            Anime
          </div>
          <div
            className={classNames(
              "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
              darkMode && "hover:text-black",
              isActive === "tv-show" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("tv-show")}
          >
            TV Show
          </div>
        </div>
        <div className={classNames("flex")}>
          <Tooltip title={'Tìm kiếm phim'}>
            <SearchOutlined
              className={classNames(
                 'hover:opacity-60 my-auto cursor-pointer'
              )}
              onClick={handleOpenSearchModal}
            />
          </Tooltip>
        </div>
        <Tooltip
          title={darkMode ? "Tắt chế độ tối" : "Bật chế độ tối"}
          className="cursor-pointer my-auto hover:text-slate-500"
          onClick={handleDarkTheme}
        >
          {!darkMode ? <DarkModeOutlined /> : <LightMode />}
        </Tooltip>

        <Tooltip
          title={userInfo ? userInfo : "Đăng nhập"}
          className="cursor-pointer my-auto"
          onClick={() => router.push("/login")}
        >
          {userInfo == null ? <button className={classNames(darkMode ? 'bg-slate-200 text-slate-800' : 'bg-blue-600 text-white', 'px-5 py-2 font-bold rounded-3xl')}>Đăng nhập</button> : <Avatar />}
        </Tooltip>
        <div className="relative group my-auto" onClick={handleOpenDonate}>
          <p className="hover:opacity-50 cursor-pointer font-bold">Đóng góp</p>
          <div className={classNames(darkMode ? 'bg-slate-700' : 'bg-gray-200', "absolute hidden group-hover:block p-4 rounded-lg shadow-lg left-5 top-full transform translate-x-[-50%] w-52 h-auto mt-4")}>
            <div className="text-center">
              <p className={classNames(darkMode ? 'text-white' : 'text-slate-800', "mb-2 text-sm font-semibold")}>Ủng hộ chúng tôi tại đây</p>
              <img
                src="https://qrcode-gen.com/images/qrcode-default.png"
                alt="QR Code"
                loading="lazy"
                className="rounded-md w-32 h-32 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
