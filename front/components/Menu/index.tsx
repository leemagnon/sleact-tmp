import React, { FC } from 'react';
import { CreateMenu, CloseModalButton } from '@components/Menu/styles';

const Menu: FC = ({ children }) => {
  return (
    <CreateMenu>
      <div>메뉴</div>
      {children}
    </CreateMenu>
  );
};

export default Menu;
