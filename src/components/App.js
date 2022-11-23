import React, { Fragment } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CreateForm from "./form/createform";
import NotFound from "./NoteFound";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./App.scss";
import Login from "./login/Login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = userData;
  const logOut = () => {
    dispatch({ type: "CLEAR_USER_DATA" });
    navigate("/");
  };
  const createNewChallenge = () => {
    navigate("/create-challenges");
  };
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">
            <Link className="links" to="/">
              {" "}
              Hack Ideas
            </Link>
          </Typography>
          <div className="menubar">
            <span
              style={{ cursor: "pointer", marginRight: "15px" }}
              onClick={createNewChallenge}
            >
              {" "}
              {user ? "Create New Challenge" : ""}
            </span>
            <span style={{ cursor: "pointer" }} onClick={logOut}>
              {" "}
              {user ? "Logout" : ""}
            </span>
          </div>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Login />} />
        {user && user.id && (
          <Route path="/create-challenges" element={<CreateForm />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
