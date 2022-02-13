import { Button } from "@mui/material";
import React from "react";
import "./style.css";
export default function Dashboard({ setRedirect }) {

  const HandleLogOut = () =>{
    localStorage.clear()
    setRedirect(prev=>!prev)
  }

  return (
    <div className="dashboard">
      MOTHERF DASHBOARD
      <Button onClick={()=>HandleLogOut()}>SIGN OUT</Button>
    </div>
  );
}
