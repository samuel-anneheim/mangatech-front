import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="#fc9002" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          MangaTech
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

export const Register = () => {
  const { register,setIsFromRegister,isFromRegister } = useContext(UserContext);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>("");
  const [isEmailHasError, setIsEmailHasError] = React.useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>("");
  const [isPasswordHasError, setIsPasswordHasError] = React.useState<boolean>(false);
  const [isSuccessRegister, setIsSuccessRegister] = React.useState<boolean>(false);
  const [isErrorRegister, setIsErrorRegister] = React.useState<boolean>(false);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsErrorRegister(false);
        event.preventDefault();

        const emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
        //controles Email
        const isEmailValidated = emailReg.test(email);
        if(email.length === 0){
          setEmailErrorMessage("Le champ email doit etre renseigné")
          setIsEmailHasError(true)
        }
        else if(!isEmailValidated){
          setEmailErrorMessage("L'email n'est pas valide")
          setIsEmailHasError(true)
        }
        if(isEmailValidated){
          setIsEmailHasError(false)
        }

        //controles mot de passe
        const isPasswordValidated = passReg.test(password)
        if(password.length === 0){
          setPasswordErrorMessage("Le champ password doit etre renseigné")
          setIsPasswordHasError(true)
        }
        else if(!isPasswordValidated){
          setPasswordErrorMessage("Le mot de passe n'est pas valide, il doit etre composé de : 6 caracteres minimum, une majuscule , une minuscule , un caractères special , un chiffre")
          setIsPasswordHasError(true)
        }
        if(isPasswordValidated){
          setIsPasswordHasError(false)
        }
        const date = new Date()
        var dateFormat = date.getFullYear() + "-" +String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
        if (isEmailValidated  && password.length > 0 && email.length > 0 && isPasswordValidated) {
            register(email,password,dateFormat)
            .then((userSave : any)  => {
             if(userSave.status === undefined){
              setIsErrorRegister(false);
              setIsSuccessRegister(true);
              setIsFromRegister(true);
              setTimeout(function () {
               navigate('/login')}, 3000)
             }
             else if(userSave.data.code == "ER_DUP_ENTRY"){
              setIsErrorRegister(true);
              setRegisterErrorMessage("Email existant");
             }
            })
        }
      };

      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#fc9002" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#fc9002" }}>
              Inscription
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
                {isErrorRegister ? (
                <Alert severity="error"
                >
                  Inscription échoué  —{" "}
                  <strong>{registerErrorMessage}</strong>
                </Alert>
              ) : null}
              {isSuccessRegister ? (
                <Alert severity="success"
                >
                  Inscription réussie  —{" "}
                  <strong>Vous allez etre redirigé vers la page de connexion</strong>
                </Alert>
              ) : null}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={isEmailHasError}
                    helperText={isEmailHasError ? emailErrorMessage : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={isPasswordHasError}
                    helperText={isPasswordHasError ? passwordErrorMessage : ""}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#fc9002",
                  ":hover": { bgcolor: "#ffbf4d" },
                }}
              >
                S'inscrire
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                    variant="body2"
                    color="#fc9002"
                    sx={{ textDecoration: "none" }}
                  >
                    Vous avez déjà un compte ? Connectez-vous
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      );
};

export default Register;