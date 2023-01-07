const User = require("../models/User");
const path = require('path');

//Get the form page
module.exports.signup_get = (req, res) => {
  res.sendFile(path.join(__dirname+'/../public/index.html'));
}

// controller actions

module.exports.getUser = async (req, res) => {

  const {username, email, password} = req.body;
  const user = await User.findOne({email});
  if(user){
    res.status(200).json({
      message:"User found!",
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password
    });
  } 
  else {
    res.status(400).json({message: 'User not found in the database'});
  }
}

module.exports.getAllUsers = async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
  catch {
    console.log("Couldn't get users!");
    res.status(400).json({message: "Couldn't get users!"})
  }
}

module.exports.createUser = async (req, res) => {

  try {
    const user = await User.create({...req.body});
    console.log(user);

    res.status(201).json({
      message: "User created!",
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
  catch(err) {
    res.status(400).json({message: err.message});
  }
 
}

module.exports.updateUser = async (req, res) => {
  const {username, email, password} = req.body;

  try{
    const user = await User.findOneAndUpdate({email}, {username, password} , {new: true});
    if(user===null){
      res.status(400).json({message: "User couldn't be found in the database"});
    }
    else {
      res.status(200).json({
        message: 'User updated!',
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password
      });
    }
  }

  catch(err){
    console.log(err);
    res.status(400).json({message: "User couldn't be updated"});
  }
}

module.exports.deleteUser = async (req, res) => {
  const {email} = req.body;
  try{
    const user = await User.findOneAndDelete({email});
    if(user===null){
      res.status(400).json({message:"User couldn't be found in the database"})
    } 
    else {
      res.status(200).json({
        message: 'User deleted',
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password
      });      
    }
  }
  catch(err){
    res.status(400).json({message: "User couldn't be deleted"});
  }

}