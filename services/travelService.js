import http from "../axios";

const getAllTravelAdventure = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await http.get("/travel", config);

  return data;
};

const travelService = {
  getAllTravelAdventure,
};

export default travelService;
