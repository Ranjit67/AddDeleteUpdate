import { createContext, useState } from "react";

export const AppContext = createContext();
export default function AppContextProvider({ children }) {
  const [snack, setSnack] = useState({
    boolean: false,
    message: "",
    severity: "success",
  });
  const snackBarClose = async () => {
    setSnack({ message: "", severity: "success", boolean: false });
  };
  const snackBarOpen = (message, severity) => {
    setSnack({
      message,
      severity: severity ? severity : "success",
      boolean: true,
    });
  };

  const value = {
    snack,
    snackBarClose,
    snackBarOpen,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
