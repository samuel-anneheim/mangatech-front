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

export const EditPassword = () => {
    const { user, setUser, jwt } = React.useContext(UserContext);
    const [isIdentical, setIsIdentical] = React.useState<boolean>(false);
    const [isPasswordHasError, setIsPasswordHasError] = React.useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>("");

    React.useEffect(() => {
        UserRepository.getUserData(jwt).then(res => {
            setUser(res);
        })
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/);
        const password = data.get('password');
        const passwordBis = data.get('passwordBis');

        //controles mot de passe
        const isPasswordValidated = passReg.test(password as string)
        const isPasswordBisValidated = passReg.test(passwordBis as string)
        if (password === '' || passwordBis === '') {
            setPasswordErrorMessage("Le champ 'mot de passe' doit etre renseigné")
            setIsPasswordHasError(true)
        }
        else if (!isPasswordValidated || !isPasswordBisValidated) {
            setPasswordErrorMessage("Le mot de passe n'est pas valide, il doit etre composé de : 6 caracteres minimum, une majuscule , une minuscule , un caractères special , un chiffre")
            setIsPasswordHasError(true)
        }

        if (isPasswordValidated || isPasswordBisValidated) {
            if (password === passwordBis) {
                setIsPasswordHasError(false);
                setIsIdentical(true);
                UserRepository.updatePassword(data, jwt).then(res => {
                    setUser({ ...user, ...data } as UserType);
                    setTimeout(() => {
                        navigateToProfil();
                    }, 2000);
                })
            } else {
                setIsPasswordHasError(true);
                setPasswordErrorMessage('Les deux mot de passe doivent être identiques')
            }
        }

    };

    const navigate = useNavigate();
    const navigateToProfil = () => {
        navigate('/profil');
    };

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
                    {isIdentical ? (
                        <Alert severity="success">
                            Modification du mot de passe réussie,
                            <strong>
                                Vous allez être redirigé
                            </strong>
                        </Alert>
                    ) : null}
                    <TextField
                        error={isPasswordHasError}
                        helperText={isPasswordHasError ? passwordErrorMessage : ""}
                        required
                        type='password'
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Nouveau mot de passe"
                        name="password"
                        autoComplete="password"
                        autoFocus
                    />
                    <TextField
                        error={isPasswordHasError}
                        helperText={isPasswordHasError ? passwordErrorMessage : ""}
                        required
                        type='password'
                        margin="normal"
                        fullWidth
                        id="passwordBis"
                        label="Saississez à nouveau le mot de passe"
                        name="passwordBis"
                        autoComplete="passwordBis"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#fc9002", ":hover": { bgcolor: "#ffbf4d" } }}
                    >
                        Modifier le mot de passe
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
    )
}

export default EditPassword;

