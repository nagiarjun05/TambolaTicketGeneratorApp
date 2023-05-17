const ticketLogic=require('../middleware/logic')
const ticketModel=require('../models/ticket')


//Create API
const ticketGenerator=async function(req,res){
    let numbers=parseInt(req.body.ticketcounts);
    try{
        let tickets=ticketLogic.generateTicket(numbers)
        const respond=await ticketModels.create({tickets:tickets})
        if(respond) return res.status(201).json({success: true, tickets:respond, message: "Succesfully created Tickets"});
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Something went wrong!!'});
    }
}

//Fetch API
const searchById=async function(req,res){
    let Id=parseInt(req.query.id);
    try{
        const tickets=await ticketModel.findByPk(Id);
        if(tickets) return res.status(201).json({success: true, tickets:tickets, message: "Succesfully found the tickets"});
        else if(!tickets) return res.status(404).json({success:true, message:"There are no tickets generated by mentioned ID"})
    }
    catch(err){
        return res.status(500).json({success: false, message: err});
    }
}

module.exports={
    ticketGenerator,
    searchById
};