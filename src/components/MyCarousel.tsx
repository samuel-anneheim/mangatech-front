import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../index.css";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";

const MyCarousel = ({ value, type }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const responsive ={
    1400: {
      slidesPerView: 6,
      slidesPerGroup: 2,
    },
    1150: {
      slidesPerView: 4,
      slidesPerGroup: 2,
    },
    650: {
      slidesPerView: 3,
      slidesPerGroup: 2,
    },
    0: {
      slidesPerView: 2,
    },
  };

  return (
    <Box>
      <Swiper
        slidesPerView={6}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={responsive}
        navigation={true}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        {value.map((manga: any, i: number) => (
          <SwiperSlide key={i}>
          <Card
          key={i}
          sx={{
            maxWidth: { xs: 140, md: 190 },
            maxHeight: { xs: 250, md: 350 },
            width: { xs: 140, md: 190 },
            mt: 2,
            ml: 3,
            backgroundColor: colors.primary[700],
          }}
          onClick={() => {
            type == "volume"
            ? navigate(
              `/${manga.edition.collection.slug}/${manga.edition.slug}/${manga.number}`
              )
              : navigate(`/collection/${manga.slug}`);
            }}
            >
            <CardActionArea>
              <CardMedia
                sx={{
                  maxHeight: { xs: 200, md: 300 },
                  height: { xs: 200, md: 300 },
                }}
                component="img"
                image={manga.image}
                title={manga.title}
                />
              <CardContent
                style={{
                  maxHeight: 30,
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                >
                <Typography
                  gutterBottom
                  noWrap
                  color={{ color: colors.primary[200] }}
                  >
                  {manga.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MyCarousel;
