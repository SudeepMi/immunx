import "./styles/style.css";

import React from "react";
import { Button } from "@mui/material";
import Identicon from "react-identicons";
import { ToastContainer } from 'react-toastify';

import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";

export default function Dashboard({ setRedirect }) {
  const [isDepositModelOpen, setIsDepositModelOpen] = React.useState(false);
  const [isWithdrawModelOpen, setIsWithdrawModelOpen] = React.useState(false);

  const HandleLogOut = () => {
    localStorage.clear();
    setRedirect((prev) => !prev);
  };

  React.useEffect(() => {
    document.title = "Dashboard | ImmunX";
  }, []);

  return (
    <div className="dashboard__container">
      <ToastContainer/>
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
        <h1>
          <i className="ri-wallet-3-line"></i> Wallet Overview
        </h1>

        <div className="buttons">
          <Button
            className="deposit"
            onClick={() => setIsDepositModelOpen(true)}
          >
            {" "}
            <i className="ri-download-2-line"></i> Deposit
          </Button>
          {isDepositModelOpen && <Deposit setIsDepositModelOpen={setIsDepositModelOpen}/>}
          <Button onClick={() => setIsWithdrawModelOpen(true)}>
            <i className="ri-upload-2-line"></i>Withdraw
          </Button>
          {isWithdrawModelOpen && <Withdraw setIsWithdrawModelOpen={setIsWithdrawModelOpen}/>}
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
                <b>Compound Balance</b> is sum of unwithdrawed ROI & invested balance.
              </li>
              <li>
                <b>Referral Bonus</b> is sum bonus balances from your referrals
                once they invested.
              </li>
            </ol>
          </div>
        </div>

        <div className="ROI">
          <h3>ROI Generated: $5</h3>
          <div>Claimable After: Claimable</div>
          <Button>
            <i className="ri-upload-2-line"></i>Withdraw Daily ROI
          </Button>
          <Button>
            <i className="ri-share-line"></i>Invite
          </Button>
        </div>
        <div className="ROI">
          <h3>
            <i className="ri-bubble-chart-line"></i>Platform Status
          </h3>
          <div>
            <i className="ri-bank-line"></i> Total Investment: $100,437,099
          </div>
          <div>
            <i className="ri-user-line"></i> Total Active Users: 3575
          </div>
          <div>
            <i className="ri-links-fill"></i>Total Referral Bonus: $50,006
          </div>
        </div>
      </div>

      <div className="ad"></div>

      <div className="footer">
        Copyright &copy; immunx.org, 2022. All Rights Reserved.
      </div>
    </div>
  );
}
