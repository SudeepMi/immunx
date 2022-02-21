import React from "react";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default function Invest({ setIsInvestModelOpen, balance }) {
  const [amount, setAmount] = React.useState("");

  const handleInvest = () => {
    if (amount === "") return toast.error("Enter Investment Amount!");
    if (parseInt(amount) < 50)
      return toast.error("Minimium Investment is $50!");
    if (parseInt(amount) > parseInt(balance) / 1000000)
      return toast.error("Insufficient Balance!");
    setIsInvestModelOpen(false);

    axios
      .post(
        "http://localhost:4000/api/auth/invest",
        {
          investmentAmount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast("Investment request sent!");
      })
      .catch((err) => console.log(err));

    toast("Investment Request Sent!");
  };

  return (
    <div className="investModel__container">
      <div className="relativeContainer">
        <div className="model">
          <div className="depositModel__container__title">
            <h1>Invest</h1>
          </div>

          <h4>Note: Min Investment is $50.</h4>

          <TextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
          />

          <div className="info">
            <p>
              <i className="ri-wallet-3-line"></i>{" "}
              <span>
                <b>Available Balance</b>: ${parseInt(balance) / 1000000}
              </span>
            </p>
            <Button
              onClick={() => {
                setAmount((parseInt(balance) / 1000000).toString());
              }}
            >
              MAX
            </Button>
          </div>

          <div className="info">
            <p>
              <i className="ri-wallet-3-line"></i>{" "}
              <span>
                <b>Gas Price</b>: $6
              </span>
            </p>
            <p>
              <i className="ri-wallet-3-line"></i>{" "}
              <span>
                <b>Slippage Price</b>: $6
              </span>
            </p>
          </div>

          <Button
            className="withdrawBtn"
            disabled={parseInt(balance) === 0 && true}
            onClick={() => handleInvest()}
          >
            <i className="ri-bank-line"></i>
            {balance === "0" ? "Insufficient Fund" : "Invest"}
          </Button>

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
