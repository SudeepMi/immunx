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
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import { motion } from "framer-motion";
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function ForgotPassword({ setRedirect }) {
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = React.useState("");
  const [isFetching, setFetching] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState(false);
  const [isValidEmail, setValidEmail] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [isverifiedEmail, setVerifiedEmail] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  const handleCheckEmail = () => {
    console.log("login");
    setFetching(true);
    axios
      .post("http://localhost:8000/api/auth/forgotpassword", {
        email,
      })
      .then((res) => {
        if (res.status === 200) {
          setValidEmail(true);
          setFetching(false);
          setOpen(true);
          setError(false);
          seterrorMessage(`An email has been sent to ${email}`);
          setUserId(res.data.data);
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

  const handleVerifyCode = () => {
    setFetching(true);
    axios
      .post("http://localhost:8000/api/auth/verifycode", {
        id: userId,
        code: verificationCode,
      })
      .then((res) => {
        if (res.status === 200) {
          setFetching(false);
          setError(false);
          setOpen(true);
          seterrorMessage("Email has been verified");
          setVerifiedEmail(true);
        }
      })
      .catch((err) => {
        setError(true);
        setFetching(false);
        seterrorMessage(err.response.data.reason);
      });
  };

  const HandleUpdatePassword =  () => {
        if (password !== confirmPassword) {
          setError(true);
          setFetching(false);
          setOpen(true);
          seterrorMessage("Passwords do not match");
          return
        }
        setFetching(true);
        axios.post("http://localhost:8000/api/auth/updatepassword", {
            id: userId,
            password,
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setFetching(false);
                setError(false);
                setOpen(true);
                seterrorMessage("Password has been updated");
                setRedirect(true);
            }
        }).catch((err) => {
            console.log(err);
        })
            
    }


    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
              {!isValidEmail && !isValidEmail && (
                <form>
                  <p>Enter your email</p>
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
                        label="Email"
                      />
                    </FormControl>
                  </div>

                  <div className="form-group btn-area">
                    <LoadingButton
                      loading={isFetching}
                      loadingPosition="start"
                      startIcon={<ArrowCircleUpOutlinedIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => handleCheckEmail()}
                    >
                      {" "}
                      Submit{" "}
                    </LoadingButton>
                  </div>
                </form>
              )}
              {/* token verification */}
              {isValidEmail && !isverifiedEmail && (
                <form>
                  <p>Enter verification code</p>
                  <div className="form-group">
                    <FormControl sx={{ m: 2 }} fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-vc">
                        Verification Code
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-vc"
                        type={"text"}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        label="Verification Code"
                      />
                    </FormControl>
                  </div>
                  <div className="form-group btn-area">
                    <LoadingButton
                      loading={isFetching}
                      loadingPosition="start"
                      startIcon={<ArrowCircleUpOutlinedIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => handleVerifyCode()}
                    >
                      {" "}
                      Submit{" "}
                    </LoadingButton>
                  </div>
                </form>
              )}
              {/* update new password form */}
              { isverifiedEmail && (
                <form>
                  <p>Enter new password</p>
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      label=" Confirm Password"
                    />
                  </FormControl>
                </div>
                  <div className="form-group btn-area">
                    <LoadingButton
                      loading={isFetching}
                      loadingPosition="start"
                      startIcon={<ArrowCircleUpOutlinedIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => HandleUpdatePassword()}
                    >
                      {" "}
                      Submit{" "}
                    </LoadingButton>
                  </div>
                </form>
              )}

              <Divider />
              <div className="auth-register-option">
                <Typography variant="body2">Dont have an account?</Typography>
                <div className="register-btn-area">
                  <Link to="/register">Register</Link>
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

export default ForgotPassword;
