import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const PORT = process.env.PORT || 8080;
express()
  .use(express.static("dist/client/"))
  .use(ssrHandler)
  .listen(PORT, () => {
    console.log("Ready on port", PORT);
  });
