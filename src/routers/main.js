const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const QRCode = require('qrcode')
const Customer = require('../models/customer')
const { CommandCursor } = require('mongodb')

const router = new express.Router()

const urlCode = 'localhost:3000/token'

router.get('/', async (req, res) => {
    try {
        QRCode.toDataURL(urlCode, async (err, url) => {
            res.render('main', { layout: 'index', Url: url})
        });
    } catch (e) {
        console.log(e)
    }
})

router.get('/token', async (req, res) => {
    try {
        const token = jwt.sign({}, 'gudmundsson')
        res.cookie('token', token)
        res.redirect('/deli')
    } catch (e) {
        console.log(e)
    }
})

router.get('/deli', async (req, res) => {
    try {
        // find the correct number
        const number = await Customer.find({}).sort({number: 1})
        const customerNumber = number[number.length - 1].number + 1

        if (req.cookies['token']) {
            const user = await Customer.findOne({ token: req.cookies['token']})
            if (!user) {
                const customer = new Customer({
                    token: req.cookies['token'],
                    number: customerNumber
                })
    
                await customer.save()
            }
            // display number 
            res.send('Cookie')
        } else {
            res.send('No Cookie')
        }
    } catch (e) {
        res.send(e)
    }
})

module.exports = router