const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
const multer = require('multer');
var fs=require('fs');
const FormData = require('form-data');
const path = require('path')
const {spawn} = require('child_process')


app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 70000,
  }),
);
let {PythonShell} = require('python-shell');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT!=undefined? process.env.PORT: 5000}`)
);

function runScript(){
  return spawn('python', [
    "-u", 
    path.join(__dirname, 'crowdDetectionScript.py'),
    "--foo", "some value for foo",
  ]);
}

// const ans=runScript();
// subprocess.stdout.on('data', (data) => {
//   console.log(`data:${data}`);
// });
// subprocess.stderr.on('data', (data) => {
//   console.log(`error:${data}`);
// });
// subprocess.on('close', () => {
//   console.log("Closed");
// });
app.post("/process",function(req,res){

  const child = runScript("foobar")
  child.stdout.on('data', (data) => {
    res.send(data);
  });
  child.stderr.on('data', (data) => {
    res.send(data);
  });
  child.stderr.on('close', () => {
    res.send(data);
  });
  
  
})