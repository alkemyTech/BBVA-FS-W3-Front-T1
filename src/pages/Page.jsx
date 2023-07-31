import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import backgroundImg from "../assets/img/backgroundImg.jpg";

export const Page = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            `url(https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148833155.jpg?w=1380&t=st=1690825539~exp=1690826139~hmac=442dda33f9425f37c8b52bbb1eef0107de515de4b4e86724ffb31e70bdcd0dd1)`,
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

/* https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148833155.jpg?w=1380&t=st=1690825539~exp=1690826139~hmac=442dda33f9425f37c8b52bbb1eef0107de515de4b4e86724ffb31e70bdcd0dd1 */
