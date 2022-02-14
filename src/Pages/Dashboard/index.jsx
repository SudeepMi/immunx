import "./styles/style.css";

import React from "react";
import { Button } from "@mui/material";
import Identicon from "react-identicons";

export default function Dashboard({ setRedirect }) {
  const HandleLogOut = () => {
    localStorage.clear();
    setRedirect((prev) => !prev);
  };

  return (
    <div className="dashboard__container">
      <div className="userInfo">
        <h1>
          Immun<span>X</span>
        </h1>

        <div className="walletInfo">
          <span className="wallet__address">TTLGuqa1Va15d...9omqe</span>{" "}
          <Identicon string="randomness" />
          <Button className="logout" onClick={() => HandleLogOut()}>
            <i className="ri-logout-box-r-line"></i>SIGN OUT
          </Button>
        </div>
      </div>

      <div className="dashboard__container__title">
        <h1><i className="ri-wallet-3-line"></i> Wallet Overview</h1>

        <div className="buttons">
          <Button className="deposit">
            {" "}
            <i className="ri-download-2-line"></i> Deposit
          </Button>
          <Button>
            <i className="ri-upload-2-line"></i>Withdraw
          </Button>
          <Button>
            <i className="ri-bank-line"></i> Invest
          </Button>
        </div>
      </div>

      <div className="balances">
        <div className="info">
          <div className="dashboard__balance">
            <div className="item">
              <h3>Estimated Balance</h3>
              <h1>$5,008</h1>
            </div>
            <div className="item">
              <h3>Compound Balance</h3>
              <h1>$5,008</h1>
            </div>
            <div className="item">
              <h3>Referral Bonus</h3>
              <h1>$5,008</h1>
            </div>
          </div>
          <div className="information">
            <ol>
              <li>
                <b>Estimated Balance</b> is sum of wallet balance & invested
                balance.
              </li>
              <li>
                <b>Compound Balance</b> is sum of ROI & invested balance.
              </li>
              <li>
                <b>Referral Bonus</b> is sum bonus balances from your referrals
                once they invested.
              </li>
            </ol>
          </div>
        </div>

        <div className="ROI">
          <h2>ROI Generated: $5</h2>
          <div>Claimable After: Claimable</div>
          <Button><i className="ri-upload-2-line"></i>Withdraw Daily ROI</Button>
          <br />
          <Button><i className="ri-share-line"></i>Invite</Button>
        </div>
      </div>
    </div>
  );
}
