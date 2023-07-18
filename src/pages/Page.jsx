import { Footer } from "../components/Footer/Footer";

export const Page = (props) => {
  return (
    <>
      <div>
        {props.children}
      </div>
      <Footer/>
    </>
  );
};