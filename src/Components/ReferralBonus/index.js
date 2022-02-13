import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function ReferralBonus() {
  return (
    <>
    <div className="referralBonus">
      <div className="left">
          <h1>
              We present you, the <span style={{color: "#EC407A"}}>best referral service</span> rewarded with high amount as a bonus.
          </h1>
          <Link to="/dashboard" className="referNow">REFER NOW</Link>
      </div>
      <div className="right"></div>
    </div>
    <div className="referralBonusFooter" style={{maxWidth:"100%"}}>
      <div className="referalBonusFooter__wrapper" style={{backgroundColor:"#EC407A", width:"90%",margin:"auto", color:"#212121", padding:"10px"}}>
        <div className="referalBonusFooter__content">
          <div className="referalBonusFooter__content__box">
          <h1>HEAD</h1>
          <h3>DATA</h3>
          </div>

          <div className="referalBonusFooter__content__box">
          <h1>HEAD</h1>
          <h3>DATA</h3>
          </div>

          <div className="referalBonusFooter__content__box">
          <h1>HEAD</h1>
          <h3>DATA</h3>
          </div>

          <div className="referalBonusFooter__content__box">
          <h1>HEAD</h1>
          <h3>DATA</h3>
          </div>

        </div>
      </div>
    </div>
    </>
    
  );
}
