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
  import { Link, useHistory } from "react-router-dom";
  import LockOpenIcon from '@mui/icons-material/LockOpen';
import { motion } from "framer-motion";
import axios from "axios";

  
  function Register() {
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [isError, setError] = React.useState("");
    const [isSuccess, setSuccess] = React.useState(false);
    const [ isFetching, setFetching ] = React.useState(false);
    const [ errorMessage, seterrorMessage ] = React.useState(false);

    
    useEffect(() => {
      if (isSuccess) {
        history.push('/dashboard');
      }
      if (isError ) {
        setOpen(true);
      }
    }, [history, isSuccess, isError]);
  
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
  
    const handleRegister = () => {
        setFetching(true);
        axios.post('https://immunx.herokuapp.com/api/auth/register', {
            email,
            password
        })
        .then(res => {
            if(res.status === 200) {
              localStorage.setItem('token', res.data.token);
                setSuccess(res.data.success);
                setFetching(false);
            }
            
        }).catch(err =>{
          setError(true)
          setFetching(false);
          seterrorMessage(err.response.data.reason);
        });
     
    }
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
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
            <h1 className="landingPage__content__box__title">IMMUN<span className="text-large">X</span></h1>
              <form>
                  <p>Create new account</p>
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
                {/* <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Referer
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-username"
                      type={"text"}
                      value={referer}
                      onChange={(e) => setReferer(e.target.value)}
                      label="Referer"
                    />
                  </FormControl>
                </div> */}
                <div className="form-group">
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={password}
                      onChange={ (e)=>setPassword(e.target.value) }
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
                <div className="form-group btn-area">
                  <LoadingButton
                    loading={isFetching}
                    loadingPosition="start"
                    startIcon={<LockOpenIcon />}
                    variant="outlined"
                    color="error"
                    onClick={()=>handleRegister()}
                  >
                    {" "}
                    Register{" "}
                  </LoadingButton>

                </div>
              </form>
              <Divider />
              <div className="auth-register-option">
                  <Typography variant="body2">Already have an account?</Typography>
                  <div className="register-btn-area">
                      <Link to="/login">Login</Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={isError?"error":"success"} sx={{ width: '100%' }}>
     {errorMessage}
    </Alert>
  </Snackbar>
      </Container>
      </motion.div>
    );
  }
  
  
  
  export default Register;
  