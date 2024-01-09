import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import { createBrowserHistory } from 'history'

import Header from "./components/Header";
import Progress from "./components/Progress";

// MarketingLazy & AuthLazy는 모두 리액트 컴포넌트이다. 코드에서 이 컴포넌트들을 참조할 때만 import 또는 load된다.
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(()=> import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
  /**
   그냥 리액트 컴포넌트를 export/import하면 안 되나? mount를 import하는 이유..
   container & child Apps 사이에 커플링을 없애기 위해서..
   심지어 양쪽 어디에서든 기술적으로 변화를 가해도 서로 영향을 주고 받지 않기 위해서...
   * */

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if(isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])
  
  return (
    // 브라우저 라우터 객체를 생성하다가 -> 그냥 라우터 객체를 생성하도록 변경
    /**
     *  isSignedIn state를 참조하여 사용자를 redirection하는 로직을 여기 App.js에서 일괄처리하기 위해서이다.
     */
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={()=> setIsSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>

            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};

/**
 * Wrap up
 * 요구사항이 아키텍쳐를 결정한다.
 * 항상 자문해야 한다. "미래에 어떤 것을 변경해야 한다면, 다른 앱도 변경해야 하는가?"
 * 모든 이들로부터 결국에는 리액트는 잊혀질 것이다.
 * CSS 범위를 결정 지어야 한다. (ex. dev VS prod -> 클래스 명 차이 발생)
 * MFE 아키텍쳐에서는 dev 환경에서는 접하지 못했던 이슈를 Prod 환경에서는 접하게 될 수도 있다.
 */
