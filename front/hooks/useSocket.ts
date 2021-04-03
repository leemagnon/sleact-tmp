import io from 'socket.io-client';
import { useCallback } from 'react';
import { IChat, IDM } from '@typings/db';

// 타입스크립트에서는 빈 객체이거나 빈 배열이면 타이핑을 해줘야한다.
const sockets: { [key: string]: SocketIOClient.Socket } = {};
const backUrl = 'http://localhost:3095';
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`);

  /* 프론트~서버 // 이벤트명, 데이터 */
  sockets[workspace].emit('hello', 'world');

  /* 서버~프론트 */
  //현재 온라인인 사람들 아이디 목록
  sockets[workspace].on('onlineList', (data: number[]) => {
    console.log(data);
  });
  // 새로운 채널 메시지가 올 때
  sockets[workspace].on('message', (data: IChat) => {
    console.log(data);
  });
  // 새로운 dm 메시지가 올 때
  sockets[workspace].on('dm', (data: IDM) => {
    console.log(data);
  });

  return [sockets[workspace], disconnect];
};

export default useSocket;
