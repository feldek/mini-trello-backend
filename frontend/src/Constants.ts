type TConfig = {
  apiUrl: string
}

const prod: TConfig = {
  apiUrl: "http://localhost/api/",
};

const dev: TConfig = {
  apiUrl: "http://localhost:3004/",
};

const config: TConfig = process.env.NODE_ENV === "development" ? dev : prod;

const forcedLogOut = "authorization/forcedLogOut";

export { forcedLogOut, config };
