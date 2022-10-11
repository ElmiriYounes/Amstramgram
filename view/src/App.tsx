import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Register from "./pages/Register";
import { useCookies } from "react-cookie";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorStatus from "./components/error404/ErrorStatus";
import EditProfile from "./pages/EditProfile";

const App: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  return (
    <Router>
      <Routes>
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/' : "/Amstramgram"} element={cookies.userToken ? <Home /> : <Login />} />
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/register' : "/Amstramgram/register"} element={<Register />} />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/profile' : "/Amstramgram/profile"}
          element={
            cookies.userToken ? <Profile /> : <ErrorStatus status={"401"} />
          }
        />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/newPost' : "/Amstramgram/newPost"}
          element={
            cookies.userToken ? <NewPost /> : <ErrorStatus status={"401"} />
          }
        />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/editProfile' : "/Amstramgram/editProfile"}
          element={
            cookies.userToken ? <EditProfile /> : <ErrorStatus status={"401"} />
          }
        />
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/*' : "/Amstramgram/*"}element={<ErrorStatus status={"404"} />} />
      </Routes>
    </Router>
  );
};

export default App;
