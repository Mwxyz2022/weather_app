import { FC, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import "./notification.css";

import ModalPortal from "../ModalPortal";

interface INotificationProps {
  message: string;
  setOuterStore: (isShow: boolean) => void;
}

const Notification: FC<INotificationProps> = ({ message, setOuterStore }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
      setOuterStore(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
    setOuterStore(false);
  };

  return (
    <ModalPortal>
      {showNotification && (
        <div className="notification">
          <button className="notification__button" onClick={closeNotification}>
            <MdOutlineClose size={15} />
          </button>
          <p className="notification__description">{message}</p>
        </div>
      )}
    </ModalPortal>
  );
};

export default Notification;
