import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// color design tokens
export const tokens = (mode: PaletteMode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#ccd6db",
          200: "#99acb6",
          300: "#668392",
          400: "#33596d",
          500: "#003049",
          600: "#00263a",
          700: "#001d2c",
          800: "#00131d",
          900: "#000a0f",
        },
        secondary: {
          100: "#f7d4d4",
          200: "#efa9a9",
          300: "#e67e7e",
          400: "#de5353",
          500: "#d62828",
          600: "#ab2020",
          700: "#801818",
          800: "#561010",
          900: "#2b0808",
        },
        orange: {
          100: "#fde5cc",
          200: "#fccc99",
          300: "#fab266",
          400: "#f99933",
          500: "#f77f00",
          600: "#c66600",
          700: "#944c00",
          800: "#633300",
          900: "#311900",
        },
        yellow: {
          100: "#fef2db",
          200: "#fee5b6",
          300: "#fdd992",
          400: "#fdcc6d",
          500: "#fcbf49",
          600: "#ca993a",
          700: "#97732c",
          800: "#654c1d",
          900: "#32260f",
        },
        white: {
          100: "#fbf9f1",
          200: "#f7f3e2",
          300: "#f2eed4",
          400: "#eee8c5",
          500: "#eae2b7",
          600: "#bbb592",
          700: "#8c886e",
          800: "#5e5a49",
          900: "#2f2d25",
        },
      }
    : {
        primary: {
          100: "#000a0f",
          200: "#00131d",
          300: "#001d2c",
          400: "#00263a",
          500: "#003049",
          600: "#33596d",
          700: "#668392",
          800: "#99acb6",
          900: "#ccd6db",
        },
        secondary: {
          100: "#2b0808",
          200: "#561010",
          300: "#801818",
          400: "#ab2020",
          500: "#d62828",
          600: "#de5353",
          700: "#e67e7e",
          800: "#efa9a9",
          900: "#f7d4d4",
        },
        orange: {
          100: "#311900",
          200: "#633300",
          300: "#944c00",
          400: "#c66600",
          500: "#f77f00",
          600: "#f99933",
          700: "#fab266",
          800: "#fccc99",
          900: "#fde5cc",
        },
        yellow: {
          100: "#32260f",
          200: "#654c1d",
          300: "#97732c",
          400: "#ca993a",
          500: "#fcbf49",
          600: "#fdcc6d",
          700: "#fdd992",
          800: "#fee5b6",
          900: "#fef2db",
        },
        white: {
          900: "#2f2d25",
          800: "#5e5a49",
          700: "#8c886e",
          600: "#bbb592",
          500: "#eae2b7",
          400: "#eee8c5",
          300: "#f2eed4",
          200: "#f7f3e2",
          100: "#fbf9f1",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.primary[700],
              main: colors.primary[500],
              light: colors.primary[100],
            },
            background: {
              default: colors.primary[800],
            },
          }
        : {
            primary: {
              main: colors.primary[200],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.primary[700],
              main: colors.primary[500],
              light: colors.primary[100],
            },
            background: {
              default: colors.primary[800],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const localMode = localStorage.getItem("mode");
    if (localMode) {
      setMode(localMode as PaletteMode);
    }
  }, []);

  const colorMode: any = useMemo(
    () => ({
      toggleColorMode: () =>{
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      }
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
