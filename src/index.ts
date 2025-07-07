import express from "express";
import path from "path";

const app = express();
const PORT = 8080;

const handleReadiness = (req: express.Request, res: express.Response) => {
  res.set({
    "Content-Type": "text/plain",
    charset: "utf-8",
  });
  res.send("OK");
};
app.use("/app", express.static("./src/app"));
app.get("/healthz", handleReadiness);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
