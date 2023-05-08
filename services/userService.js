import http from "../axios";

const signUp = async (body) => {
  const { data } = await http.post("/user/signUp", body);

  return data;
};

const signIn = async (body) => {
  const { data } = await http.post("/user/signIn", body);
  console.log(data);
  return data;
};

const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await http.get(`/user/${userId}`, config);

  return data;
};

const updateUser = async (userId, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await http.patch(`/user/${userId}`, body, config);

  return data;
};

const updateAvatar = async (userId, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await http.patch(`/user/${userId}/profile`, body, config);

  return data;
};

const userService = {
  signUp,
  signIn,
  getUser,
  updateUser,
  updateAvatar,
};

export default userService;
