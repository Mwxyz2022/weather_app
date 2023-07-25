import { FC, ReactNode } from "react"
import ReactDOM from "react-dom"

interface ModalProps {
  children: ReactNode;
}

const ModalPortal: FC<ModalProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

export default ModalPortal;
