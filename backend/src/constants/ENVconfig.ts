import path from "path";

const production = {
  // apiUrl: "https://server-to-do-list.herokuapp.com/",
  apiUrl: "http://localhost",
};

const development = {
  apiUrl: `http://localhost:${process.env.PORT}/`,
};

export const ENVconfig = process.env.NODE_ENV === "development" ? development : production;

export const PATH_TO_SRC = path.join(__dirname, "..");
