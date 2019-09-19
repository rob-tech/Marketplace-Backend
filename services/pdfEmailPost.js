const express = require('express')
const fs = require('fs-extra')
const {join} = require('path')
const psw = process.env.SENDGRID_API_KEY
const myEmail = process.env.EMAIL
const createPDF = require('./lib')
const sgMail = require('@sendgrid/mail')



const router = express.Router()


router.post('/', async (req, res, next) => {

    try {
        // 1. Create PDF File
    
        await createPDF(req.body)
    
        // 2. Read PDF File
        const buffer = await fs.readFile(join(__dirname, './document.pdf'))
        const base64Data = buffer.toString('base64')
        console.log(base64Data)
        // 3. Send PDF as an email attachment
    
        const msg = {
            to: req.body.email,
            from: req.body.email,
            subject: `Product Wishlist`,
            text: `Please find product details as follows:`,
            attachments: [{
                filename: `product.pdf`,
                content: base64Data,
                type: 'application/pdf',
                disposition: 'attachment'
            }]
        };
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        await sgMail.send(msg)
    
        // Contact DB (read from file) add a new resourced composed by the body we received in req.body
        res.send('OK')
        
    } catch (error) {
        next(error)
    }


})


module.exports = router