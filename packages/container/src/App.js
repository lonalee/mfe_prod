import React from "react";
import MarketingApp from "./components/MarketingApp";

export default () => {

    // 그냥 리액트 컴포넌트를 export/import하면 안 되나? mount를 import하는 이유..
    // container & child Apps 사이에 커플링을 없애기 위해서..
    // 심지어 양쪽 어디에서든 기술적으로 변화를 가해도 서로 영향을 주고 받지 않기 위해서...
    return <div>
        <h2>This is Container with MarketingApp</h2>
        <hr/>
        <MarketingApp />
    </div>
}