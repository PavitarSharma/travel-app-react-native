import http from "../axios";

const postTravelAdventure = async (body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await http.post("/travel", body, config);
  return data;
};

const getAllTravelAdventure = async (title, category, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let link = `/travel?title=${title}`;

  if (category) {
    link = `/travel?title=${title}&category=${category}`;
  }

  const { data } = await http.get(link, config);

  return data;
};

const favoriteAdventureTrip = async (id, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await http.patch(
    `/travel/${id}/favorite`,
    { favorite: body },
    config
  );

  return data;
};

const getFavoriteAdventure = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await http.get("/travel/user/favorite", config);

  return data;
};

const bookAdventureTrip = async (id, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await http.patch(
    `/travel/${id}/booked`,
    { isBooked: body },
    config
  );

  return data;
};

const getUserAdventureTrip = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await http.get("/travel/user/adventure", config)


  return data
};

const travelService = {
  getAllTravelAdventure,
  favoriteAdventureTrip,
  getFavoriteAdventure,
  bookAdventureTrip,
  postTravelAdventure,
  getUserAdventureTrip
};

export default travelService;
