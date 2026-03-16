// import axios from "axios";

// const API = axios.create({
// // baseURL: "http://10.133.110.113:8000"
// baseURL: "https://final-production-682d.up.railway.app/"

// });

// export default API;

import axios from "axios";

const API = axios.create({
  // This line picks up the Key you just entered in Vercel
  baseURL: import.meta.env.VITE_API_URL || "https://final-production-c1cd.up.railway.app/"
});

export default API;
