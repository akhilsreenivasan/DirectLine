import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Ideas from "../ideas/Ideas";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";

const Login = () => {
  const [empId, setEmpId] = useState();
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [empData, setEmpData] = useState({});
  const userData = useSelector((state) => state.user);
  const [user] = userData;
  const dispath = useDispatch();
  useEffect(() => {
    const userData = [
      { name: "Joe", id: 1500 },
      { name: "Peter", id: 1501 },
      { name: "David", id: 1502 },
    ];
    setEmpData(userData);
  }, []);
  useEffect(() => {
    setLoggedIn(user);
  }, [user]);
  const getValueFromText = (ev) => {
    setEmpId(() => {
      return ev.target.value;
    });
    if (!ev.target.value) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const submitId = () => {
    let user = empData.filter((user) => user.id == empId);
    dispath({ type: "SAVE_USER_DATA", data: user });
    setLoggedIn(...user);
  };
  return (
    <div style={{ margin: "100px", textAlign: "center" }}>
      {!loggedIn && (
        <Fragment>
          <div className="empid">
            <h2>Login</h2>
            <TextField
              fullWidth
              error={error}
              required
              id="outlined-required"
              label="Enter Employee Id"
              defaultValue={empId}
              placeholder="Enter Employee Id"
              onChange={getValueFromText}
            />
            <Button
              color="primary"
              disabled={!empId}
              variant="contained"
              style={{ marginTop: "30px" }}
              onClick={submitId}
            >
              Submit
            </Button>
          </div>
          <p>Three user details is added for testing</p>
          <p>Enter 1500, 1501 or 1502 for testing</p>
        </Fragment>
      )}
      {loggedIn && (
        <div>
          <h1>Welcome {loggedIn ? loggedIn.name : ""}</h1>
          <Ideas user={loggedIn}></Ideas>
        </div>
      )}
    </div>
  );
};

export default Login;
