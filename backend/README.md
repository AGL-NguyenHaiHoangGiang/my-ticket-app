# My Ticket App - Backend 🎫

THIẾT KẾ VÀ PHÁT TRIỂN HỆ THỐNG WEB BÁN VÉ MYTICKET
với Node.js, Express.js và MongoDB.

## 📋 Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Biến môi trường](#biến-môi-trường)
- [API Endpoints](#api-endpoints-vi)
- [Mô hình cơ sở dữ liệu](#mô-hình-cơ-sở-dữ-liệu)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Triển khai](#triển-khai)
- [Tài khoản demo](#tài-khoản-demo)
- [Scripts](#scripts)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Tính năng bảo mật](#tính-năng-bảo-mật)
- [HTTP Status Codes](#http-status-codes)

## ✨ Tính năng

- **Xác thực & Phân quyền người dùng** - Xác thực JWT với kiểm soát truy cập dựa trên vai trò
- **Quản lý sự kiện** - Tạo, đọc, cập nhật và xóa sự kiện với thông tin chi tiết
- **Hệ thống đặt vé** - Quy trình đặt vé hoàn chỉnh với quản lý đơn hàng
- **Hệ thống blog** - Quản lý nội dung với danh mục và các thao tác CRUD
- **Tích hợp thanh toán** - Tích hợp cổng thanh toán VNPay
- **Bảng điều khiển quản trị** - Giao diện quản trị để quản lý sự kiện, người dùng và đơn hàng
- **Hồ sơ người dùng** - Quản lý tài khoản và cập nhật hồ sơ người dùng
- **RESTful API** - API có cấu trúc tốt với xử lý lỗi phù hợp
- **Tích hợp MongoDB** - Thiết kế cơ sở dữ liệu mạnh mẽ với Mongoose ODM

## 🛠 Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Cơ sở dữ liệu**: MongoDB với Mongoose ODM 8.16.0
- **Xác thực**: JWT (jsonwebtoken 9.0.2)
- **Mã hóa mật khẩu**: bcrypt 6.0.0
- **Thanh toán**: VNPay SDK 2.4.0
- **Auto-increment**: mongoose-sequence 6.0.1
- **Slug generation**: slugify 1.6.6
- **UUID**: uuid 11.1.0
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.5.0
- **Phát triển**: nodemon 3.1.10
- **Triển khai**: Cấu hình sẵn sàng cho Vercel

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- MongoDB (instance local hoặc cloud)
- npm hoặc yarn package manager

## 🚀 Cài đặt

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd my-ticket-app/backend
   ```

2. **Cài đặt dependencies**

   ```bash
   npm install
   ```

3. **Thiết lập biến môi trường**

   ```bash
   cp .env.example .env
   # Chỉnh sửa .env với cấu hình của bạn
   ```

4. **Khởi chạy development server**
   ```bash
   npm start
   ```

Server sẽ chạy trên `http://localhost:3055` theo mặc định.

## 🔧 Biến môi trường

Tạo file `.env` trong thư mục gốc backend với các biến sau:

```env
# Cấu hình Server
PORT=3055

# Cơ sở dữ liệu
MONGODB_URI=mongodb://localhost:27017/myticket
PRODUCT_MONGODB_URI=your_production_mongodb_uri

# Cấu hình JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

# Cấu hình CORS
CORS_ORIGIN=http://localhost:5173

# Cổng thanh toán VNPay
VNPAY_TMNCODE=your_vnpay_terminal_code
VNPAY_HASHSECRET=your_vnpay_hash_secret
```

## 🛣 API Endpoints {#api-endpoints-vi}

### 🔐 Xác thực người dùng

- `POST /api/v0/auth/signup` - Đăng ký người dùng mới
- `POST /api/v0/auth/login` - Đăng nhập người dùng
- `POST /api/v0/auth/logout` - Đăng xuất người dùng
- `POST /api/v0/auth/refresh-token` - Làm mới access token
- `POST /api/v0/auth/verify-token` - Xác minh token hợp lệ

### 🎪 Sự kiện

- `GET /api/v0/event/all` - Lấy tất cả sự kiện (có phân trang, lọc)
- `GET /api/v0/event/slug/:slug` - Lấy chi tiết sự kiện theo slug
- `GET /api/v0/event/search?keyword=` - Tìm kiếm sự kiện theo từ khóa
- `GET /api/v0/event/banner` - Lấy danh sách banner events
- `GET /api/v0/event/feature` - Lấy danh sách sự kiện đặc biệt

### 👤 Quản lý người dùng (Customer)

- `GET /api/v0/users/profile` - Lấy hồ sơ cá nhân (yêu cầu xác thực)
- `PUT /api/v0/users/profile` - Cập nhật hồ sơ cá nhân (yêu cầu xác thực)
- `PUT /api/v0/users/deactivate` - Vô hiệu hóa tài khoản cá nhân
- `GET /api/v0/user/my-bookings1` - Lấy danh sách booking của người dùng

### 💳 Đơn hàng & Thanh toán

- `POST /api/v0/order/create_payment_url` - Tạo URL thanh toán VNPay
- `GET /api/v0/order/vnpay_return` - Callback xử lý kết quả thanh toán VNPay
- `GET /api/v0/order/trans-info/:id` - Lấy thông tin giao dịch theo ID

### 📝 Blog (Công khai)

- `GET /api/v0/blogs` - Lấy tất cả blog (có phân trang, lọc theo danh mục)
- `GET /api/v0/blogs/:slug` - Lấy chi tiết blog theo slug
- `GET /api/v0/blogs/search/:keySearch` - Tìm kiếm blog theo từ khóa

### 📂 Danh mục Blog (Công khai)

- `GET /api/v0/blog-categories` - Lấy tất cả danh mục blog
- `GET /api/v0/blog-categories/:slug` - Lấy danh mục blog theo slug

### 🔧 Quản trị - Xác thực Admin

- `POST /api/v0/admin/auth/login` - Đăng nhập quản trị viên
- `POST /api/v0/admin/auth/manager/add` - Tạo tài khoản manager (chỉ ADMIN)
- `POST /api/v0/admin/auth/refresh-token` - Làm mới token admin
- `POST /api/v0/admin/auth/verify-token` - Xác minh token admin
- `POST /api/v0/admin/auth/logout` - Đăng xuất admin

### 🎯 Quản trị - Quản lý Sự kiện

- `POST /api/v0/admin/event/new` - Tạo sự kiện mới (MANAGER)
- `GET /api/v0/admin/event/all` - Lấy tất cả sự kiện (MANAGER)
- `GET /api/v0/admin/event/id/:id` - Lấy sự kiện theo ID (MANAGER)
- `GET /api/v0/admin/event/slug/:slug` - Lấy sự kiện theo slug (MANAGER)
- `PUT /api/v0/admin/event/id/:id` - Cập nhật sự kiện (MANAGER)
- `DELETE /api/v0/admin/event/id/:id` - Xóa sự kiện (MANAGER)

### 📰 Quản trị - Quản lý Blog

- `POST /api/v0/manager/blogs` - Tạo blog mới (MANAGER)
- `PUT /api/v0/manager/blogs/:id` - Cập nhật blog (MANAGER)
- `DELETE /api/v0/manager/blogs/:id` - Xóa blog (MANAGER)

### 🗂 Quản trị - Quản lý Danh mục Blog

- `POST /api/v0/manager/blog-categories` - Tạo danh mục blog (MANAGER)
- `PUT /api/v0/manager/blog-categories/:id` - Cập nhật danh mục blog (MANAGER)
- `DELETE /api/v0/manager/blog-categories/:id` - Xóa danh mục blog (MANAGER)

### 👥 Quản trị - Quản lý Người dùng

- `GET /api/v0/manager/users` - Lấy danh sách người dùng (MANAGER)
- `POST /api/v0/manager/users` - Tạo người dùng mới (MANAGER)
- `PUT /api/v0/manager/users/:id` - Cập nhật thông tin người dùng (MANAGER)
- `PUT /api/v0/manager/users/deactivate/:id` - Vô hiệu hóa người dùng (MANAGER)
- `PUT /api/v0/manager/users/activate/:id` - Kích hoạt người dùng (MANAGER)

### 📋 Tham số truy vấn phổ biến

**Phân trang:**

- `page` - Số trang (mặc định: 1)
- `limit` - Số lượng items mỗi trang (mặc định: 10)

**Lọc sự kiện:**

- `location` - Lọc theo địa điểm
- `category` - Lọc theo danh mục
- `isFree` - Lọc sự kiện miễn phí
- `startDate` - Lọc từ ngày
- `endDate` - Lọc đến ngày

**Sắp xếp:**

- `sort=ctime` - Sắp xếp theo thời gian tạo

## 🗄 Mô hình cơ sở dữ liệu

Ứng dụng sử dụng các mô hình dữ liệu chính sau:

### 👤 Quản lý người dùng

- **User** - Tài khoản người dùng (email, password, roles, profile)
- **Admin** - Tài khoản quản trị viên (username, password, roles)
- **Session** - Phiên đăng nhập và refresh token
- **ApiKey** - Khóa API cho xác thực hệ thống

### 🎪 Quản lý sự kiện

- **Event** - Thông tin cơ bản sự kiện (name, url, price, location, categories)
- **EventDetails** - Chi tiết đầy đủ sự kiện (description, venue, showings, tickets)
- **EventCategory** - Danh mục phân loại sự kiện
- **BannerEvent** - Sự kiện banner hiển thị trang chủ
- **SpecialEvent** - Sự kiện đặc biệt nổi bật

### 💳 Thanh toán & Đặt vé

- **Transaction** - Giao dịch thanh toán VNPay
- **Booking** - Đơn đặt vé hoàn tất
- **Order** - Đơn hàng với thông tin chi tiết
- **Ticket** - Thông tin vé và giá cả

### 📝 Hệ thống Blog

- **Blog** - Bài viết blog (title, content, slug, author)
- **BlogCategory** - Danh mục phân loại blog

### 🔑 Bảo mật

- **KeyToken** - Quản lý public/private key cho JWT

## 📁 Cấu trúc dự án

```
backend/
├── src/
│   ├── app.js                 # Cấu hình ứng dụng Express
│   ├── configs/               # File cấu hình
│   │   ├── jwt.config.js      # Cài đặt JWT
│   │   └── vnpay.default.js   # Cấu hình VNPay
│   ├── controllers/           # Route controllers
│   ├── core/                  # Tiện ích cốt lõi
│   │   ├── error.response.js  # Xử lý lỗi
│   │   └── success.response.js # Phản hồi thành công
│   ├── dbs/                   # Cấu hình cơ sở dữ liệu
│   │   └── init.mongodb.js    # Khởi tạo MongoDB
│   ├── middlewares/           # Middleware tùy chỉnh
│   │   ├── authMiddleware.js  # Middleware xác thực
│   │   └── authRolesMiddleware.js # Xác thực dựa trên vai trò
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── services/              # Logic nghiệp vụ
│   └── utils/                 # Hàm tiện ích
├── scripts/                   # Scripts cơ sở dữ liệu
├── server.js                  # Entry point
├── package.json              # Dependencies và scripts
└── vercel.json               # Cấu hình triển khai
```

## 🚀 Triển khai

### Triển khai Vercel

Ứng dụng được cấu hình để triển khai trên Vercel:

1. **Cài đặt Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Triển khai lên Vercel**

   ```bash
   vercel --prod
   ```

3. **Thiết lập biến môi trường** trong dashboard Vercel của bạn

### Triển khai thủ công

1. **Build ứng dụng**

   ```bash
   npm install --production
   ```

2. **Khởi chạy production server**
   ```bash
   NODE_ENV=production node server.js
   ```

## 🎭 Tài khoản demo

Để test, sử dụng thông tin đăng nhập demo sau:

**Demo User:**

- Tên người dùng: `demo-demo`
- Mật khẩu: `[Liên hệ admin để lấy mật khẩu]`

## 📝 Scripts

- `npm start` - Khởi chạy development server với nodemon
- `npm test` - Chạy tests (hiện tại chưa được cấu hình)
- `node scripts/add-slug-to-existing-blogs.js` - Migration script tạo slug cho blog cũ

## 🏗 Kiến trúc hệ thống

### Mô hình MVC

- **Models** - Định nghĩa schema và business logic với Mongoose
- **Views** - API responses (JSON)
- **Controllers** - Xử lý request/response và business logic
- **Services** - Logic nghiệp vụ phức tạp
- **Repositories** - Truy vấn cơ sở dữ liệu

### Middleware Stack

- **CORS** - Cấu hình cross-origin requests
- **Body Parser** - Parse JSON và URL-encoded data
- **Auth Middleware** - Xác thực JWT token
- **Role Middleware** - Kiểm soát quyền truy cập dựa trên vai trò
- **Error Handler** - Xử lý lỗi tập trung

### Response Pattern

- **Success Response** - Chuẩn hóa phản hồi thành công
- **Error Response** - Chuẩn hóa phản hồi lỗi
- **Async Handler** - Xử lý async/await errors

## 🔒 Tính năng bảo mật

- **JWT Authentication** - Xác thực dựa trên JSON Web Token
- **Password Hashing** - Mã hóa mật khẩu với bcrypt (salt rounds: 10)
- **Role-based Access Control** - Phân quyền ADMIN, MANAGER, CUSTOMER
- **Session Management** - Quản lý phiên với refresh token (30 ngày)
- **CORS Protection** - Cấu hình cross-origin requests
- **Input Validation** - Xác thực và làm sạch dữ liệu đầu vào
- **Secure Payment** - Tích hợp VNPay với signature verification
- **API Rate Limiting** - Bảo vệ khỏi spam requests
- **Environment Variables** - Bảo mật thông tin nhạy cảm

## 🚦 HTTP Status Codes

### Success Responses

- `200 OK` - Request thành công
- `201 Created` - Tạo resource thành công

### Error Responses

- `400 Bad Request` - Request không hợp lệ
- `401 Unauthorized` - Chưa xác thực
- `403 Forbidden` - Không có quyền truy cập
- `404 Not Found` - Resource không tồn tại
- `409 Conflict` - Xung đột dữ liệu (email đã tồn tại)
- `500 Internal Server Error` - Lỗi server

## 📘 Hướng dẫn sử dụng API

### Ví dụ Request

**POST /api/v0/auth/login**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Ví dụ Success Response

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "body": {
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### Ví dụ Error Response

```json
{
  "error": "Invalid email or password"
}
```

### Best Practices

- Sử dụng HTTPS cho tất cả requests
- Luôn gửi Authorization header với Bearer token cho routes yêu cầu xác thực
- Xử lý refresh token khi access token hết hạn
- Kiểm tra status codes và error messages trong responses


## 📄 Giấy phép

Dự án này được cấp phép theo ISC License.

## 🐛 Vấn đề & Hỗ trợ

Nếu bạn gặp bất kỳ vấn đề nào hoặc cần hỗ trợ, vui lòng tạo issue trong repository hoặc liên hệ với team phát triển.

---

**Chúc bạn code vui vẻ! 🚀**
