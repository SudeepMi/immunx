import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from 'react-toastify';

import "./styles/style.css";

export default function Withdraw({ setIsWithdrawModelOpen }) {
    const handleWithdraw = () => {
        setIsWithdrawModelOpen(false);
        toast("Withdrawal request sent!")
    }
  return (
    <div className="withdrawModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>Withdraw</h1>
          </div>

          <label><b>Note</b>: Receiver Address must be TRC20 Address.</label>

          <TextField
            id="outlined-basic"
            label="Receiver Address"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Amount" variant="outlined" />

          <div className="info">
            <p><i className="ri-wallet-3-line"></i> <span><b>Available Balance</b>: $10</span></p>
            <Button>MAX</Button>
          </div>

          <Button className="withdrawBtn" onClick={() => handleWithdraw()}><i className="ri-upload-2-line"></i>Withdraw</Button>

          <Button
            className="closeBtn"
            onClick={() => setIsWithdrawModelOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
