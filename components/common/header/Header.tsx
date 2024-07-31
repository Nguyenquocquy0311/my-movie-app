import React, { useState } from "react";
import classNames from "classnames";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  DarkMode,
  DarkModeOutlined,
  LightMode,
  Login,
  SearchOutlined,
} from "@mui/icons-material";
import { useFilmType } from "../../../context/filmTypeContext";
import { useDarkMode } from "../../../context/darkModeContext";
import { useSearchModal } from "../../../context/SearchContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const { setFilmType } = useFilmType();
  const { open, setOpen } = useSearchModal();

  const handleDarkTheme = () => {
    toggleDarkMode();
  };

  const goToHome = () => {
    if (router.pathname !== "/") {
      router.push("/");
    } else {
      window.location.reload();
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

  return (
    <div
      className={classNames(
        "h-20 shadow-lg px-16 flex items-center justify-between fixed w-full z-50",
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
          <div
            className={classNames(
              "my-auto p-3 rounded-md cursor-pointer border-none hover:border-none hover:bg-slate-300"
            )}
            onClick={handleOpenSearchModal}
          >
            <SearchOutlined
              className={classNames(
                darkMode ? "text-white hover:text-black" : "text-black"
              )}
            />
          </div>
        </div>
        <Tooltip
          title={darkMode ? "Tắt chế độ tối" : "Bật chế độ tối"}
          className="cursor-pointer my-auto"
          onClick={handleDarkTheme}
        >
          {!darkMode ? <DarkModeOutlined /> : <LightMode />}
        </Tooltip>
                
        <Tooltip
          title={'Đăng nhập'}
          className="cursor-pointer my-auto"
          // onClick={}  
        >
        {/* {} ? <Login/> : <Avatar/> */}
        <Login />
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
