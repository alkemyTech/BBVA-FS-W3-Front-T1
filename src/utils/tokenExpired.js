import { addUserId, addUserName } from "../redux/userSlice";

export const tokenExpired = (navigate, dispatch) => {
    localStorage.clear();
    localStorage.setItem("tokenExpired", "Expiró tu sesión, volvé a ingresar")
    dispatch(addUserId(""));
    dispatch(addUserName(""));
    navigate("/");
}
