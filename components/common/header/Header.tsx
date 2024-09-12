import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {
  DarkModeOutlined,
  LightMode,
  Login,
  Logout,
  SearchOutlined,
  WorkspacePremium,
} from "@mui/icons-material";
import { useFilmType } from "../../../context/filmTypeContext";
import { useDarkMode } from "../../../context/darkModeContext";
import { useSearchModal } from "../../../context/SearchContext";
import Auth from "@/context/AuthContext";

const Header = () => {
  const { logout } = Auth.useContainer();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const { setFilmType } = useFilmType();
  const { open, setOpen } = useSearchModal();
  const [userInfo, setUserInfo] = useState<{
    email?: string;
    displayName?: string;
    photoURL?: string;
  } | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("user-info");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    handleMenuClose();
  };

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
              isActive === "movie" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("movie")}
          >
            Movie
          </div>
          <div
            className={classNames(
              "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
              darkMode && "hover:text-black",
              isActive === "tv" && "bg-slate-300 text-black"
            )}
            onClick={() => handleClickType("tv")}
          >
            TV SHOW
          </div>
        </div>
        <div className={classNames("flex")}>
          <Tooltip title='Tìm kiếm phim'>
            <SearchOutlined
              className={classNames(
                open && 'opacity-50',
                'my-auto cursor-pointer hover:opacity-65'
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

        {!userInfo ?<Tooltip
          title={'Đăng nhập'}
          className="cursor-pointer my-auto"
          onClick={() => router.push("/login")}
        >
          <Login />
        </Tooltip>
           : <Avatar src={userInfo.photoURL || ""} className="my-auto cursor-pointer" onClick={handleMenuClick}/>}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
        className="mt-2 text-center"
      >
        <MenuItem>
          <Avatar src={userInfo?.photoURL} sizes="small" /><p className="mx-2 font-bold">{userInfo?.displayName}</p>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">{userInfo?.email}</Typography>
        </MenuItem>
        <MenuItem>
          <WorkspacePremium/><Typography variant="body2" className="mx-2">Tài khoản fan cứng</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
