import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const Page = (props) => {
  return (
    <>
      <Header userName={props.userName} setUserName={props.setUserName} setJwt={props.setJwt} />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};
