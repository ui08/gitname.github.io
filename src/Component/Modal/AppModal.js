import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import ReactOdometer from "react-odometerjs";
import ButtonComp from "../ButtonComp/ButtonComp";

const AppModal = ({
  isOpen,
  onClose,
  handleActon,
  ModalTitle,
  Modalsize,
  buttonConfigs,
  Modaldata,
  ModalBody,
  ModalType,
  ReactOdometervalue,
  ModalScrollable,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      size={Modalsize}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={ModalScrollable ? true : false}
    >
      {ModalType === "IdleTimeout" || ModalType === "Watchlistbtn" ? null : (
        <Modal.Header closeButton>
          <Modal.Title>{ModalTitle}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body style={{ minHeight: "10vh" }}>
        {ModalBody}
        {ModalType === "IdleTimeout" && (
          <>
            <ReactOdometer
              value={ReactOdometervalue}
              format="d"
              theme="plaza"
            />
          </>
        )}
      </Modal.Body>
      {ModalType == "Watchlist" || ModalType == "Watchlistbtn" ? null : (
        <Modal.Footer className="text-center">
          <div className="action_btn">
            {buttonConfigs.map(({ text, icon, action, disabled }) => (
              <ButtonComp
                key={text}
                wrapperName={"btn_wrapper"}
                type="button"
                btnStyle="box"
                btnText={text}
                disabled={disabled}
                onClick={() => {
                  if (typeof handleActon === "function") {
                    handleActon({ action, Modaldata });
                  } else {
                    console.warn("handleActon is not a function");
                  }
                }}
              />
            ))}
          </div>
          {ModalType !== "IdleTimeout" || ModalType !== "OnboardingClose" && (
            <ButtonComp
              wrapperName={"btn_wrapper"}
              type="button"
              btnStyle="box"
              btnText={ModalType === "Toggle" ? "No" : "Close"}
              onClick={onClose}
            />
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

AppModal.defaultProps = {
  handleActon: () => console.warn("No action handler provided"),
};

AppModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleActon: PropTypes.func, // Optional, default provided
  ModalTitle: PropTypes.string.isRequired,
  Modalsize: PropTypes.string.isRequired,
  Modaldata: PropTypes.object,
  ModalBody: PropTypes.node.isRequired,
  buttonConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.object, // Optional, for icons
      action: PropTypes.string, // Action name or key
      disabled: PropTypes.bool, // Optional
    })
  ),
  ModalType: PropTypes.string.isRequired,
  ReactOdometervalue: PropTypes.number, // Optional, used only for IdleTimeout
};

export default AppModal;
