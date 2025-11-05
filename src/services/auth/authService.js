function createAuthService(authApi) {
  return {
    async login(data) {
      return await authApi.login(data);
    },
    async signup(data) {
      return await authApi.signup(data);
    },
    async profile() {
      return await authApi.profile();
    },
  };
}

export default createAuthService;
