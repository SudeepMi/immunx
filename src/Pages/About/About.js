import React from "react";
import { motion } from "framer-motion";
import "./style.css";
import { Button } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import "./style.css";
import { Divider } from "@mui/material";
import Decentralised from './decentralized.svg'
import Community from './communitysvg.svg'


export default function About() {
    const history = useHistory();
    return (
        <motion.div className="dummyHome">
            <div className="dummyBody">
                <div className="landingPageAbout">
                    <div className="landingPageAbout__wrapper">
                        <div className="landingPageAbout__content">
                            <h1 className="landingPageAbout__content__box__title">IMMUN<span className="text-large">X</span></h1>
                            <div className="landingPageAbout__content__box">
                                <div className="about__box first">
                                    <h1 className="about__box__title">ImmunX is for everyone</h1>
                                    <p className="about__box__text">
                                        We believe in the power of decentralization. That’s why we participate in, contribute to, and support the decentralized community so strongly that we are the only ones who can.
                                    </p>
                                    <Divider style={{ color: 'white' }} />
                                </div>
                                <div className="about__box">
                                    <h1 className="about__box__title">Community driven</h1>
                                    <div className="d-flex">
                                        <p className="about__box__text">
                                            ImmunX smart-contract processes the rewards in cryptocurrency within the matrix structures immediately to the participants and doesn’t store any funds itself.
                                        </p>
                                        <img src={Community} alt="decentralized" className="about__box__img" />
                                    </div>
                                    <Button type="button" variant="contained" onClick={() => history.push('/')} >INVEST NOW</Button>
                                </div>
                                <div className="about__box">
                                    <h1 className="about__box__title">100% decentralized</h1>
                                    <div className="d-flex">
                                        <p className="about__box__text">
                                            We have created first-ever fully decentralized matrix marketing that runs solely on the blockchain and is built on Ethereum and Tron smart-contract.
                                        </p>
                                        <img src={Decentralised} alt="decentralized" className="about__box__img" />
                                    </div>

                                    <Button type="button" variant="contained" onClick={() => history.push('/dashboard')} >EXPLORE ImmunX</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer" style={{padding:"5px 15px", textAlign:'center'}}>
                        Copyright &copy; immunx.org, 2022. All Rights Reserved.
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
