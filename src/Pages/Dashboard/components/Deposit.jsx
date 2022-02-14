import { Button } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

import "./styles/style.css";

export default function Deposit({setIsDepositModelOpen}) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("TWamVietKU8GyQ6ZSEHkHwM7Nd31PMjMWq")
    toast("Address copied to clipboard!")
  }
  
  return (
    <div className="depositModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>
              Deposit
            </h1>
          </div>

          <div className="qrContainer">
            <QRCode value="TWamVietKU8GyQ6ZSEHkHwM7Nd31PMjMWq" />
          </div>

          <div className="address">
            <div className="address__container">
              TWamVietKU8GyQ6ZSEHkHwM7Nd31PMjMWq
            </div>
            <Button onClick={() => handleCopyAddress()}>Copy</Button>
          </div>

          <div>
            <b>Note</b>: Make sure you're transfering from <br/>Tron Network (TRC20 Chain).
          </div>

          <Button className="closeBtn" onClick={() => setIsDepositModelOpen(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
}
