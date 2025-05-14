import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getsessionStorage } from ".";
import AppModal from "../../Component/Modal/AppModal";
import { encrypt } from "./CryptoJS";
import { useIdleTimeout } from "./IdleTimeoutContext";
import LogoutButton from "./logout";

export default function IdleModalTimer() {
  const [isIdleModalOpen, setIsIdleModalOpen] = useState(false);
  const [isIdlehandleLogoutOpen, setIsIdlehandleLogoutOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { isIdle, resetIdleTimer } = useIdleTimeout();
  const navigate = useNavigate();

  /**
   * Logs the user out and resets application state.
   */

  const handleLogout = () => {
    setIsIdlehandleLogoutOpen(true);
  };

  /**
   * Handles the countdown when the idle modal is open.
   */
  useEffect(() => {
    if (isIdleModalOpen && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clear the interval when the component unmounts or countdown ends
      return () => clearInterval(timer);
    }

    if (isIdleModalOpen && seconds === 0) {
      handleLogout();
    }
  }, [isIdleModalOpen, seconds, isIdlehandleLogoutOpen]);

  /**
   * Triggers the idle modal when the user becomes idle.
   */
  useEffect(() => {
    if (isIdle) {
      setSeconds(10); // Set countdown duration
      setIsIdleModalOpen(true);
    }
  }, [isIdle]);

  /**
   * Handles modal close and resets the idle timer.
   */
  const handleModalClose = () => {
    setIsIdleModalOpen(false);
    resetIdleTimer();
    setIsIdlehandleLogoutOpen(false);
  };

  /**
   * Handles the user's action to continue the session.
   */
  const handleAction = () => {
    setIsIdleModalOpen(false);
    resetIdleTimer();
  };

  return (
    <div>
      <AppModal
        isOpen={isIdleModalOpen}
        onClose={handleModalClose}
        handleActon={handleAction} // Ensure this is defined and passed correctly
        ModalTitle="Idle Timeout Warning"
        Modalsize="md"
        buttonConfigs={[{ text: "Continue", icon: null, action: "continue" }]}
        ModalBody={
          <p>
            You will be logged out soon due to inactivity. Do you want to
            continue ? {seconds}
          </p>
        }
        ModalType="IdleTimeout"
      />
      {isIdlehandleLogoutOpen ? (
        <LogoutButton
          logoutType={getsessionStorage(encrypt("Login_Type"))}
          logoutAction={"Idle"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
