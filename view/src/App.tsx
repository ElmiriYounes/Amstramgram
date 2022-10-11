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
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/' : "/amstramgram"} element={cookies.userToken ? <Home /> : <Login />} />
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/register' : "/amstramgram/register"} element={<Register />} />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/profile' : "/amstramgram/profile"}
          element={
            cookies.userToken ? <Profile /> : <ErrorStatus status={"401"} />
          }
        />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/newPost' : "/amstramgram/newPost"}
          element={
            cookies.userToken ? <NewPost /> : <ErrorStatus status={"401"} />
          }
        />
        <Route
          path={window.location.hostname.substring(0,9) === "localhost" ? '/editProfile' : "/amstramgram/editProfile"}
          element={
            cookies.userToken ? <EditProfile /> : <ErrorStatus status={"401"} />
          }
        />
        <Route path={window.location.hostname.substring(0,9) === "localhost" ? '/*' : "/amstramgram/*"}element={<ErrorStatus status={"404"} />} />
      </Routes>
    </Router>
  );
};

export default App;
