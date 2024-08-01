import React, { useState, useEffect } from "react";
import { useFilmContext } from "../../context/FilmContext";
import Header from "../common/header/Header";
import Footer from "../common/Footer";
import classNames from "classnames";
import { useDarkMode } from "../../context/darkModeContext";
import { Avatar, Breadcrumbs, Link, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  AccountBox,
  AccountCircle,
  Home,
  Movie,
  PlayCircleOutline,
} from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import { current } from "immer";

interface Feedback {
  movieId: number,
  vote: number,
  comment: string | null;
}

export default function WatchMoviePage() {
  const router = useRouter();
  // const { currentFilm } = useFilmContext();
  const { darkMode } = useDarkMode();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [valueVote, setValueVote] = useState(0);
  const [currentFilm, setCurrentFilm] = useState();

  useEffect(() => {
    if (!router.query.id) return;

    const fetchFeedback = async () => {
      try {
        const response = await axios.get<Feedback[]>(
          "http://localhost:8080/api/feedback/get",
          {
            params: {
              filmId: router.query.id,
            },
          }
        );
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [router.query.id]);

  useEffect(() => {
    if (!router.query.id) return;

    const fetchFilm = async () => {
      try {
        const response = await axios.get<Feedback[]>(
          "http://localhost:8080/api/movie/getById",
          {
            params: { id: router.query.id },
          }
        );
        console.log(response.data);
        setCurrentFilm(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFilm();
  }, [router.query.id]);

  const videoId = currentFilm?.url
    ? new URL(currentFilm?.url).searchParams.get("v")
    : null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const handleSendFeedback = async () => {
    if (commentInput.trim() !== "" || valueVote > 0) {
      const newFeedback: Feedback = {
        movieId: currentFilm.id,
        vote: valueVote,
        comment: commentInput || null,
      };
      try {
        await axios.post("http://localhost:8080/api/feedback/add", newFeedback, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        setFeedback([...feedback, newFeedback]);
        setCommentInput("");
        setValueVote(0); // Reset the vote after sending
      } catch (error) {
        console.error("Error sending feedback:", error);
      }
    }
  };

  return (
    <div
      className={classNames(
        darkMode ? "bg-slate-800" : "bg-white",
        "min-h-screen"
      )}
    >
      <Header />
      <div className="pt-28 px-6 pb-4">
        <div className="pb-6 pt-2 mx-auto w-[1200px]">
          <Breadcrumbs
            aria-label="breadcrumb"
            className={classNames(
              darkMode ? "text-slate-100" : "text-slate-700"
            )}
          >
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <Home sx={{ mr: 0.5 }} />
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <Movie sx={{ mr: 0.5 }} />
              {currentFilm?.title}
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <PlayCircleOutline sx={{ mr: 0.5 }} />
              Xem phim
            </Link>
          </Breadcrumbs>
        </div>
        <iframe
          width="1200"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={currentFilm?.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mx-auto rounded-xl shadow-lg"
        />

        {/* mô tả phim */}
        <div className="mx-auto w-[1200px] p-6">
          <p
            className={classNames(
              "font-bold text-[20px] border-b-2 border-blue-300 pb-2",
              darkMode ? "text-blue-100" : "text-blue-400"
            )}
          >
            Tóm tắt
          </p>
          <p
            className={classNames(
              "text-[14px] leading-8 mt-4",
              darkMode ? "text-slate-300" : "text-slate-800"
            )}
          >
            {currentFilm?.description}
          </p>
        </div>

        {/* Feedback */}
        <div className="comment-by-fb mt-10 mx-24 p-6 rounded-lg shadow-md">
          <p
            className={classNames(
              "text-[20px] font-bold border-b-2 border-blue-300 pb-2",
              darkMode ? "text-blue-100" : "text-blue-400"
            )}
          >
            Feedback
          </p>

          <div className="mb-6">
            <div className="mt-4 space-y-4">
              {feedback.map((fb) => (
                <div
                  key={fb.id}
                  className={classNames(
                    "p-2 border-b-[0.2px] flex items-center space-x-2",
                    darkMode ? "text-blue-100" : "text-black"
                  )}
                >
                  <AccountCircle fontSize="medium" />
                  <Rating
                    name="read-only"
                    value={fb.vote}
                    readOnly
                    size="small"
                  />
                  <span className="ml-2">{fb.comment}</span>
                </div>
              ))}
            </div>

            {/* vote */}
            <div className="flex items-center mt-4 space-x-4">
              <p
                className={classNames(
                  darkMode ? "text-blue-200" : "text-blue-400",
                  "text-[16px]"
                )}
              >
                Đánh giá:
              </p>
              <Rating
                name="size-large"
                defaultValue={0}
                value={valueVote}
                onChange={(event, newValue) => {
                  setValueVote(newValue);
                }}
                emptyIcon={
                  <StarIcon
                    style={{ opacity: !darkMode ? 0.55 : 1 }}
                    fontSize="inherit"
                  />
                }
              />
            </div>

            {/* comment */}
            <div className="mt-4 flex items-center space-x-4">
              <AccountBox fontSize="large" />
              <input
                type="text"
                value={commentInput}
                onChange={handleInputChange}
                className={classNames(
                  "flex-1 p-1 border rounded",
                  darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
                )}
                placeholder="Thêm nhận xét ..."
              />
              <button
                onClick={handleSendFeedback}
                className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
