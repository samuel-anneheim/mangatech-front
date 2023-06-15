import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';;
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserRepository from '../../api/services/UserRepository';
import { UserContext } from '../../context/userContext';
import UserType from '../../schema/User.type';

export const EditProfil = () => {
    const { user, setUser, jwt } = React.useContext(UserContext);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>("");
    const [nameErrorMessage, setNameErrorMessage] = React.useState<string>("");
    const [surnameErrorMessage, setSurnameErrorMessage] = React.useState<string>("");
    const [pictureErrorMessage, setPictureErrorMessage] = React.useState<string>("");
    const [isEmailHasError, setIsEmailHasError] = React.useState<boolean>(false);
    const [isNameHasError, setIsNameHasError] = React.useState<boolean>(false);
    const [isSurnameHasError, setIsSurnameHasError] = React.useState<boolean>(false);
    const [isPictureHasError, setIsPictureHasError] = React.useState<boolean>(false);
    const [isUpdatedValidate, setIsUpdatedValidate] = React.useState<boolean>(false);

    const navigate = useNavigate();
    const navigateToProfil = () => {
        navigate('/profil');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') ? data.get('email') : "";
        const emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

        //controles Email
        const isEmailValidated = emailReg.test(email as string);
        if(email === ''){
          setEmailErrorMessage("Le champ email doit etre renseigné")
          setIsEmailHasError(true)
        }
        else if(!isEmailValidated){
          setEmailErrorMessage("L'email n'est pas valide")
          setIsEmailHasError(true)
        }

        if(isEmailValidated){
            if (!isEmailHasError) {
                setIsEmailHasError(false)
                setIsUpdatedValidate(true);
                UserRepository.updateData(data, jwt).then(res => {
                    setUser({ ...user, ...data } as UserType);
                    setTimeout(() => {
                        navigateToProfil();
                    }, 2000);
                })
            }
          
        }
    };

    React.useEffect(() => {
        UserRepository.getUserData(jwt).then(res => {
            setUser(res);
        })
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
                    {isUpdatedValidate ? (
                        <Alert severity="success">
                            Modification du profil réussie,
                            <strong>
                                Vous allez être redirigé
                            </strong>
                        </Alert>
                    ) : null}
                    <TextField
                        error={isPictureHasError}
                        helperText={isPictureHasError ? pictureErrorMessage : ""}
                        label="Avatar (URL)"
                        margin="normal"
                        fullWidth
                        id="picture"
                        name="picture"
                        value={user?.picture}
                        onChange={(e) => {
                            setUser({...user, picture: e.target.value} as UserType)
                        }}
                        autoComplete="picture"
                        autoFocus
                    />
                    <TextField
                        error={isNameHasError}
                        helperText={isNameHasError ? nameErrorMessage : ""}
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nom"
                        value={user?.name}
                        onChange={(e) => {
                            setUser({...user, name: e.target.value} as UserType)
                        }}
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        error={isSurnameHasError}
                        helperText={isSurnameHasError ? surnameErrorMessage : ""}
                        margin="normal"
                        fullWidth
                        label="Prénom"
                        id="surname"
                        value={user?.surname}
                        onChange={(e) => {
                            setUser({...user, surname: e.target.value} as UserType)
                        }}
                        name="surname"
                        autoComplete="surname"
                        autoFocus
                    />
                    <TextField
                        error={isEmailHasError}
                        helperText={isEmailHasError ? emailErrorMessage : ""}
                        margin="normal"
                        fullWidth
                        label="Email"
                        id="email"
                        value={user?.email}
                        onChange={(e) => {
                            setUser({...user, email: e.target.value} as UserType)
                        }}
                        name="email"
                        autoComplete="email"
                        type='email'
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#fc9002", ":hover": { bgcolor: "#ffbf4d" } }}
                    >
                        Modifier
                    </Button>
                    <Button
                        fullWidth
                        color="error"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#f4661b" } }}
                        onClick={navigateToProfil}
                    >
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default EditProfil;