import { mount } from "auth/AuthApp";
// remote marketing을 import한다
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // Marketing app 내에서 페이지 이동이 발생할 때 호출하는 콜백
      onNavigate: ({ pathname: nextPathname }) => {
        // 컨테이너에서 생성된 history obj(=브라우저 히스토리 obj)에 접근하여 이동하려는 pathname을 추가해주면 sync가 맞게된다

        // infinite loop를 방지하기 위해 (컨테이너 히스토리 업데이트 -> 마케팅 히스토리 업데이트 -> 컨테이너 히스토리 업데이트 ->마케팅 히스토리 업데이트.... )
        // 현재 위치와 nextPathname 같지 않으면 push한다
        const { pathname } = history.location
        if (pathname !== nextPathname) history.push(nextPathname)
      },
    });

    history.listen(onParentNavigate)
  }, []);

  return <div ref={ref} />;
};
