import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import backgroundImg from "../assets/img/backgroundImg.jpg";

export const Page = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};