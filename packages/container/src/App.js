import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
// MarketingLazy & AuthLazy는 모두 리액트 컴포넌트이다. 코드에서 이 컴포넌트들을 참조할 때만 import 또는 load된다.
export default () => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "co",
  });

  // 그냥 리액트 컴포넌트를 export/import하면 안 되나? mount를 import하는 이유..
  // container & child Apps 사이에 커플링을 없애기 위해서..
  // 심지어 양쪽 어디에서든 기술적으로 변화를 가해도 서로 영향을 주고 받지 않기 위해서...
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <Route path="/auth" component={AuthLazy} />
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
