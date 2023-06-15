import { Typography, useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { SvgLogo } from "../icons/SvgLogo";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  to: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  logo?: string;
};

const Item = ({ title, to, selected, setSelected, logo }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (logo) {
    return (
      <MenuItem
      active={selected === title}
      style={{ color: colors.orange[100] }}
      onClick={() => setSelected(title)}
      component={<Link to={to} />}
      icon={<SvgLogo name={logo} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    )
  }

  return (
      <MenuItem
      active={selected === title}
      style={{ color: colors.orange[100] }}
      onClick={() => setSelected(title)}
      component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
  );
};

export default Item;