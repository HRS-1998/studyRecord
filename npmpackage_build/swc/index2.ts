import { getToken } from "./index1";

export function getRandomToken() {
  return `${getToken()}_${Math.random()}`;
}
