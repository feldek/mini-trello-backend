import {getOrThrow} from "./Utils/GetOrThrow";

type TConfig = {
  apiUrl: string
}

const config: TConfig = {
  apiUrl: getOrThrow(process.env.REACT_APP_API)
};

const forcedLogOut = "authorization/forcedLogOut";

export { forcedLogOut, config };
