import {
    Badge,
    Box,
    Divider,
    Grid,
    Typography,
    useTheme
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import UserRepository from "../../api/services/UserRepository";
import { tokens } from "../../theme";
import Volume from "../../components/Volume/Volume";

export const MyCollection = () => {
    const { user, setUser, jwt } = useContext(UserContext);
    const [library, setLibrary] = useState<any>([]);
    const [volume, setVolume] = useState<any>([]);
    const [edition, setEdition] = useState<any>([]);
    const [collection, setCollection] = useState<any>([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        UserRepository.getUserData(jwt).then(res => {
            const volumeFormated: any[] = [];
            const editionFormated: any[] = [];
            const collectionFormated: any[] = [];

            setUser(res);
            setLibrary(res?.libraries);

            if (res?.libraries) {
                res?.libraries.forEach((element: any) => {
                    volumeFormated.push(element.volume);
                });
            }
            if (volumeFormated) {
                volumeFormated.forEach((element: any) => {
                    if (!editionFormated.some(e => e.id === element.edition.id)) {
                        editionFormated.push(element.edition);
                    }
                });
            }
            if (editionFormated) {
                editionFormated.forEach((element: any) => {
                    if (!collectionFormated.some(e => e.id === element.collection.id)) {
                        collectionFormated.push(element.collection)
                    }
                })
            }
            setVolume(volumeFormated);
            setEdition(editionFormated);
            setCollection(collectionFormated);
        })
    }, [])

    return (
        <Grid container p={2}>
            <Grid item xs={12} md={12} sx={{ mt: 1, borderRadius: 1 }}>
                <h1 style={{ color: "#fc9002" }}>Ma collection</h1>
                {collection?.map((collect: any) => (
                    <Box key={collect.id}>
                        <Typography
                            variant="h1"
                            mt={2}
                            style={{ color: colors.orange[500] }}
                        >
                            {collect.title}
                        </Typography>
                        {edition?.map((editionElement: any) => {
                            if (editionElement.collectionId === collect.id) {
                                return (
                                    <Box
                                        key={editionElement.id}>
                                        <Divider textAlign="left" sx={{ color: colors.orange[500], width: "100%" }}>
                                            {editionElement.name}
                                        </Divider>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                justifyContent: "start",
                                                alignContent: "center",
                                            }}
                                        >
                                            {volume?.map((vol: any) => {
                                                if (vol.editionId === editionElement.id) {
                                                    return (
                                                        <Box key={vol.id}>
                                                            {library?.map((lib: any) => {
                                                                if ((lib.volumeId === vol.id) && lib.isRead) {
                                                                    return (
                                                                        <Box key={lib.id}>
                                                                            <Badge
                                                                                badgeContent="Lu"
                                                                                color="error"
                                                                                overlap="circular"
                                                                                anchorOrigin={{
                                                                                    vertical: 'top',
                                                                                    horizontal: 'left',
                                                                                }}>
                                                                                <Volume
                                                                                    mangas={vol}
                                                                                    edition={editionElement}
                                                                                    collection={collect} />
                                                                            </Badge>
                                                                        </Box>
                                                                    )
                                                                } else if((lib.volumeId === vol.id) && !lib.isRead) {
                                                                    return (
                                                                        <Box key={vol.id}>
                                                                        <Volume
                                                                        mangas={vol}
                                                                        edition={editionElement}
                                                                        collection={collect} />
                                                                        </Box>
                                                                    )
                                                                }
                                                            })}
                                                        </Box>
                                                    )
                                                }
                                            })}
                                        </Box>
                                    </Box>
                                )
                            }
                        })}
                    </Box>
                ))}
            </Grid>
        </Grid>
    )
}

export default MyCollection;