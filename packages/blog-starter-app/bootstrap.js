import App from "./pages/_app";

// mount function : 초기 렌더링을 담당
const mount = (el) => <App />;

console.log('NODE_ENV : ',process.env.NODE_ENV)
// in dev mode (=isolated environment)
// 독립 실행을 하기 위해서 mount 함수 호출 -> 렌더링
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_blog-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// in container (MFE environment)
// container에서 사용할 것임
export { mount };
