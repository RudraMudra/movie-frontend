import {Box} from "@mui/material";
import {SwiperSlide} from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.Configs";
import NavigationSwiper from "./NavigationSwiper";

const BackdropSlide = ({backdrops}) => {
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0,10).map((backdrop, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            backgroundPosition: "top",
            backgroundSize: "cover",
            }}>
            <img
              src={tmdbConfigs.backdropPath(backdrop.file_path)}
              alt={backdrop.file_path}
              style={{width: "100%"}}
            />
          </Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;