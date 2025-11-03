import userApi from "./userapi";
import createUserService from "./userService";

// DI using Closure
export const userService = createUserService(userApi);
