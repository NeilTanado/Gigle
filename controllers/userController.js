const User = require('../models/userModel');

module.exports ={
  createUser:(req,res)=>{
    let lowercase =/^(?=.*[a-z]).+$/
    let number = /^(?=.*\d).+$/
    
    let cekNumber = false
    let cekString = false

    if(number.test(req.body.password)){
      cekNumber = true
    }
    
    if(lowercase.test(req.body.password)){
      cekString = true
    }
    
    if(req.body.password.length >= 8 && cekNumber && cekString){
      var newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password: req.body.password,
      phoneNumber : req.body.phoneNumber
    });
    newUser.save()
      .then(dataUser=>{
        res.status(201).json({
          message: 'berhasil menambahkan user baru',
          dataUser
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:'gagal create email/no.telepon sudah terdaftar'
        });
      });
    }else{
      res.status(400).json({
        message :'password minimal 8 karakter dengan gabungan huruf dan angka'
      });
    }
  },

  updateUser:(req,res)=>{
    User.update({
      email:req.body.email
    },{
      name:req.body.name,
      email:req.body.email,
      phoneNumber : req.body.phoneNumber
    })
    .then(dataUserBaru=>{
      res.status(200).json({
        message: 'data diupdate',
        dataUserBaru
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      });
    });
  },

  updatePassword:(req,res)=>{
    let lowercase =/^(?=.*[a-z]).+$/
    let number = /^(?=.*\d).+$/
    
    let cekNumber = false
    let cekString = false

    if(number.test(req.body.password)){
      cekNumber = true
    }
    
    if(lowercase.test(req.body.password)){
      cekString = true
    }

    if(req.body.password.length >= 8 && cekNumber && cekString){
      User.update({
        email: req.body.email
      },{
        password : req.body.password
      })
      .then(dataUserBaru=>{
        res.status(200).json({
          message: 'data password berhasil diupdate',
          dataUserBaru
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'email yang anda masukan salah'
        });
      });
    }else{
      res.status(400).json({
        message: 'password baru minimal 8 karakter dengan gabungan huruf dan angka'
      });
    }  
  },

  getUser:(req,res)=>{
    User.find()
    .then(data=>{
      res.status(200).json({
        message:'berikut data user yang terdaftar',
        data
      })
    })
    .catch(err=>{
      res.status(400).json({
        message:'gagal mendapatkan data user',
        err
      })
    })
  }
};
