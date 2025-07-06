import express from "express";


const app = express();
const port = 8080;

app.use(express.static("."));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});