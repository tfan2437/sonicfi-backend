import express from "express";
import { PORT } from "./config/env.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
