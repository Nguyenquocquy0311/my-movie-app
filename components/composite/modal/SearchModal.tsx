import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Input } from "@mui/material";
import { useSearchModal } from "../../../context/SearchContext";
import { useDarkMode } from "../../../context/darkModeContext";
import classNames from "classnames";
import { SearchOutlined } from "@mui/icons-material";
import { Film } from "@/types/film";
import { useFilmContext } from "@/context/FilmContext";
import { useRouter } from "next/router";

const SearchModal = () => {
  const { open, setOpen } = useSearchModal();

  const { darkMode } = useDarkMode();
  const { setCurrentFilm } = useFilmContext();

  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Film[]>([]);
  const router = useRouter()

  const handleClose = () => {
    setOpen(false);
  };

  const doSearch = async (keyword: string) => {
    // const resp = await axios.get<Page<Film>>(
    //   "http://localhost:8080/api/movie/get",
    //   { params: { keyword } }
    // );
    // setSearchResult(resp.data.content);
    if (keyword.trim() === "") {
      setSearchResult([]);
      return;
    }

    const result = filmJson.filter((film) =>
      film.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResult(result);
  };

  useEffect(() => {
    if (keyword.trim() !== "") {
      doSearch(keyword);
    }
  }, [keyword]);

  const handleFilmClick = (film: Film) => {
    setCurrentFilm(film);
    router.push('/movie');
    setOpen(false);
  };

  const filmJson = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      image:
        "https://cdn1.tuoitre.vn/zoom/600_315/2020/7/21/inception-1595315649039828132546-crop-1598421344900180505336.jpg",
      subImage:
        "https://cdn1.tuoitre.vn/zoom/600_315/2020/7/21/inception-1595315649039828132546-crop-1598421344900180505336.jpg",
      url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      id: 2,
      title: "The Matrix",
      director: "The Wachowskis",
      year: 1999,
      image:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/05/the-matrix-code-keanu-reeves.jpeg",
      subImage:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/05/the-matrix-code-keanu-reeves.jpeg",
      url: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      id: 3,
      title: "Hoang Hau Ki",
      director: "The Wachowskis",
      year: 2013,
      image:
        "https://cafebiz.cafebizcdn.vn/zoom/700_438/2019/photo1555246024808-1555246025460-crop-15552460986802135216582.jpg",
      subImage:
        "https://cafebiz.cafebizcdn.vn/zoom/700_438/2019/photo1555246024808-1555246025460-crop-15552460986802135216582.jpg",
      url: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      type: "phim-bo",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/91kFYg4fX3L._RI_.jpg",
      subImage:
        "https://images-na.ssl-images-amazon.com/images/I/91kFYg4fX3L._RI_.jpg",
      url: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: 2008,
      image:
        "https://genk.mediacdn.vn/2018/7/23/photo-10-1532311789675586538196.jpeg",
      subImage:
        "https://genk.mediacdn.vn/2018/7/23/photo-10-1532311789675586538196.jpeg",
      url: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: 1994,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9TJ99tG3oNIHyTlQ4cbEu-6Z4wEaFd3yOA&s",
      subImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9TJ99tG3oNIHyTlQ4cbEu-6Z4wEaFd3yOA&s",
      url: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      type: "phim-le",
    },
    {
      title: "Fight Club",
      director: "David Fincher",
      year: 1999,
      image:
        "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
      url: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Avengers: Endgame",
      director: "Anthony and Joe Russo",
      year: 2019,
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      url: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      type: "tv-show",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      year: 1994,
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      url: "https://www.youtube.com/watch?v=bLvqoHBptjg",
      type: "tv-show",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Shawshank Redemption",
      director: "Frank Darabont",
      year: 1994,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      url: "https://www.youtube.com/watch?v=6hB3S9bIaco",
      type: "tv-show",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: 1972,
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      url: "https://www.youtube.com/watch?v=sY1S34973zA",
      type: "phim-bo",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      director: "Peter Jackson",
      year: 2001,
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/small_image/600x314/a134659ca47b28f7b266e1777fbf870f/1/2/1252477_fellowship.jpg",
      subImage:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/small_image/600x314/a134659ca47b28f7b266e1777fbf870f/1/2/1252477_fellowship.jpg",
      url: "https://www.youtube.com/watch?v=V75dMMIW2B4",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Star Wars: Episode IV - A New Hope",
      director: "George Lucas",
      year: 1977,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
      url: "https://www.youtube.com/watch?v=1g3_CFmnU7k",
      type: "phim-le",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "My Neighbor Totoro",
      director: "Hayao Miyazaki",
      year: 1988,
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie%29.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie%29.jpg",
      url: "https://www.youtube.com/watch?v=92a7Hj0ijLs",
      type: "anime",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Spirited Away",
      director: "Hayao Miyazaki",
      year: 2001,
      image:
        "https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.JPG",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.JPG",
      url: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
      type: "anime",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Your Name",
      director: "Makoto Shinkai",
      year: 2016,
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
      url: "https://www.youtube.com/watch?v=xU47nhruN-Q",
      type: "anime",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Attack on Titan",
      director: "Tetsurō Araki",
      year: 2013,
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/70/Attack_on_Titan_first_volume_cover.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/7/70/Attack_on_Titan_first_volume_cover.jpg",
      url: "https://www.youtube.com/watch?v=MGRm4IzK1SQ",
      type: "anime",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
    {
      title: "Naruto",
      director: "Hayato Date",
      year: 2002,
      image:
        "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
      subImage:
        "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
      url: "https://www.youtube.com/watch?v=JkG5u9h_Kr8",
      type: "anime",
      desc: "Upgraded 2024 là một bộ phim hài lãng mạn đầy sáng tạo, đã được phát hành trên Amazon Prime Video vào ngày 9 tháng 2 năm 2024. Câu chuyện xoay quanh cuộc sống của Ana, một cô gái trẻ đầy tham vọng và mơ ước về một sự nghiệp trong lĩnh vực nghệ thuật. Trong quá trình cố gắng để gây ấn tượng với sếp khó tính của mình, Claire, Ana đã vô tình gặp Will, một chàng trai lịch lãm và quyến rũ. Một sự nhầm lẫn nhỏ đã khiến Ana trở thành sếp của mình. Với lời nói dối này, cuộc sống của cô bắt đầu thay đổi hoàn toàn. Ana và Will dần trở nên thân thiết và tình cảm giữa họ nảy nở. Tuy nhiên, những rắc rối và tình huống dở khóc dở cười không ngừng xảy ra khi Ana phải duy trì lời nói dối của mình để không bị phát hiện.",
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent className={classNames(darkMode && "bg-slate-800", "flex")}>
        <Input
          value={keyword}
          placeholder="Tìm kiếm phim ..."
          fullWidth
          className={classNames("font-bold", darkMode && "text-white")}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <SearchOutlined
          className={classNames(
            "ml-4 cursor-pointer hover:text-slate-500",
            darkMode && "text-white"
          )}
        />
      </DialogContent>
      {keyword.trim() !== "" && (
        <ul
          className={classNames("p-4", darkMode && "bg-slate-700 text-white")}
        >
          {searchResult.map((film) => (
            <li key={film.id} className="hover:bg-slate-400 cursor-pointer" onClick={() => handleFilmClick(film)}>
              {film.title}
            </li>
          ))}
        </ul>
      )}
    </Dialog>
  );
};

export default SearchModal;
