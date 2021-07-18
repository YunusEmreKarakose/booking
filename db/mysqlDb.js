const mysql=require('mysql');

//create connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'booking'
  });
//connect
db.connect((err)=>{
    if(err){    console.log({"mysql":err}); throw err;}
    else{console.log({"mysql":"connected to db"});}
});
//create tables if not exists
//users
let usersTable = `create table if not exists users (
    userId int primary key auto_increment,
    name varchar(35) not null,
    surname varchar(35) not null,
    email varchar(320) unique not null,
    phoneNum varchar(15) unique not null,
    password varchar(35) not null
)`;
db.query(usersTable, (err, results, fields)=>{
    if (err) {
    console.log({"mysql":err.message});
    }
});

//admins
let adminsTable = `create table if not exists admins (
    adminId int primary key auto_increment,
    email varchar(320) unique not null,
    password varchar(35) not null
)`;
db.query(adminsTable, (err, results, fields)=> {
    if (err) {
    console.log({"mysql":err.message});
    }
});


//hotels
let hotelsTable = `create table if not exists hotels (
    hotelId int primary key auto_increment,
    adminId int not null,
    foreign key(adminId) references admins(adminId),
    name varchar(35) not null,
    location varchar(35) not null
)`;
db.query(hotelsTable, (err, results, fields)=> {
    if (err) {
    console.log({"mysql":err.message});
    }
});

//reservations
let reservationsTable = `create table if not exists reservations (
    resId int primary key auto_increment,
    hotelId int not null,
    foreign key(hotelId) references hotels(hotelId),
    userId int not null,
    foreign key(userId) references users(userId),
    guestCount smallint not null,
    checkIn date not null,
    checkOut date not null,
    valid boolean default 0
  )`;
db.query(reservationsTable, (err, results, fields)=> {
    if (err) {
    console.log({"mysql":err.message});
    }
});
module.exports=db;