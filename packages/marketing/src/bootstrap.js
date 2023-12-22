import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";

import App from "./app";

// mount function : 초기 렌더링을 담당
const mount = (el, { onNavigate } ) => {
  const history = createMemoryHistory()
  history.listen(onNavigate); // 페이지 이동을 감지하도록 listen, 감지되면 onNavigate

  ReactDOM.render(<App history={history} />, el);
};

// in dev mode (=isolated environment)
// 독립 실행을 하기 위해서 mount 함수 호출 -> 렌더링
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// in container (MFE environment)
// container에서 사용할 것임
export { mount };
