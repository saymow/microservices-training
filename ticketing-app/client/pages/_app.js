import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

function App({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

App.getInitialProps = async ({ ctx, Component }) => {
  const { data } = await buildClient(ctx).get("/api/users/currentuser");
  const pageProps = (await Component.getInitialProps?.(ctx)) ?? {};

  return { pageProps, currentUser: data.currentUser };
};

export default App;
