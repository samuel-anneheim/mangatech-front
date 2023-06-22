import { useContext, useState } from "react";
import { Sidebar, Menu, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";

import categoryIcon from "../../../assets/category.svg";
import CollectionIcon from "../../../assets/collections.svg";
import AuthorIcon from "../../../assets/writer.svg";
import EditorIcon from "../../../assets/editor.svg";
import AcceuilIcon from "../../../assets/acceuil.svg";
import MangaIcon from "../../../assets/manga.svg";
import WhislistIcon from "../../../assets/whislist.svg";
import PorfilIcon from "../../../assets/ninja.svg";

import { useCategory } from "../../../hooks/useCategory";

import Item from "../../../components/sidebar/Item";
import { SvgLogo } from "../../../components/icons/SvgLogo";
import { SidebarHeader } from "../../../components/sidebar/SidebarHeader";
import { useSidebarContext } from "./SidebarContext";
import { tokens } from "../../../theme";
import { UserContext } from "../../../context/userContext";

export const MySidebar: React.FC = () => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const { isLoggedIn } = useContext(UserContext);
  const { sidebarImage } = useSidebarContext();
  const { categories } = useCategory();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState<string>("Acceuil");

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-menu-button:hover": {
          color: `${colors.orange[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-active": {
          color: `${colors.orange[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-submenu-content": {
          color: `${colors.orange[500]} !important`,
          backgroundColor: `${colors.primary[600]} !important`,
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        backgroundColor={colors.primary[700]}
        image={sidebarImage}
      >
        <Menu style={{ height: "100%" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
            height={"100vh"}
          >
            <Box>
              <SidebarHeader
                collapsed={collapsed}
                collapseSidebar={collapseSidebar}
                toggleSidebar={toggleSidebar}
                broken={broken}
              />
              <Item
                title="Accueil"
                to="/"
                selected={selected}
                setSelected={setSelected}
                logo={AcceuilIcon}
              />
              <SubMenu
                label="Categories"
                icon={<SvgLogo name={categoryIcon} />}
                style={{ color: colors.orange[100] }}
              >
                {categories.map((category: any) => (
                  <Item
                    key={category.id}
                    title={category.name}
                    to={`list/category/${category.slug}`}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </SubMenu>
              <Item
                title="Collections"
                to="/list/All"
                selected={selected}
                setSelected={setSelected}
                logo={CollectionIcon}
              />
              <Item
                title="Auteurs"
                to="/authors"
                selected={selected}
                setSelected={setSelected}
                logo={AuthorIcon}
              />
              <Item
                title="Editeurs"
                to="/editors"
                selected={selected}
                setSelected={setSelected}
                logo={EditorIcon}
              />
            </Box>
            {isLoggedIn ? (
              <Box mb={2}>
                <Item
                  title="Ma whislist"
                  to="/whislist"
                  selected={selected}
                  setSelected={setSelected}
                  logo={WhislistIcon}
                />
                <Item
                  title="Ma collection"
                  to="/ma-collection"
                  selected={selected}
                  setSelected={setSelected}
                  logo={MangaIcon}
                />
                <Item
                  title="Mon profil"
                  to="/profil"
                  selected={selected}
                  setSelected={setSelected}
                  logo={PorfilIcon}
                />
              </Box>
            ) : null}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};
