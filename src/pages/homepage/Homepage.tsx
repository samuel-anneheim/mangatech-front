import { Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { tokens } from "../../theme";
import MyCarousel from "../../components/MyCarousel";
import LoadingElement from "../../components/LoadingElement";

export const Homepage = (props: any) => {
  const [newestList, setNewestList] = React.useState([]);
  const [popularCollectionList, setPopularCollectionList] = React.useState([]);
  const [categoryCollectionList, setCategoryCollectionList] =
    React.useState<any>([]);

  const [loadingFinished, setloadingFinished] = React.useState(false);
  const limitResultsForCarrousel = 30;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Récupération des datas pour la catégorie "Nouveautés"
  const getNewestListData = async () => {
    return await axiosInstance
      .get(`/volume/newest`)
      .then((response) => {
        setNewestList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Récupération des datas pour la catégorie "Nouveautés"
  const getPopularListData = async () => {
    return await axiosInstance
      .get(`/volume/popular`)
      .then((response) => {
        setPopularCollectionList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getVolumeCategoryList = async () => {
    const formated: any = [];
    await axiosInstance.get(`/category/collections`).then(async (response) => {
      const category = response.data;
      category?.map((e: any) => {
        e.collections = e.collections.slice(0, limitResultsForCarrousel);
        formated.push(e);
      });
    });
    setCategoryCollectionList(formated);
  };

  useEffect(() => {
    getVolumeCategoryList();
    getNewestListData();
    getPopularListData();
    setloadingFinished(true);
  }, []);

  if (!loadingFinished) {
    return <LoadingElement />;
  }

  return (
    <Grid container p={2}>
      <Grid item xs={12} md={12} sx={{ mt: 1, borderRadius: 1 }}>
        <Box
          display={"block"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography color={colors.orange[500]} fontWeight={"bold"}>
            Les nouveaux tomes
          </Typography>
          <MyCarousel value={newestList} type="volume" />
          <Typography color={colors.orange[500]} fontWeight={"bold"} pt={2}>
            Les tomes les plus populaires
          </Typography>
          <MyCarousel value={popularCollectionList} type="volume" />
          {categoryCollectionList?.map((category: any) => {
            if (category.collections.length > 0) {
              return (
                <Box key={category?.id}>
                  <Typography
                    color={colors.orange[500]}
                    fontWeight={"bold"}
                    pt={2}
                  >
                    Collections: {category.name}
                  </Typography>
                  <MyCarousel value={category.collections} type="collection" />
                </Box>
              );
            }
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Homepage;
