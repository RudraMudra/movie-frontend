import {Box} from "@mui/material";
import {SwiperSlide} from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.Configs";
import AutoSwiper from "./AutoSwiper";

const PosterSlide = ({posters}) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0,10).map((poster, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            }}>
            <img
              src={tmdbConfigs.backdropPath(poster.file_path)}
              alt={poster.file_path}
              style={{width: "100%"}}
            />
          </Box>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;