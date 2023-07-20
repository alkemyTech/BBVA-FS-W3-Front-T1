import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const Page = (props) => {
  return (
    <>
      <Header/>
      <div>{props.children}</div>
      <Footer />
    </>
  );
};
