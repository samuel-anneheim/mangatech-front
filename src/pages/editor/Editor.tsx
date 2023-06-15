import { useEffect, useState } from "react";
import EditorRepository from "../../api/services/EditorRepository";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { tokens } from "../../theme";

export const Editor = () => {

    const [editors, setEditors] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        EditorRepository.getEditor().then(res => {
            setEditors(res);
        });
    }, []);

    const truncate = (str: string, n: number) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    }

    const navigate = useNavigate();
    const navigateToEditor = (slug: string) => {
        navigate(`/editors/${slug}`);
    }

    return (
        <Grid item xs={12} md={12} sm={12} sx={{ m: 1, mt: 5, ml: { md: 12 } }}>
                <h1 style={{ color: "#fc9002" }}>Liste des éditeurs</h1>
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
                    {editors?.map((editor: any) => (
                        <Card
                            sx={{ maxWidth: 400, mt: 2, m: 1, cursor: 'pointer', backgroundColor: colors.primary[700] }}
                            key={editor.id}
                            onClick={() => { navigateToEditor(editor.slug) }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    width="300"
                                    image={editor.logo}
                                />
                                <Box textAlign={"center"}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h3" sx={{ textAlign: "center" }}>
                                            {editor.name}
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

export default Editor;