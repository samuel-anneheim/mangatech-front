import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
  collapseSidebar: () => void;
  toggleSidebar: () => void;
  broken: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  collapseSidebar,
  toggleSidebar,
  broken,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box
        style={{
          margin: "10px 0 20px 0",
          color: colors.orange[100],
        }}
      >
        {collapsed ? (
          <Box display={"flex"} justifyContent={"center"}>
            <MenuOutlinedIcon onClick={() => collapseSidebar()} />
          </Box>
        ) : undefined}
      </Box>
      {!collapsed && (
        <Box mb="25px">
          <Box display="flex" justifyContent="space-evenly" alignItems="flex-start">
            <Link
              to={"/"}
              style={{
                color: colors.yellow[400],
                textDecoration: "inherit",
              }}
            >
              <img
                className="avater-image"
                alt="profile user"
                width="130px"
                height="130px"
                src={"../../../assets/img/manga_tech.png"}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Link>

            <IconButton
              onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
