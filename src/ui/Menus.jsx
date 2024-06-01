import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [currOpenId, setCurrOpenId] = useState();
  const [openPosition, setOpenPosition] = useState({});

  const close = () => setCurrOpenId("");
  const open = setCurrOpenId;

  return (
    <MenusContext.Provider
      value={{
        currOpenId,
        close,
        open,
        openPosition,
        setOpenPosition,
      }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { currOpenId, open, close, setOpenPosition } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation()
    const rectPos = e.target.closest("button").getBoundingClientRect();
    setOpenPosition({
      x: window.innerWidth - rectPos.width - rectPos.x + 35,
      y:
        rectPos.y + rectPos.height * 4 >= window.innerHeight - rectPos.height
          ? rectPos.y - rectPos.height * 3
          : rectPos.y + rectPos.height + 8,
    });

    currOpenId === "" || currOpenId !== id ? open(id) : close();
  }

  useEffect(() => {
    if (currOpenId) document.addEventListener("wheel", () => close());

    return () => document.removeEventListener("wheel", () => close());
  }, [close, currOpenId]);

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { currOpenId, openPosition, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (id !== currOpenId) return null;

  return createPortal(
    <StyledList ref={ref} position={openPosition}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        <span>{icon}</span>
        {children}
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
