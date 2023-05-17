const express=require('express');
const router=express.Router();

const ticketControllers=require('../controllers/ticket');
const userAuthentication=require('../middleware/authentication')

router.post('/ticketgenerator',userAuthentication.authentication,ticketControllers.ticketGenerator);
router.get('/fetchbyid',userAuthentication.authentication,ticketControllers.searchById);

module.exports=router;
