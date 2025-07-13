const express=require('express');
const { getAll, adminLogin, authAdmin } = require('../controller/adminController');
const router=express.Router();
router.get("/getAll",getAll);
router.post("/login",adminLogin);
router.post("/auth",authAdmin);
module.exports=router;