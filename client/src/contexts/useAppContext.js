import { useContext } from "react";
import { AppContext } from "contexts";
export default function useAppContext() {
  const { snack, snackBarClose, snackBarOpen } = useContext(AppContext);
  return {
    snack,
    snackBarClose,
    snackBarOpen,
  };
}
