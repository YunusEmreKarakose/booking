const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authVerify=require('../db/authVerify');
const mysqlDb = require('../db/mysqlDb');

/* 
  USER REGISTER 
  @param name String(35)
  @param surname String(35)
  @param email String(320)
  @param phoneNum String(15)
  @param password String(35)  
*/
router.post('/register', (req, res, next)=>{
  let userData={
    name:req.body.name,
    surname:req.body.surname,
    email:req.body.email,
    phoneNum:req.body.phoneNum,
    password:req.body.password
  }  
  //insert into users table
  let postQuery="INSERT INTO users SET ?"
  mysqlDb.query(postQuery,userData,(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{
      res.json({"mysql":"user registration done"});
    }
  })
});
/* USER LOGIN */
router.post('/login', (req, res, next)=>{
  let userData={
    email:req.body.email,
    password:req.body.password
  }
  //insert into users table
  let postQuery="SELECT * FROM users WHERE email=? AND password =? "
  mysqlDb.query(postQuery,[userData.email,userData.password],(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{
      //jwt token    
      const token=jwt.sign({_userId:results[0].userId},process.env.JWT_SECRET);
      res.header("auth-token",token).send({"message":"User Logged In","token":token});
    }
  })
});
/* GET ALL HOTELS */
router.get('/getHotels',(req,res,next)=>{
  let getQuery="SELECT name,location FROM hotels";
  mysqlDb.query(getQuery,(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{
      res.json({"hotels":results});
    }
  })
});
/* SEARCH HOTEL BY NAME */
router.get('getHotelByName',(req,res,next)=>{  
  let name=req.body.hotelName;
  let getQuery="SELECT name,location FROM hotels WHERE name = ?";
  mysqlDb.query(getQuery,name,(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{
      res.json({"hotels":results});
    }
  })
});
/* AUTH REQUIRED TRANSACTIONS*/
/* GET USER DATA */
router.get('/getdata',authVerify,(req,res,next)=>{ 
  let getQuery="SELECT * FROM users WHERE userId = ?"
  mysqlDb.query(getQuery,req.user._userId,(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{      
      res.json({"mysql":results});
    }
  })
})
/* 
  MAKE RESERVATION
  @param hotelId Number
  @param userId Number (from jwt)
  @param guestCount Number
  @checkIn/Out Date(yyyy-mm-dd)
*/
router.post('/makeRes', authVerify,(req, res, next)=>{
  let reservationData={
    hotelId:req.body.hotelId,
    userId:req.user._userId,
    guestCount:req.body.guestCount,
    checkIn:new Date(req.body.checkIn),
    checkOut:new Date(req.body.checkOut)
  }
  //insert into users table
  let postQuery="INSERT INTO reservations SET ?"
  mysqlDb.query(postQuery,reservationData,(err,results,fields)=>{
    if(err){  res.json({"mysql":err})}
    else{      
      res.json({"mysql":"reservation done"});
    }
  })
});
module.exports = router;
