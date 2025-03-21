const express =require("express");
const router=express.Router();

const {transfer,getHistory}=require("../controllers/transactionController.js");

router.post("/transfer",transfer);
router.get("/history/:user_id",getHistory);
//router.get("/status",getStatus);

module.exports=router;
