const express = require('express');
const router = express.Router();
const mysqlDb =require('../db/mysqlDb');
const jwt=require('jsonwebtoken');
const authVerify=require('../db/authVerify');

/* ADMIN REGISTER */
router.post('/register', (req, res, next)=> {
    let adminData={
      email:req.body.email,
      password:req.body.password,
    }  
    //insert into admins table
    let postQuery="INSERT INTO admins SET ?";
    mysqlDb.query(postQuery,adminData,(err,results,fields)=>{
      if(err){  res.json({"mysql":err})}
      res.json({"mysql":"admin registration done"});
    })
});
/* ADMIN LOGIN */
router.post('/login', (req, res, next)=> {
    let adminData={
      email:req.body.email,
      password:req.body.password,
    }  
    //insert into admins table
    let postQuery="SELECT * FROM admins WHERE email = ? AND password=?";
    mysqlDb.query(postQuery,[adminData.email,adminData.password],(err,results,fields)=>{
      if(err){  res.json({"mysql":err})}
      //jwt token    
      const token=jwt.sign({_adminId:results[0].adminId},process.env.JWT_SECRET);
      res.header("auth-token",token).send({"message":"ADMIN Logged In","token":token});
    })
});

/*  AUTH REQUIRED */
/* GET RESERVATIONS */
router.get('/getReservations',authVerify,async (req,res,next)=>{
  //hotels for which the admin is responsible
  let promise=new Promise((resolve,reject)=>{      
    let getQuery="SELECT * FROM hotels WHERE adminId = ?";    
    mysqlDb.query(getQuery,req.user._adminId,(err,results,fields)=>{
        if(err){  reject(err)}
        resolve(results);
    })
  });
  let hotels=await promise;
  //create hotelIds param for query
  var queryParam="(";
  hotels.forEach(hotel => {
    queryParam+=hotel.hotelId+",";
  });
  queryParam=queryParam.slice(0, -1)
  queryParam+=")"
  //get reservations        
  let getQuery="SELECT * FROM reservations WHERE hotelId in "+queryParam;    
  mysqlDb.query(getQuery,(err,results,fields)=>{
      if(err){  res.json({"mysql":err})}
      res.json({"mysql":results});
  })
})
/* HOTEL REGISTER*/
router.post('/registerHotel', authVerify,(req, res, next)=> {
    let hotelData={
      adminId:req.user._adminId,
      name:req.body.name,
      location:req.body.location,
    }  
    //insert into hotels table
    let postQuery="INSERT INTO hotels SET ?";
    mysqlDb.query(postQuery,hotelData,(err,results,fields)=>{
      if(err){  res.json({"mysql":err})}
      res.json({"mysql":"hotel registration done"});
    })
});
/* RESERVATION CONFIRMATION */ 
router.post('/confirm', (req, res, next)=>{
    //set valid column to 1(true)
    let postQuery="UPDATE reservations SET valid ?";
    mysqlDb.query(postQuery,1,(err,results,fields)=>{
      if(err){  res.json({"mysql":err})}
      res.json({"mysql":"reservation confirmation done"});
    })
});
module.exports = router;
