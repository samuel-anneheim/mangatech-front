import { InputAdornment, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../theme";


type Props = {
  partialSearch: string;
  setPartialSearch: (partialSearch: string) => void;
  handleInputSearchSubmit: (e: any) => void;
};

const SearchBar = ({partialSearch, setPartialSearch, handleInputSearchSubmit}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
  <form onSubmit={(e) => handleInputSearchSubmit(e)}>
    <TextField
      sx={{
        width: "100%",
        padding: "0",
        height: "35px",
        color: colors.primary[600],
        "& .MuiInputBase-input": { padding: "0 0 0 10px" },
        "& label.Mui-focused": {
          color: `${colors.orange[500]} !important`,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor:`${colors.orange[600]} !important`
          }
        }
      }}
      id="search"
      type="search"
      placeholder="Rechercher"
      value={partialSearch}
      onSubmit={(e) => handleInputSearchSubmit(e)}
      onChange={(e) => {
        setPartialSearch(e.target.value);
      }}
      InputProps={{
        style: {
          color: colors.primary[100],
          borderRadius: 10,
          padding: "0",
          height: "35px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </form>
  )
};

export default SearchBar;
