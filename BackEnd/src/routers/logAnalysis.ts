import express, { Application, Request, Response } from "express";
const { use, setResponse } = require('../common')
const jwt = require("jsonwebtoken");
import fs from "fs";
import { config } from "../../config/configFile";
const router: Application = express();
const JWT_SECRET = config.getJwtSecretKey();

interface Log {
  corId: string;
  level: string;
}

router.post("/logAnalysis", async (req: Request, res: Response) => {
  try {
    const logs: Log[] = [];

    // Read all files in given folder path
    const files = fs.readdirSync(config.getLogFilesPath());

    files.forEach(async (file: string) => {
      
      if (file.includes(req.body.date)) {
        // Read log file
        const data = fs.readFileSync(
          `${config.getLogFilesPath()}/${file}`,
          "utf8"
        );

        // Convert file data into array of object
        const startArray = data
          .replaceAll("}", "},")
          .padStart(data.replaceAll("}", "},").length + 1, "[");

        const endJson = startArray.substring(
          0,
          startArray.lastIndexOf("},") + 1
        );

        var json = JSON.parse(`${endJson}]`);

        json.map(async (key: Log) => {
          // Check whether corId is in the file or not
          if (key.corId === req.body.corId) {
            logs.push(key);
          }
        });
      }
    });
    res.status(200).json({ status: "success", logs });
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/logAnalysis/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (email === config.loginEmailLogAnalysis() && password === config.loginPassLogAnalysis()) {
    const token = jwt.sign({ email }, JWT_SECRET)// process.env.JWT_SECRET)
  
    setResponse(res, 200, 'S', 'login success', { token })
  }
  else{
    res.status(500).send('internal error');
  }
})


module.exports = router;
