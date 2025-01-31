const isDev = process.env.NODE_ENV === "development";

const BaseProtocol = isDev ? "http" : "https";
const WsProtocol = isDev ? "ws" : "wss";
const URL = isDev ? "localhost:8080" : "linepro.mukho.r-e.kr";

export const API_URL = `${BaseProtocol}://${URL}/api/v2`;
export const SOCKET_URL = `${WsProtocol}://${URL}/api/v2/socket`;
