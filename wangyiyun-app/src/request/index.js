import axios from "axios";

export const services = axios.create({
  baseURL: "http://www.4ever799.top:3000/",
//   baseURL: "/api", //当请求接口的时候遇到 "/api" 会自动转为target里的服务，解决跨域
  timeout: 3000,
});
