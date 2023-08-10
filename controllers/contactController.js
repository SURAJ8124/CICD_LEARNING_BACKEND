const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET/api/contacts
//@access public

const getContact= asyncHandler(async(req,res)=>{
     const contacts= await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create all contacts
//@route POSt/api/contacts
//@access public

const createContact= asyncHandler(async(req,res)=>{
    console.log(req.body,"request body")
    const{name, email, phone}= req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
   const contact = await Contact.create({
    name,
    email,
    phone,
   })

    res.status(201).json(contact);
});
//@desc Delete  contact
//@route DELETE/api/contacts/:id  @route Get/api/contacts/:id @route PUT/api/contacts/:id
//@access public
const DeleteContact= asyncHandler(async (req, res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
}
);

const GetContactById= asyncHandler(async (req, res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});
const UpdateContact= asyncHandler( async (req, res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

        res.status(200).json(updateContact)
    });

module.exports ={getContact,createContact,DeleteContact,UpdateContact,GetContactById};