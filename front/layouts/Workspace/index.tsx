import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Header,
  RightMenu,
  ProfileImg,
  WorkspaceWrapper,
  Workspaces,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
} from '@layouts/Workspace/style';
import gravatar from 'gravatar';

// Channel/index.tsx에서 Workspace 컴포넌트에 감싸진 div 태그가 children이 된다.
const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher); // 로그인 후 서버로부터 로그인 사용자 정보를 가져옴. data가 존재하지 않으면 로딩중.
  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        test
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.nickname}></ProfileImg>
          </span>
        </RightMenu>
      </Header>

      <button onClick={onLogout}>로그아웃</button>

      <WorkspaceWrapper>
        <Workspaces>Workspaces</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>Chats</Chats>
      </WorkspaceWrapper>

      {children}
    </div>
  );
};

export default Workspace;
