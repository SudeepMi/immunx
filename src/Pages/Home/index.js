import React from "react";
import { motion } from "framer-motion";
import "./style.css";
import { Button } from '@material-ui/core'
import { Link, useHistory } from "react-router-dom";
import "./style.css";


export default function Home() {
  const history = useHistory();
  return (
    <motion.div className="dummyHome">
      <div className="dummyBody">
    <div className="landingPage">
      <div className="landingPage__wrapper">
        <div className="landingPage__content" style={{ textAlign:'center' }}>
          <h1 className="landingPage__content__box__title">IMMUN<span className="text-large">X</span></h1>
          <div className="landingPage__content__box">
            <Button type="button" variant="contained" onClick={()=>history.push('/login')} >Login</Button>
            <Button type="button" variant="contained" onClick={()=>history.push('/register')} >Register</Button>
            <Link to="/about" className="aboutus__link">About ImmunX</Link>
          </div>
          </div>
          </div>
    </div>
      </div>
    </motion.div>
  );
}
