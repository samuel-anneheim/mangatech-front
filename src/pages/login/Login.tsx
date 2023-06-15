import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import "./Login.css";
import { Alert, Container, useTheme } from "@mui/material";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="#fc9002" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MangaTech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Login = () => {
  const { isLoggedIn, login,isFromRegister,setIsFromRegister, isFailedConnexion, setIsFailedConnexion } = useContext(UserContext);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>("");
  const [isEmailHasError, setIsEmailHasError] = React.useState<boolean>(false);
  const [fromRegister, setFromRegister] = React.useState<boolean | undefined>(undefined);
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/homepage");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsFromRegister(false);
    event.preventDefault();
    const emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    const isEmailValidated = emailReg.test(email);
    if(email.length === 0){
      setEmailErrorMessage("le champ email doit etre renseigné");
      setIsEmailHasError(true);
    }
    else if(!isEmailValidated){
      setEmailErrorMessage("L'email n'est pas valide");
      setIsEmailHasError(true);
    }
    if(isEmailValidated){
      setIsEmailHasError(false)
    }
    setIsSearch(true);
    if (isEmailValidated  && password.length > 0 && email.length > 0) {
      login(email, password);  
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      if(fromRegister){
        setIsFromRegister(false)
        navigate("/homepage");
      }else{
        setIsFromRegister(false)
        navigate(-1);
      }      
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setFromRegister(isFromRegister);  
  }, []);

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
        <Avatar sx={{ m: 1, bgcolor: colors.orange[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={colors.orange[500]} fontWeight={"bold"}>
          Se connecter
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {isFailedConnexion ? (
            <Alert severity="error">
              Probleme lors de la connexion —{" "}
              <strong>email ou mot de passe erroné!</strong>
            </Alert>
          ) : null}
          {isFromRegister ? (
            <Alert severity="success">
              Inscription réussie —{" "}
              <strong>
                Vous pouvez vous connecté avec votre email et mot de passe :
              </strong>
            </Alert>
          ) : null}
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
          <TextField
            error={password.length === 0 && isSearch}
            helperText={
              password.length === 0 && isSearch
                ? "le champ password doit etre renseigné"
                : ""
            }
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.orange[500],
              ":hover": { bgcolor: colors.orange[500] },
            }}
          >
            Se connecter
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 0,
              mb: 2,
              bgcolor: colors.orange[500],
              ":hover": { bgcolor: colors.orange[500] },
            }}
            onClick={(e) => {
              setIsFailedConnexion(false);
              e.preventDefault();
              navigate("/register");
            }}
          >
            Créer un compte
          </Button>

          {/* @TODO gestion du MDP oublié à faire */}
          {/* <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                color={colors.orange[500]}
                sx={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Mot de passe oublié
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
};

export default Login;
