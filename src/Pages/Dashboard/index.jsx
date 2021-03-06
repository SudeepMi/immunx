import "./styles/style.css";

import React from "react";
import { Button } from "@mui/material";
import Identicon from "react-identicons";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Invest from "./components/Invest";
import WithdrawROI from "./components/WithdrawROI";

import LoadingSVG from "../../Assets/Loading.svg";

export default function Dashboard({ setRedirect }) {
  const [isDepositModelOpen, setIsDepositModelOpen] = React.useState(false);
  const [isWithdrawModelOpen, setIsWithdrawModelOpen] = React.useState(false);
  const [isInvestModelOpen, setIsInvestModelOpen] = React.useState(false);
  const [isWithdrawROIModelOpen, setWithdrawROIModelOpen] =
    React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [chain, setChain] = React.useState({});

  const HandleLogOut = () => {
    localStorage.clear();
    setRedirect((prev) => !prev);
  };

  React.useEffect(() => {
    document.title = "Dashboard | ImmunX";
    axios
      .get("https://immunx.herokuapp.com/api/auth/me", {
        // .get("http://localhost:4000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res0) => {
        if(!res0.data.data) {
          HandleLogOut();
        }
        setUser(res0.data.data);
        localStorage.setItem("walletData", JSON.stringify(res0.data.data));

        axios
          .post(
            "https://immunx.herokuapp.com/api/auth/chain",
            // "http://localhost:4000/api/auth/chain",
            {
              privateKey: res0?.data.data.wallet.privateKey,
              publicKey: res0?.data.data.wallet.address.base58,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res1) => {
            setChain(res1?.data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="animation">
          <img src={LoadingSVG} alt="Animation" />
        </div>
      ) : (
        <div className="dashboard__container">
          <ToastContainer />
          <div className="userInfo">
            <h1>
              Immun<span>X</span>
            </h1>

            <div className="walletInfo">
              <span className="wallet__address">
                {user?.wallet?.address?.base58.slice(0, 12)}...
                {user?.wallet?.address?.base58.slice(29)}
              </span>{" "}
              <Identicon string={user?.wallet?.address?.base58} />
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
              {isDepositModelOpen && (
                <Deposit setIsDepositModelOpen={setIsDepositModelOpen} />
              )}
              <Button onClick={() => setIsWithdrawModelOpen(true)}>
                <i className="ri-upload-2-line"></i>Withdraw
              </Button>
              {isWithdrawModelOpen && (
                <Withdraw setIsWithdrawModelOpen={setIsWithdrawModelOpen} />
              )}
              <Button onClick={() => setIsInvestModelOpen(true)}>
                <i className="ri-bank-line"></i> Invest
              </Button>
              {isInvestModelOpen && (
                <Invest
                  balance={parseInt(
                    chain?.userData?.balance.hex,
                    16
                  ).toString()}
                  setIsInvestModelOpen={setIsInvestModelOpen}
                />
              )}
            </div>
          </div>

          <div className="balances">
            <div className="info">
              <div className="dashboard__balance">
                <div className="item">
                  <h3>Estimated Balance</h3>
                  <h1>
                    $
                    {(
                      (parseInt(chain?.userData?.balance.hex, 16) +
                        parseInt(chain?.userData?.initialInvestment?.hex, 16)) /
                      1000000
                    ).toString()}
                  </h1>
                </div>
                <div className="item">
                  <h3>Compound Balance</h3>
                  <h1>
                    ${parseInt(chain?.userData?.initialInvestment.hex, 16)}
                  </h1>
                </div>
                <div className="item">
                  <h3>Period Ends After</h3>
                  <h1>
                    {parseInt(chain?.userData?.withdrawDisablesAt.hex, 16)} days
                  </h1>
                </div>
              </div>
              <div className="information">
                <ol>
                  <li>
                    <b>Estimated Balance</b> is sum of wallet balance & invested
                    balance.
                  </li>
                  <li>
                    <b>Compound Balance</b> is sum of unwithdrawed ROI &
                    invested balance.
                  </li>
                  <li>
                    <b>Referral Bonus</b> is sum bonus balances from your
                    referrals once they invested.
                  </li>
                </ol>
              </div>
            </div>

            <div className="ROI">
              {/* <h3>ROI Generated: $5</h3> */}
              <div>Claimable After: Claimable</div>
              <Button onClick={() => setWithdrawROIModelOpen(true)}>
                <i className="ri-upload-2-line"></i>Withdraw Daily ROI
              </Button>
              {isWithdrawROIModelOpen && (
                <WithdrawROI
                  setWithdrawROIModelOpen={setWithdrawROIModelOpen}
                />
              )}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://immunx.org/register?referer=${user?.wallet?.address?.base58}`
                  );
                  toast("Invititation Link Copied!");
                }}
              >
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
      )}
    </>
  );
}
