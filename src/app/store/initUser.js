import { setUser, setLoading } from "./userSlice";

export const initUser = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await fetch("/api/get-user");
    const data = await res.json();

    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(setUser(null));
    }
  } catch (err) {
    dispatch(setUser(null));
  }
};
