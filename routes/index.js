import express from "express";
import Url from "../models/Url.js";
import open, { openApp, apps } from "open";
import { spawn } from "child_process";

const router = express.Router();

router.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      // await open(url.origUrl);
      spawn("open", [url.origUrl]);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

export default router;
