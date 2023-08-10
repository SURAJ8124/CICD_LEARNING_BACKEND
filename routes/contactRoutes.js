const express= require("express");
const router=express.Router();
const {getContact,createContact,DeleteContact,UpdateContact,GetContactById}=require("../controllers/contactController")
router.route("/").get(getContact);
router.route("/").post(createContact);
router.route("/:id").get(GetContactById).delete(DeleteContact).put(UpdateContact);

module.exports=router;