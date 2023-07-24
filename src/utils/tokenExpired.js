import { addUserId, addUserName } from "../redux/userSlice";

export const tokenExpired = (navigate, dispatch) => {
    localStorage.clear();
    localStorage.setItem("tokenExpired", "Vencieron tus permisos, volvé a ingresar")
    dispatch(addUserId(""));
    dispatch(addUserName(""));
    navigate("/");
}
