// // import userApi from "./userapi";
// function createUserService(userApi) {
//   // 🔒 CLOSURE: userApi is injected
//   return {
//     // Read (Permissions)
//     async userList() {
//       const data = await userApi.findAll();
//       return data;
//     },

//     async getUser(id) {
//       const user = await userApi.findById(id);
//       return user;
//     },
//     // async getRolePermissions(roleId) {
//     //   const role = await userApi.fetchById(roleId); // Event Loop
//     //   if (!role) return [];
//     //   // IMMUTABILITY: map returns a new array
//     //   return role.permissions.map((p) => p.toUpperCase());
//     // },

//     // // Create (New CRUD method)
//     // async createRole(data) {
//     //   // Business Logic: Ensure role names are unique
//     //   const existingRoles = await userApi.fetchAll();
//     //   if (existingRoles.some((r) => r.name === data.name)) {
//     //     throw new Error(`Role name '${data.name}' already exists.`);
//     //   }
//     //   return userApi.createRole(data); // Delegation (Event Loop)
//     // },

//     // // Update (New CRUD method)
//     // async updateRole(id, updates) {
//     //   // Business Logic: Validate permissions format
//     //   if (updates.permissions && !Array.isArray(updates.permissions)) {
//     //     throw new Error("Permissions must be an array.");
//     //   }
//     //   return userApi.updateRole(id, updates); // Delegation (Event Loop)
//     // },

//     // // Delete (New CRUD method)
//     // async deleteRole(id) {
//     //   // Business Logic: Prevent deletion of fundamental roles (e.g., admin)
//     //   const role = await userApi.fetchById(id);
//     //   if (role && role.name === "admin") {
//     //     throw new Error("Cannot delete administrative role.");
//     //   }
//     //   // Note: In a real app, you'd check the userService to see if any users still have this role.
//     //   return userApi.deleteRole(id); // Delegation (Event Loop)
//     // },
//   };
// }
// export default createUserService;

function createUserService(userApi) {
  return {
    async userList() {
      return await userApi.findAll();
    },

    async getUser(id) {
      return await userApi.findById(id);
    },

    async createUser(data) {
      console.log("form data in dashboard,", data);
      return await userApi.createUser(data);
    },

    async updateUser(id, data) {
      return await userApi.updateUser(id, data);
    },

    async deleteUser(id) {
      return await userApi.deleteUser(id);
    },
  };
}

export default createUserService;
