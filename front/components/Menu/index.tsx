import React, { CSSProperties, FC } from 'react';
import { CreateMenu, CloseModalButton } from '@components/Menu/styles';

interface Props {
  style: CSSProperties;
  show: boolean;
  onCloseModal: () => void;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
