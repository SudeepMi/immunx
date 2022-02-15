import React from "react";
import UserReducer, { initialState } from "./UserReducer";

export const UserDataLayerContext = React.createContext();

export default function UserDataLayer({ children }) {
  const [dataLayer, dispatch] = React.useReducer(UserReducer, initialState);

  return (
    <UserDataLayerContext.Provider value={[dataLayer, dispatch]}>
      {children}
    </UserDataLayerContext.Provider>
  );
}

export const useUserDataLayerValue = () =>
  React.useContext(UserDataLayerContext);
