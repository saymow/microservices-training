import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

function App({ Component, pageProps, currentUser }) {
  return (
    <>
      <h1>{currentUser.email}</h1>
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async ({ ctx, Component }) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");
  const pageProps = (await Component.getInitialProps?.(ctx)) ?? {};

  return { pageProps, currentUser: data.currentUser };
};

export default App;
