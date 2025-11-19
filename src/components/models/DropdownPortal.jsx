import { createPortal } from "react-dom";

const DropdownPortal = ({ children }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

export default DropdownPortal;
