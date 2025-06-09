import express, { Request, Response } from "express";
import { app } from "./app";
import { setupRoutes } from "./routes/routes";

setupRoutes(app);

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World WMS API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
