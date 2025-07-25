const express = require('express');
const router = express.Router();

const {VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat} = require('vnpay');
const {vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl} = require('../configs/vnpay.default');

const orderController = require('../controllers/order.controller');

router.post('/create_payment_url', async (req,res)=> {
    try{
        const {description, order_id} = req.body;
        
        const vnpay = new VNPay({
            tmnCode: vnp_TmnCode,
            secureSecret: vnp_HashSecret,
            vnpayHost: vnp_Url,
            testMode: true,
            hashAlgorithm: 'SHA512',
            loggerFn: ignoreLogger
        })
        
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

router.get('/vnpay_return', function (req, res, next) {
    // logic resolve
    console.log(req.query);
    
});

// router.get('/vnpay_ipn', function (req, res, next) {
//     let vnp_Params = req.query;
//     let secureHash = vnp_Params['vnp_SecureHash'];
    
//     let orderId = vnp_Params['vnp_TxnRef'];
//     let rspCode = vnp_Params['vnp_ResponseCode'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);
//     let config = require('config');
//     let secretKey = config.get('vnp_HashSecret');
//     let querystring = require('qs');
//     let signData = querystring.stringify(vnp_Params, { encode: false });
//     let crypto = require("crypto");     
//     let hmac = crypto.createHmac("sha512", secretKey);
//     let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
//     let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
//     //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
//     //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
    
//     let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
//     let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
//     if(secureHash === signed){ //kiểm tra checksum
//         if(checkOrderId){
//             if(checkAmount){
//                 if(paymentStatus=="0"){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
//                     if(rspCode=="00"){
//                         //thanh cong
//                         //paymentStatus = '1'
//                         // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
//                         res.status(200).json({RspCode: '00', Message: 'Success'})
//                     }
//                     else {
//                         //that bai
//                         //paymentStatus = '2'
//                         // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
//                         res.status(200).json({RspCode: '00', Message: 'Success'})
//                     }
//                 }
//                 else{
//                     res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
//                 }
//             }
//             else{
//                 res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
//             }
//         }       
//         else {
//             res.status(200).json({RspCode: '01', Message: 'Order not found'})
//         }
//     }
//     else {
//         res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
//     }
// });

// router.post('/querydr', function (req, res, next) {
    
//     process.env.TZ = 'Asia/Ho_Chi_Minh';
//     let date = new Date();

//     let config = require('config');
//     let crypto = require("crypto");
    
//     let vnp_TmnCode = config.get('vnp_TmnCode');
//     let secretKey = config.get('vnp_HashSecret');
//     let vnp_Api = config.get('vnp_Api');
    
//     let vnp_TxnRef = req.body.orderId;
//     let vnp_TransactionDate = req.body.transDate;
    
//     let vnp_RequestId =moment(date).format('HHmmss');
//     let vnp_Version = '2.1.0';
//     let vnp_Command = 'querydr';
//     let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;
    
//     let vnp_IpAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     let currCode = 'VND';
//     let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
    
//     let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    
//     let hmac = crypto.createHmac("sha512", secretKey);
//     let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex"); 
    
//     let dataObj = {
//         'vnp_RequestId': vnp_RequestId,
//         'vnp_Version': vnp_Version,
//         'vnp_Command': vnp_Command,
//         'vnp_TmnCode': vnp_TmnCode,
//         'vnp_TxnRef': vnp_TxnRef,
//         'vnp_OrderInfo': vnp_OrderInfo,
//         'vnp_TransactionDate': vnp_TransactionDate,
//         'vnp_CreateDate': vnp_CreateDate,
//         'vnp_IpAddr': vnp_IpAddr,
//         'vnp_SecureHash': vnp_SecureHash
//     };
//     // /merchant_webapi/api/transaction
//     request({
//         url: vnp_Api,
//         method: "POST",
//         json: true,   
//         body: dataObj
//             }, function (error, response, body){
//                 console.log(response);
//             });

// });

// router.post('/refund', function (req, res, next) {
    
//     process.env.TZ = 'Asia/Ho_Chi_Minh';
//     let date = new Date();

//     let config = require('config');
//     let crypto = require("crypto");
   
//     let vnp_TmnCode = config.get('vnp_TmnCode');
//     let secretKey = config.get('vnp_HashSecret');
//     let vnp_Api = config.get('vnp_Api');
    
//     let vnp_TxnRef = req.body.orderId;
//     let vnp_TransactionDate = req.body.transDate;
//     let vnp_Amount = req.body.amount *100;
//     let vnp_TransactionType = req.body.transType;
//     let vnp_CreateBy = req.body.user;
            
//     let currCode = 'VND';
    
//     let vnp_RequestId = moment(date).format('HHmmss');
//     let vnp_Version = '2.1.0';
//     let vnp_Command = 'refund';
//     let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;
            
//     let vnp_IpAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

    
//     let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
    
//     let vnp_TransactionNo = '0';
    
//     let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
//     let hmac = crypto.createHmac("sha512", secretKey);
//     let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");
    
//      let dataObj = {
//         'vnp_RequestId': vnp_RequestId,
//         'vnp_Version': vnp_Version,
//         'vnp_Command': vnp_Command,
//         'vnp_TmnCode': vnp_TmnCode,
//         'vnp_TransactionType': vnp_TransactionType,
//         'vnp_TxnRef': vnp_TxnRef,
//         'vnp_Amount': vnp_Amount,
//         'vnp_TransactionNo': vnp_TransactionNo,
//         'vnp_CreateBy': vnp_CreateBy,
//         'vnp_OrderInfo': vnp_OrderInfo,
//         'vnp_TransactionDate': vnp_TransactionDate,
//         'vnp_CreateDate': vnp_CreateDate,
//         'vnp_IpAddr': vnp_IpAddr,
//         'vnp_SecureHash': vnp_SecureHash
//     };
    
//     request({
//         url: vnp_Api,
//         method: "POST",
//         json: true,   
//         body: dataObj
//             }, function (error, response, body){
//                 console.log(response);
//             });
    
// });

module.exports = router;