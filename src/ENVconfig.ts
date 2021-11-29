const prodaction = {
  apiUrl: "https://server-to-do-list.herokuapp.com/",
};

const development = {
  apiUrl: "http://localhost:3004/",
};
export const ENVconfig = process.env.NODE_ENV === "development" ? development : prodaction;

export const PATH_TO_SRC = __dirname;
