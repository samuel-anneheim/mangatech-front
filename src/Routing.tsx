import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Page404 } from "./pages/global/page404/Page404";
import { Homepage } from "./pages/homepage/Homepage";
import SearchList from "./pages/SearchList/SearchList";
import CollectionDetails from "./pages/collectionDetails/CollectionDetails";
import { Profil } from "./pages/profil/Profil";
import { EditProfil } from "./pages/profil/Edit";
import { EditPassword } from "./pages/profil/EditPassword";
import { MyCollection } from "./pages/maCollection/MyCollection";
import { Whislist } from "./pages/whislist/Whislist";
import EditionVolumeList from "./pages/editionVolumes/EditionVolumesList";
import VolumeDetails from "./pages/volumeDetails/VolumeDetails";
import Back from "./components/back/Back";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Author } from "./pages/author/Author";
import { Editor } from "./pages/editor/Editor";
import AuthorDetail from "./pages/author/AuthorDetail";
import EditorDetail from "./pages/editor/EditorDetail";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

const PrivateRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);
  if (!isLoggedIn) return <Navigate to="/homepage" replace />;
  return <Outlet />;
};
/**
 * Composant de routing permet les redirections
 * @param {} props
 * @returns
 */
export const Routing = (props: any) => {
  return (
    <>
      {/* <NavBar pages={props.pages} /> */}
      <Back />
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/list/:search" element={<SearchList />} />
        <Route path="/list/category/:search" element={<SearchList />} />
        <Route path="/collection/:slug" element={<CollectionDetails />} />
        <Route
          path="/:slugCollection/:slugEdition"
          element={<EditionVolumeList />}
        />
        <Route
          path="/:slugCollection/:slugEdition/:number"
          element={<VolumeDetails />}
        />
        <Route
          path="/collection/details/:id/:slug"
          element={<CollectionDetails />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/authors/:slug" element={<AuthorDetail />} />
        <Route path="/editors" element={<Editor />} />
        <Route path="/editors/:slug" element={<EditorDetail />} />

        {/* Only if is logged */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/edit" element={<EditProfil />} />
          <Route path="/profil/edit/password" element={<EditPassword />} />
          <Route path="/ma-collection" element={<MyCollection />} />
          <Route path="/whislist" element={<Whislist />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default Routing;
