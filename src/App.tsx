import Routing from "./Routing";
import pages from "./utils/constant";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { UserContext, UserContextWrapper } from "./context/userContext";
import { MyProSidebarProvider } from "./pages/global/sidebar/SidebarContext";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./pages/global/TopBar";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

export const App: React.FC = () => {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const {checkJwtValidity} = useContext(UserContext);

  useEffect(() => {
    checkJwtValidity()
  }, [location])


  return (
    <UserContextWrapper>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyProSidebarProvider>
            <Box className="app">
              <main className="content">
                <Topbar />
                <Box marginLeft={{md: 2, s: 0}}>
                  <Routing pages={pages} />
                </Box>
              </main>
            </Box>
          </MyProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContextWrapper>
  );
};

export default App;
