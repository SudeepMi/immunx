import {
  Alert,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import "./Auth.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { motion } from "framer-motion";
import axios from "axios";

function Register({ setRedirect }) {
  const ref = window.location.href.split("=")[1];
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = React.useState("");
  const [isFetching, setFetching] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState(false);
  const [referral, setReferral] = React.useState(ref || "");

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async () => {
    setFetching(true);
    if (email === "" || password === "") {
      setError(true);
      seterrorMessage("Please fill all the fields");
      setFetching(false);
      return;
    }
    const data = {
      email,
      password,
    };
    if (referral) {
      data.referral = referral;
    }
    await axios
      .post("https://immunx.herokuapp.com/api/auth/register", data)
      // .post("http://localhost:4000/api/auth/register", data)
      .then(async (res) => {
        if (res.status === 200) {
          await localStorage.setItem("token", res.data.token);
          await localStorage.setItem("user", JSON.stringify(res.data.user));
          setFetching(false);
          setRedirect(true);
        }
      })
      .catch((err) => {
        setError(true);
        setFetching(false);
        seterrorMessage(err.response.data.reason);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <motion.div className="auth-page">
      <Container>
        <div className="auth-wrapper">
          <div className="d-flex">
            <div className="auth-form">
              <h1 className="landingPage__content__box__title">
                IMMUN<span className="text-large">X</span>
              </h1>
              <form>
                <p className="form__title">Create new account</p>
                <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Referral ID
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type="text"
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      label="Referal ID"
                      disabled={ref ? true : false}
                    />
                  </FormControl>
                </div>

                <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Username or Email"
                    />
                  </FormControl>
                </div>

                <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                </div>
                <div className="form-group btn-area">
                  <LoadingButton
                    loading={isFetching}
                    loadingPosition="start"
                    startIcon={<LockOpenIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() => handleRegister()}
                  >
                    {" "}
                    Register{" "}
                  </LoadingButton>
                </div>
              </form>
              <Divider />
              <div className="auth-register-option">
                <Typography variant="body2">
                  Already have an account?
                </Typography>
                <div className="register-btn-area">
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </motion.div>
  );
}

export default Register;
