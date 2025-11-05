import { createContext, useReducer, useContext } from "react";
import Notification from "../components/common/Notification";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { message: action.message, type: action.notificationType || "error", visible: true };
    case "HIDE":
      return { ...state, visible: false };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: "",
    type: "error",
    visible: false,
  });

  // ✅ Custom dispatch with auto-hide
  const showNotification = (message, type = "error", duration = 3000) => {
    const text = typeof message === "string" ? message : JSON.stringify(message);

    dispatch({ type: "SHOW", message: text, notificationType: type });
    setTimeout(() => dispatch({ type: "HIDE" }), duration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {state.visible && <Notification message={state.message} type={state.type} onClose={() => dispatch({ type: "HIDE" })} />}
    </NotificationContext.Provider>
  );
};

// ✅ Hook to use notification anywhere
export const useNotification = () => useContext(NotificationContext);
