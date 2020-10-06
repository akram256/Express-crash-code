const express = require ('express')
const router = express.Router();
const uuid = require('uuid')
const members =require('../../Members')

//gets all members

router.get('/',(req,res) =>res.json(members))

//get single memmber
router.get('/:id',(req,res) =>{
    // res.send(req.params.id)
    const found = members.some(member => member.id ===  parseInt(req.params.id));
    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message:`No Member with id ${req.params.id} was  found`})

    }

})

//create Members
router.post('/',(req,res)=> {
    // res.send(req.body)
    const newMember = {
        id : uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'


    }

    if(!newMember.name || ! newMember.email){
        res.status(400).json({message:'Please include name and email'})

    }
    members.push(newMember);
    res.json(members)
    // res.redirect('/')
});
//update member
router.put('/:id',(req,res) =>{
    // res.send(req.params.id)
    const found = members.some(member => member.id ===  parseInt(req.params.id));
    if (found){
        // res.json(members.filter(member => member.id === parseInt(req.params.id)));
        const updMember = req.body;
        members.forEach( member =>{
            if(member.id ===  parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name ;
                member.email =updMember.email ? updMember.email : member.email ;

                res.json({message:'Member updated', member})

            }
        });
    } else {
        res.status(400).json({message:`No Member with id ${req.params.id} was  found`})

    }

});

//delete member
router.delete('/:id',(req,res) =>{
    // res.send(req.params.id)
    const found = members.some(member => member.id ===  parseInt(req.params.id));
    if (found){
        res.json({message:'member deleted',members:members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({message:`No Member with id ${req.params.id} was  found`})

    }

})



module.exports = router;