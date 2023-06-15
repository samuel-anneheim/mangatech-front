import { useEffect, useState } from "react";
import AuthorRepository from "../../api/services/AuthorRepository";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { tokens } from "../../theme";

export const Author = () => {
    const [authors, setAuthors] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        AuthorRepository.getAuthor().then(res => {
            setAuthors(res);
        });
    }, []);

    const truncate = (str: string, n: number) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    }

    const navigate = useNavigate();
    const navigateToAuthor = (slug: string) => {
        navigate(`/authors/${slug}`);
    }

    return (
        <Grid item xs={12} md={12} sm={12} sx={{ m: 1, mt: 5, ml: { md: 12 } }}>
            <h1 style={{ color: colors.orange[500], textAlign: "center" }}> Liste des auteurs</h1>
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
                    {authors?.map((author: any) => (
                        <Card
                            sx={{ maxWidth: 400, mt: 2, m: 1, cursor: 'pointer', backgroundColor: colors.primary[700] }}
                            key={author.id}
                            onClick={() => { navigateToAuthor(author.slug) }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    width="400"
                                    image={author.image}
                                />
                                <Box textAlign={"center"}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h3" sx={{ textAlign: "center" }}>
                                            {author.name} {author.surname}
                                        </Typography>
                                    </CardContent>
                                    <Typography
                                        sx={{ color: colors.orange[500] }}
                                        >
                                        Cliquez pour plus d'informations
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Author;