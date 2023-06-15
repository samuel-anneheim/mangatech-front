import AuthorRepository from "../../api/services/AuthorRepository";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";

export const AuthorDetail = () => {
  const [authorDetail, setAuthorDetail] = useState<any>({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    AuthorRepository.getOneAuthor(slug ? slug : undefined).then((res) => {
      setAuthorDetail(res);
    });
  }, []);

  return (
    <Grid item container>
      {/* Affichage de la photo */}
      <Grid item xs={12} md={4} sm={12} sx={{ mt: 5, m: 1 }}>
        <Box
          component="img"
          src={authorDetail?.image}
          alt={authorDetail?.name}
          sx={{
            height: "50vh",
            width: "100%",
            objectFit: "cover",
          }}
        ></Box>
      </Grid>

      {/* Affichage du détail de l'auteur */}
      <Grid item xs={12} md={6} sm={12} sx={{ mt: 5, m: 1, ml: { md: 12 } }}>
        <Box>
          <Typography
            variant="h2"
            style={{ color: colors.orange[500], textAlign: "center" }}
          >
            {authorDetail?.name} {authorDetail?.surname}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            <span style={{ color: colors.orange[500] }}>
              Biographie : &nbsp;
            </span>
            {authorDetail?.biography}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            <span style={{ color: colors.orange[500] }}>
              Date de naissance : &nbsp;
            </span>
            {authorDetail?.dateOfBirth}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            <span style={{ color: colors.orange[500] }}>Genre : &nbsp;</span>
            {authorDetail?.gender}
          </Typography>
        </Box>
      </Grid>

      {/* Affichage de la collection de l'auteur */}
      <Grid item xs={12} md={12} sm={12} sx={{ m: 1, mt: 5, ml: { md: 12 } }}>
        <Typography
          variant="h2"
          style={{ color: colors.orange[500], textAlign: "center" }}
        >
          Ses Oeuvres
        </Typography>
        <Grid item xs={12} md={4} sx={{ display: "contents" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 3,
            }}
          >
            {authorDetail.collections?.map((collection: any) => (
              <Card
                sx={{ maxWidth: 250, mt: 2, ml: 3, mb: 3, backgroundColor: colors.primary[700], }}
                key={collection.id}
                onClick={() =>{
                    navigate(
                      `/collection/${collection.slug}`
                    );
                  }
                }
              >
                <CardActionArea>
                  <CardMedia
                    sx={{
                      maxHeight: { xs: 200, md: 300 },
                      height: { xs: 200, md: 300 },
                    }}
                    component="img"
                    image={collection.image}
                    title={collection.title}
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
                      {collection.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorDetail;
