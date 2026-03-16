// import axios from "axios";

// const API = axios.create({
//   // This line picks up the Key you just entered in Vercel
//   baseURL: import.meta.env.VITE_API_URL || "https://final-production-8aff.up.railway.app/"
// });

// export default API;
// Inside src/api/api.js (Check this file!)
import axios from "axios";

const API = axios.create({
  baseURL: "https://final-production-8aff.up.railway.app", // Change this from localhost
});

export default API;