import { Button } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

import "./styles/style.css";

export default function Deposit({ setIsDepositModelOpen }) {
  const textAreaRef = React.useRef(null);

  const handleCopyAddress = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    // navigator.clipboard?.writeText
    //   ? navigator.clipboard.writeText("TWamVietKU8GyQ6ZSEHkHwM7Nd31PMjMWq")
    //   : document.execCommand("TWamVietKU8GyQ6ZSEHkHwM7Nd31PMjMWq");
    toast("Address copied to clipboard!");
  };

  return (
    <div className="depositModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>Deposit</h1>
          </div>

          <div className="qrContainer">
            <QRCode
              value={
                JSON.parse(localStorage.getItem("walletData")) &&
                JSON.parse(localStorage.getItem("walletData"))?.wallet.address
                  .base58
              }
            />
          </div>

          <div className="address">
            <div className="address__container">
              {JSON.parse(localStorage.getItem("walletData")) &&
                JSON.parse(localStorage.getItem("walletData"))?.wallet.address
                  .base58}
            </div>

            <textarea
              ref={textAreaRef}
              value={
                JSON.parse(localStorage.getItem("walletData")) &&
                JSON.parse(localStorage.getItem("walletData"))?.wallet.address
                  .base58
              }
              readOnly
            />
            <Button onClick={handleCopyAddress}>Copy</Button>
          </div>

          <div>
            <b>Note</b>: Make sure you're transfering from <br />
            Tron Network (TRC20 Chain).
          </div>

          <Button
            className="closeBtn"
            onClick={() => setIsDepositModelOpen(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
