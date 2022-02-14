import React from "react";
import { toast } from 'react-toastify';
import { Button, TextField } from "@mui/material";

export default function Invest({setIsInvestModelOpen}) {
    const handleInvest = () => {
        setIsInvestModelOpen(false);
        toast("Withdrawal request sent!")
    }

  return (
    <div className="investModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>Invest</h1>
          </div>

          <TextField id="outlined-basic" label="Amount" variant="outlined" />

          <div className="info">
            <p><i className="ri-wallet-3-line"></i> <span><b>Available Balance</b>: $10</span></p>
            <Button>MAX</Button>
          </div>

          <div className="info">
            <p><i className="ri-wallet-3-line"></i> <span><b>Gas Price</b>: $10</span></p>
            <p><i className="ri-wallet-3-line"></i> <span><b>Slippage Price</b>: $10</span></p>
          </div>

          <Button className="withdrawBtn" onClick={() => handleInvest()}><i className="ri-bank-line"></i>Invest</Button>

          <Button
            className="closeBtn"
            onClick={() => setIsInvestModelOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
