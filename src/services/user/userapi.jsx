// src/services/user/userApi.js
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";
const userData = [
  { id: 1, name: "Chinmoy Hembram", email: "chinmoy@example.com", role: "Admin", status: "Active", image: "https://i.pravatar.cc/41" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/42" },
  { id: 3, name: "Emma Watson", email: "emma@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/43" },
  { id: 4, name: "Michael Scott", email: "michael@dundermifflin.com", role: "Manager", status: "Active", image: "https://i.pravatar.cc/44" },
  { id: 5, name: "Sarah Lee", email: "sarah@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/45" },
  { id: 6, name: "David Johnson", email: "david@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/46" },
  { id: 7, name: "Sophia Brown", email: "sophia@example.com", role: "Moderator", status: "Active", image: "https://i.pravatar.cc/47" },
  { id: 8, name: "Liam Smith", email: "liam@example.com", role: "Admin", status: "Active", image: "https://i.pravatar.cc/48" },
  { id: 9, name: "Olivia Miller", email: "olivia@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/49" },
  { id: 10, name: "James Brown", email: "james@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/50" },

  { id: 11, name: "Ava Wilson", email: "ava@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/51" },
  { id: 12, name: "Noah Davis", email: "noah@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/52" },
  { id: 13, name: "Isabella Garcia", email: "isabella@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/53" },
  { id: 14, name: "Mason Martinez", email: "mason@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/54" },
  { id: 15, name: "Lucas Rodriguez", email: "lucas@example.com", role: "Moderator", status: "Blocked", image: "https://i.pravatar.cc/55" },
  { id: 16, name: "Mia Hernandez", email: "mia@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/56" },
  { id: 17, name: "Ethan Lopez", email: "ethan@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/57" },
  { id: 18, name: "Harper Gonzalez", email: "harper@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/58" },
  { id: 19, name: "Elijah Wilson", email: "elijah@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/59" },
  { id: 20, name: "Charlotte Anderson", email: "charlotte@example.com", role: "Admin", status: "Active", image: "https://i.pravatar.cc/60" },

  { id: 21, name: "Amelia Thomas", email: "amelia@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/61" },
  { id: 22, name: "Logan Taylor", email: "logan@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/62" },
  { id: 23, name: "Abigail Moore", email: "abigail@example.com", role: "Manager", status: "Active", image: "https://i.pravatar.cc/63" },
  { id: 24, name: "Jacob Jackson", email: "jacob@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/64" },
  { id: 25, name: "Evelyn White", email: "evelyn@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/65" },
  { id: 26, name: "Michael Harris", email: "michael@example.com", role: "Moderator", status: "Active", image: "https://i.pravatar.cc/66" },
  { id: 27, name: "Elizabeth Martin", email: "elizabeth@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/67" },
  { id: 28, name: "Daniel Thompson", email: "daniel@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/68" },
  { id: 29, name: "Sofia Garcia", email: "sofia@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/69" },
  { id: 30, name: "Henry Martinez", email: "henry@example.com", role: "Admin", status: "Active", image: "https://i.pravatar.cc/70" },

  { id: 31, name: "Ella Clark", email: "ella@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/71" },
  { id: 32, name: "Alexander Lewis", email: "alex@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/72" },
  { id: 33, name: "Avery Lee", email: "avery@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/73" },
  { id: 34, name: "Matthew Walker", email: "matthew@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/74" },
  { id: 35, name: "Scarlett Hall", email: "scarlett@example.com", role: "Moderator", status: "Active", image: "https://i.pravatar.cc/75" },
  { id: 36, name: "Jackson Young", email: "jackson@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/76" },
  { id: 37, name: "Victoria King", email: "victoria@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/77" },
  { id: 38, name: "Sebastian Wright", email: "sebastian@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/78" },
  { id: 39, name: "Grace Rivera", email: "grace@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/79" },
  { id: 40, name: "Wyatt Torres", email: "wyatt@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/80" },

  { id: 41, name: "Zoey Reed", email: "zoey@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/81" },
  { id: 42, name: "Owen Cook", email: "owen@example.com", role: "Admin", status: "Active", image: "https://i.pravatar.cc/82" },
  { id: 43, name: "Lily Morgan", email: "lily@example.com", role: "User", status: "Pending", image: "https://i.pravatar.cc/83" },
  { id: 44, name: "Luke Bell", email: "luke@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/84" },
  { id: 45, name: "Hannah Murphy", email: "hannah@example.com", role: "Manager", status: "Active", image: "https://i.pravatar.cc/85" },
  { id: 46, name: "Jayden Bailey", email: "jayden@example.com", role: "User", status: "Blocked", image: "https://i.pravatar.cc/86" },
  { id: 47, name: "Aria Cooper", email: "aria@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/87" },
  { id: 48, name: "Gabriel Richardson", email: "gabriel@example.com", role: "Moderator", status: "Pending", image: "https://i.pravatar.cc/88" },
  { id: 49, name: "Natalie Cox", email: "natalie@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/89" },
  { id: 50, name: "Jack Howard", email: "jack@example.com", role: "User", status: "Active", image: "https://i.pravatar.cc/90" },
];
const userApi = {
  // ✅ Get all users
  async findAll() {
    const res = await axios.get(BASE_URL);
    if (res) return userData;
    return [];
  },

  // ✅ Get user by id
  async findById(id) {
    return axios.get(`${BASE_URL}/${id}`).then((res) => res.data);
  },

  // ✅ Create user with image
  async create(data) {
    return axios
      .post(BASE_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },

  // ✅ Update user with image
  async update(id, data) {
    return axios
      .put(`${BASE_URL}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },

  // ✅ Delete user
  async remove(id) {
    return axios.delete(`${BASE_URL}/${id}`).then((res) => res.data);
  },
};

export default userApi;
