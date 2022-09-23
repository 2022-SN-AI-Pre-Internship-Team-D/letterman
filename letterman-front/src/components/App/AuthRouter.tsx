import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { checkAccessToken, getToken, updateAccessToken } from 'utils/tokenManager';

export function AuthRouter() {
  useEffect(() => {
    (async () => {
      checkAccessToken(getToken().access!);
      updateAccessToken(getToken().refresh!);
      const token = getToken().access;
      console.log(getToken().access);
      console.log(getToken().refresh);

      if (!token) {
        window.location.replace('/');
        alert('로그인이 필요합니다.');
      }
      console.log('여기 왔나?');
    })();
  }, []);
  return <Outlet />;
}
