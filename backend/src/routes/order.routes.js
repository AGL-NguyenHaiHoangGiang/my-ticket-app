const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const {VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat, verifyReturnUrl} = require('vnpay');
const {vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl} = require('../configs/vnpay.default');

const orderController = require('../controllers/order.controller');

const vnpay = new VNPay({
            tmnCode: vnp_TmnCode,
            secureSecret: vnp_HashSecret,
            vnpayHost: vnp_Url,
            testMode: true,
            hashAlgorithm: 'SHA512',
            loggerFn: ignoreLogger
        })

router.post('/create_payment_url', async (req,res)=> {
    try{
        const {description, order_id} = req.body;
        
         const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: 500000,
            vnp_IpAddr: '127.0.0.1',
            vnp_TxnRef: order_id || "TEST0",
            vnp_OrderInfo: description || "this is an order",
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(new Date(Date.now()+ 15*1000*60)), // expires after 15 mins
        })
        
        return res.status(201).json(vnpayResponse)
    }
    catch(err) {
        console.log(err);
        res.status(404).json({ error: "Service not supported" });
    }
    
});

router.get('/vnpay_return', (req, res, next) => {
    let verify;
    try {
        // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ hoặc thiếu dữ liệu
        verify = vnpay.verifyReturnUrl(req.query);
        if (!verify.isVerified) {
            return res.send('Xác thực tính toàn vẹn dữ liệu thất bại');
        }
        if (!verify.isSuccess) {
            return res.send('Đơn hàng thanh toán thất bại');
        }
    } catch (error) {
        console.log(error)
        return res.send('Dữ liệu không hợp lệ');
    }
    return res.send('Xác thực URL trả về thành công');
});

module.exports = router;