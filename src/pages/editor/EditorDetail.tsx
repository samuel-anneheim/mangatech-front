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
import EditorRepository from "../../api/services/EditorRepository";
import { tokens } from "../../theme";

export const EditorDetail = () => {
  const [editorDetail, setEditorDetail] = useState<any>({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    EditorRepository.getOneEditor(slug ? slug : undefined).then((res) => {
      setEditorDetail(res);
    });
  }, []);

  return (
    <Grid item container>
      {/* Affichage de la photo */}
      <Grid item xs={12} md={4} sm={12} sx={{ mt: 5, m: 1 }}>
        <Box
          component="img"
          src={editorDetail?.logo}
          alt={editorDetail?.name}
          sx={{
            height: "50vh",
            width: "100%",
            objectFit: "cover",
          }}
        ></Box>
      </Grid>

      {/* Affichage du détail de l'éditeur */}
      <Grid item xs={12} md={6} sm={12} sx={{ mt: 5, m: 1, ml: { md: 12 } }}>
        <Box>
          <Typography
            variant="h1"
            style={{ color: colors.orange[500] }}
            sx={{ textAlign: "justify" }}
          >
            {editorDetail?.name}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            <span style={{ color: colors.orange[500] }}>
              Description : &nbsp;
            </span>
            {editorDetail?.description}
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "justify" }}>
            <span style={{ color: colors.orange[500] }}>
              Site officiel : &nbsp;
            </span>
            {editorDetail?.officialWebsite}
          </Typography>
        </Box>
      </Grid>

      {/* Affichage de la collection de l'auteur */}
      <Grid item xs={12} md={12} sm={12} sx={{ mt: 5, ml: { md: 12 }, m: 1 }}>
        <Typography
          variant="h1"
          style={{ color: colors.orange[500], textAlign: "center" }}
        >
          Ses Collections
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
            {editorDetail.collections?.map((collection: any) => (
              <Card
                sx={{ maxWidth: 250, mt: 2, ml: 3, mb: 3, backgroundColor: colors.primary[700], }}
                key={collection.id}
                onClick={() => {
                  navigate(`/collection/${collection.slug}`);
                }}
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

export default EditorDetail;
