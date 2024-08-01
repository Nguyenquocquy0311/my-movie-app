import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  DarkModeOutlined,
  LightMode,
  SearchOutlined,
  Login,
} from "@mui/icons-material";
import { useFilmType } from "../../../context/filmTypeContext";
import { useDarkMode } from "../../../context/darkModeContext";
import { useSearchModal } from "../../../context/SearchContext";
import axios from "axios";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const [filmTypes, setFilmTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const { setFilmType } = useFilmType();
  const { open, setOpen } = useSearchModal();

  // Fetch film types from API
  useEffect(() => {
    const fetchFilmTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/types");

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setFilmTypes(response.data); // Set film types from API response
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching film types:", error);
      }
    };

    fetchFilmTypes();
  }, []);

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

  const handleClickType = async (type: string) => {
    try {
      if (router.pathname !== "/") {
        router.push("/");
      }

      setIsActive(type);
      setFilmType(type);

      // Fetch films by type
      const response = await axios.get("http://localhost:8080/api/type/get", {
        params: { typeId: type },
      });

      // Process the films data as needed
      console.log(response.data); // Display the films data in the console
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  // Define the list of types you want to display
  const displayTypes = [
    { id: 4, name: "Phim Bí Ẩn" },
    { id: 5, name: "Phim Kinh Dị" },
    { id: 6, name: "Phim Hành Động" },
    { id: 7, name: "Phim Võ Thuật" },
  ];

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
          {displayTypes.map((type) => (
            <div
              key={type.id}
              className={classNames(
                "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
                darkMode && "hover:text-black",
                isActive === type.id && "bg-slate-300 text-black"
              )}
              onClick={() => handleClickType(type.id)}
            >
              {type.name}
            </div>
          ))}
        </div>
        <div className={classNames("flex")}>
          <div
            className={classNames(
              "my-auto p-3 rounded-md cursor-pointer border-none hover:border-none hover:bg-slate-300"
            )}
            onClick={() => setOpen(true)}
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

        <Tooltip title={"Đăng nhập"} className="cursor-pointer my-auto">
          <Login />
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
