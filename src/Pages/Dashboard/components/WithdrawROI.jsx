import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from 'react-toastify';

import "./styles/style.css";

export default function WithdrawROI({ setWithdrawROIModelOpen }) {
    const handleWithdrawROI = () => {
        setWithdrawROIModelOpen(false);
        toast("Withdrawal request sent!")
    }

  return (
    <div className="withdrawROIModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>Withdraw ROI</h1>
          </div>

          <label><b>Note</b>: Receiver Address must be TRC20 Address.</label>

          <input className="roiInput" type="text" placeholder="Receiver Address"/>
          <input className="roiInput" type="text" placeholder="Amount"/>

          <div className="info">
            <p><i className="ri-wallet-3-line"></i> <span><b>Available Balance</b>: $10</span></p>
            <Button>MAX</Button>
          </div>
          
          <div className="info">
            <p><i className="ri-wallet-3-line"></i> <span><b>Gas Price</b>: $10</span></p>
            <p><i className="ri-wallet-3-line"></i> <span><b>Slippage Price</b>: $10</span></p>
          </div>

          <Button className="withdrawBtn withdrawROIBtn" onClick={() => handleWithdrawROI()}><i className="ri-upload-2-line"></i>Withdraw</Button>

          <Button
            className="closeBtn closeROIBtn"
            onClick={() => setWithdrawROIModelOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
