import { Alert, Avatar, Box, Button, Collapse, Divider, Grid, IconButton, ListItem, ListItemText } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import UserRepository from "../../api/services/UserRepository";
import { UserContext } from "../../context/userContext";

/**
 * Composant qui affiche les informations du profil
 * @param props un utilisateur
 * @returns 
 */
export const Profil = () => {
    const { user, setUser, jwt, logout } = useContext(UserContext);
    const [alertDelete, setAlertDelete] = useState<boolean>(false);

    const navigate = useNavigate();
    const navigateToEditProfil = () => {
        navigate('/profil/edit');
    };
    const navigateToEditPassword = () => {
        navigate('/profil/edit/password');
    };

    useEffect(() => {
        UserRepository.getUserData(jwt).then(res => {
            setUser(res);
        })
    }, [])

    const handleDelete = () => {
        UserRepository.deleteUser(jwt).then(res => {
            logout;
            navigate('/');
        })
    }

    return (
        <Grid container spacing={2}>
            {/* Informations sur l'utilisateur */}
            <Grid item xs={12} sx={{ mt: 5, borderRadius: 1, height: "75vH", textAlign: "center" }}>
                <Collapse in={alertDelete}>
                    <Alert
                        severity="warning"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="warning"
                                size="small"
                                onClick={() => {
                                    setAlertDelete(false);
                                }}
                            ></IconButton>
                        }
                    >
                        <Box display="flex" alignItems="center">
                            <Box>
                                Voulez-vous supprimer votre compte définitivement ?
                            </Box>
                            <Box>
                                <Button
                                    onClick={() => {
                                        handleDelete(), setAlertDelete(false);
                                    }}
                                    color="secondary"
                                >
                                    Oui
                                </Button>
                                <Button
                                    onClick={() => setAlertDelete(false)}
                                    color="secondary"
                                    sx={{ m: "0px" }}
                                >
                                    Non
                                </Button>
                            </Box>
                        </Box>
                    </Alert>
                </Collapse>
                <Avatar
                    alt="Remy Sharp"
                    src={user?.picture}
                    variant="circular"
                    sx={{ width: 150, height: 150, mx: "auto", mt: 5, border: "1px solid #fc9002" }}
                />

                <Grid sx={{ display: "inline-block" }}>
                    <ListItem button divider sx={{ mt: 3, textAlign: "center" }}>
                        <AccountCircleIcon />
                        <ListItemText primary={user?.name ? user.name : 'Non renseigné'} />
                    </ListItem>
                    <ListItem button sx={{ textAlign: "center" }}>
                        <AccountCircleIcon />
                        <ListItemText primary={user?.surname ? user.surname : 'Non renseigné'} />
                    </ListItem>
                    <Divider light />
                    <ListItem button sx={{ textAlign: "center" }}>
                        <AlternateEmailIcon />
                        <ListItemText primary={user?.email} />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <Button sx={{ bgcolor: "#fc9002", ":hover": { bgcolor: "#ffbf4d" }, width: "100%" }} variant="contained" onClick={navigateToEditProfil}>
                            Modifier mon profil
                        </Button>
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <Button sx={{ bgcolor: "#fc9002", ":hover": { bgcolor: "#ffbf4d" }, width: "100%" }} variant="contained" onClick={navigateToEditPassword}>
                            Modifier mon mot de passe
                        </Button>
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <Button sx={{ width: "100%" }} variant="outlined" color="error" onClick={() => setAlertDelete(true)}>
                            Supprimer mon compte
                        </Button>
                    </ListItem>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Profil;
