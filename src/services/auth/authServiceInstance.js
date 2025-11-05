import authApi from "./authApi";
import createAuthService from "./authService";

// DI using Closure
export const authService = createAuthService(authApi);
