import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { testDBConnection } from "./shared/config/database.js";
import { routers, syncModels } from "./modules/index.js";
import cookieParser from "cookie-parser";
import { seedDatabase } from "./modules/seed.js";

const app = express();

app.use(cookieParser());
app.use(
  cors({
      origin: true,
      credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

testDBConnection();

await syncModels();
await seedDatabase();

routers.forEach(({ path, routers: { crm, site } }) => {
  if (crm !== undefined) {
    app.use("/crm" + path, crm);
  }
    if (site !== undefined) {
      app.use("/parkspot" + path, site);
    }
});

const PORT = Number(process.env.SERVER_PORT || 3000);

app.listen(PORT, async () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
