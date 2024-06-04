import { getAppEnvConfig } from "@/utils/env";

/**
 * 获取 mock 服务地址
 * @returns
 */
function getMockBaseUrl() {
  const { VITE_PORT } = getAppEnvConfig();
  return `http://localhost:${VITE_PORT}`;
}

function getTvBaseUrl() {
  const urlMap: { [key: string]: any } = {
    development: "http://10.118.1.76:19090/pmp-test/",
    production: "https://rd-mokadisplay.tcl.com/pmp-tv/",
    test: "http://10.118.1.76:19090/pmp-test/",
  };
  return urlMap[process.env.NODE_ENV as string];
}

function getMNTBaseUrl() {
  const urlMap: { [key: string]: any } = {
    development: "http://10.118.1.89:8090/",
    production: "https://pmp-mokadisplay.tcl.com:8085/",
    test: "http://10.118.1.89:8090/",
  };
  return urlMap[process.env.NODE_ENV as string];
}

function getLoginUrl() {
  const urlMap: { [key: string]: any } = {
    development: "http://10.118.1.89:8086/api/",
    production: "https://rd-mokadisplay.tcl.com/srdpm-api/api/",
    test: "http://10.118.1.89:8086/api/",
  };
  return urlMap[process.env.NODE_ENV as string];
}

export default {
  // 本地 mock 服务
  MockBaseUrl: getMockBaseUrl(),
  TvBaseUrl: getTvBaseUrl(),
  MntBaseUrl: getMNTBaseUrl(),
  LoginUrl: getLoginUrl(),
};
