require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./models/User");
const express = require("express");
const server = require("express")();
const bodyParser = require("body-parser");
const port = 3000;
server.use(bodyParser.json());
server.use(express.json());

//connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    CreateServer();
    console.log("DB connected");
  })
  .catch((err) => {
    throw err;
  });

server.get("/users", async (req, res) => {
  const ref = await getUsers();
  console.log(ref);
});

server.post("/adduser", async (req, res) => {
  const { user_name, email, password } = req.body;
  const newUser = new userModel({
    user_name: user_name,
    email: email,
    password: password,
  });
  let rel = await newUser.save();
  console.log(rel);
  res.send(rel);
});

server.put("/change", async (req, res) => {
  const { id, name } = req.body;
  let rel = await userModel.findOneAndUpdate(
    { _id: id },
    { name: name },
    {
      new: true, // return updated doc
      runValidators: true, // validate before update
    }
  );
  console.log(rel);
  res.send(rel);
});
server.delete("/remove",async (req,res)=>{
    const { id } = req.body;
    let rel = await userModel.findByIdAndRemove(id)
    console.log(rel)
    res.send(rel)
})


function CreateServer() {
  server.listen(port, () => {
    console.log(`sever running at : http://localhost:${port}`);
  });
}
async function getUsers() {
  var res = await userModel.find({});
  return res;
}
