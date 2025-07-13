# Backend Documentation - My Ticket App

## Table of Contents

1. [Tổng quan](#tổng-quan)
2. [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
3. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
4. [API Documentation](#api-documentation)
5. [Database Schema](#database-schema)
6. [Best Practices](#best-practices)
7. [Deployment](#deployment)

---

## Tổng quan / Overview

### Tiếng Việt

My Ticket App là một ứng dụng quản lý sự kiện và blog được xây dựng với Node.js, Express và MongoDB. Backend được thiết kế theo mô hình MVC (Model-View-Controller) với kiến trúc layered architecture.

### English

My Ticket App is an event management and blog application built with Node.js, Express, and MongoDB. The backend is designed following the MVC (Model-View-Controller) pattern with a layered architecture.

---

## Kiến trúc hệ thống / System Architecture

### Tiếng Việt

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Middleware    │
                       │   (Auth, CORS)  │
                       └─────────────────┘
```

### English

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Middleware    │
                       │   (Auth, CORS)  │
                       └─────────────────┘
```

---

## Cấu trúc thư mục / Directory Structure

```
backend/
├── src/
│   ├── configs/           # Cấu hình hệ thống
│   ├── constants/         # Hằng số
│   ├── controllers/       # Xử lý request/response
│   ├── core/             # Core utilities (response, error)
│   ├── dbs/              # Database connection
│   ├── middleware/       # Middleware functions
│   ├── models/           # Database schemas
│   │   └── repositories/ # Data access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── scripts/              # Database scripts
├── server.js             # Entry point
└── package.json
```

---

## API Documentation

### Base URL

```
http://localhost:3055
```

### Authentication Endpoints

#### User Authentication

```http
POST /api/v0/auth/signup
POST /api/v0/auth/login
```

#### Admin Authentication

```http
POST /api/v0/admin/auth/login
POST /api/v0/admin/auth/manager/add
```

### Blog Category Endpoints

#### Public APIs

```http
GET /api/v1/blog-categories
GET /api/v1/blog-categories/:slug
```

#### Manager APIs (Authentication Required)

```http
POST /api/v1/manager/blog-categories
PATCH /api/v1/manager/blog-categories/:id
DELETE /api/v1/manager/blog-categories/:id
```

### Blog Endpoints

#### Public APIs

```http
GET /api/v1/blogs
GET /api/v1/blogs/:slug
GET /api/v1/blogs/search/:keySearch
```

#### Manager APIs (Authentication Required)

```http
POST /api/v1/manager/blogs
PATCH /api/v1/manager/blogs/:id
DELETE /api/v1/manager/blogs/:id
```

### Event Endpoints

```http
GET /api/v0/event/all
GET /api/v0/event/:slug
```

---

## Database Schema

### Blog Category Schema

```javascript
{
  id: Number,              // Auto-increment ID
  slug: String,            // URL-friendly identifier
  name: String,            // Category name (required)
  description: String,     // Category description
  status: String,          // 'ACTIVE' | 'INACTIVE'
  createdAt: Date,         // Timestamp
  updatedAt: Date          // Timestamp
}
```

**Features:**

- Auto-increment ID using mongoose-sequence
- Auto-generated slug from name
- Status management for soft delete
- Timestamps for audit trail

### Blog Schema

```javascript
{
  article_id: Number,           // Auto-increment ID
  article_friendly_time: String, // Formatted time display
  article_datetime: Date,       // Publication date
  published_date: String,       // Vietnamese formatted date
  title: String,               // Blog title (required)
  short_description: String,    // Brief description
  thumpnail: String,           // Featured image URL
  author: String,              // Author name
  summary: String,             // Article summary
  slug: String,                // URL-friendly identifier
  content: [String],           // Article content (array)
  category: ObjectId,          // Reference to BlogCategory
}
```

**Features:**

- Auto-increment article_id
- Auto-generated friendly time formats
- Full-text search indexing
- Category relationship
- Auto-generated slug from title

---

## Best Practices Implementation

### 1. Layered Architecture

#### Controller Layer

```javascript
// controllers/blog.controller.js
class BlogController {
  createBlog = async (req, res, next) => {
    new CREATED({
      message: 'Create new blog success',
      metadata: await blogService.createBlog(req.body),
    }).send(res)
  }
}
```

**Best Practices:**

- ✅ Single Responsibility Principle
- ✅ Dependency Injection
- ✅ Consistent Response Format
- ✅ Error Handling with asyncHandler

#### Service Layer

```javascript
// services/blog.service.js
class BlogService {
  static async createBlog(payload) {
    return await blogModel.create(payload)
  }

  static async findAllBlogs({
    limit = 10,
    sort = 'ctime',
    page = 1,
    filter = {},
    select = [],
  }) {
    // Business logic implementation
  }
}
```

**Best Practices:**

- ✅ Static methods for stateless operations
- ✅ Parameter validation and defaults
- ✅ Separation of concerns
- ✅ Repository pattern integration

#### Repository Layer

```javascript
// models/repositories/blog.repository.js
const findAllBlogs = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy =
    sort === 'ctime' ? { article_datetime: -1 } : { article_datetime: 1 }

  return await blogModel
    .find(filter)
    .populate('category', 'name -_id')
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}
```

**Best Practices:**

- ✅ Data access abstraction
- ✅ Query optimization with lean()
- ✅ Population for relationships
- ✅ Pagination support

### 2. Error Handling

#### Custom Error Classes

```javascript
// core/error.response.js
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = 'Bad request error', statusCode = 403) {
    super(message, statusCode)
  }
}
```

#### Async Handler

```javascript
// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
```

### 3. Response Standardization

#### Success Response

```javascript
// core/success.response.js
class SuccessResponse {
  constructor({ message, statusCode = 200, metadata = {} }) {
    this.message = message
    this.status = statusCode
    this.metadata = metadata
  }

  send(res, header = {}) {
    return res.status(this.status).json(this)
  }
}
```

### 4. Database Schema Design

#### Blog Category Schema

```javascript
// Auto-increment with unique counter
blogCategorySchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'blog_category_seq',
})

// Auto-generate slug
blogCategorySchema.pre('save', function (next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
  next()
})
```

#### Blog Schema

```javascript
// Full-text search indexing
blogSchema.index({ title: 'text', short_description: 'text', summary: 'text' })

// Auto-generate timestamps
blogSchema.pre('save', function (next) {
  if (!this.article_datetime) {
    this.article_datetime = new Date()
  }

  if (!this.article_friendly_time || this.isModified('article_datetime')) {
    this.article_friendly_time = generateFriendlyTime(this.article_datetime)
  }

  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  next()
})
```

### 5. API Design Patterns

#### RESTful Endpoints

```javascript
// Public routes
router.get('/api/v1/blogs', asyncHandler(blogController.getAllBlogs))
router.get('/api/v1/blogs/:slug', asyncHandler(blogController.getBlogBySlug))

// Manager routes (protected)
router.post('/api/v1/manager/blogs', asyncHandler(blogController.createBlog))
router.patch(
  '/api/v1/manager/blogs/:id',
  asyncHandler(blogController.updateBlog),
)
router.delete(
  '/api/v1/manager/blogs/:id',
  asyncHandler(blogController.deleteBlog),
)
```

#### Query Parameters Support

```javascript
// Pagination
GET /api/v1/blogs?page=1&limit=10

// Filtering
GET /api/v1/blogs?filter={"category":"6872570e9c0a4474ee9fb68d"}

// Sorting
GET /api/v1/blogs?sort=ctime

// Field selection
GET /api/v1/blogs?select=title,author,summary
```

### 6. Security Best Practices

#### CORS Configuration

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)
```

#### Environment Variables

```javascript
// configs/jwt.config.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
}
```

### 7. Performance Optimization

#### Database Indexing

```javascript
// Text search index
blogSchema.index({ title: 'text', short_description: 'text', summary: 'text' })

// Unique constraints
blogSchema.index({ slug: 1 }, { unique: true })
blogCategorySchema.index({ slug: 1 }, { unique: true })
```

#### Query Optimization

```javascript
// Use lean() for read-only operations
const blogs = await blogModel
  .find(filter)
  .lean()

  // Population for relationships
  .populate('category', 'name -_id')

  // Field selection
  .select(selectFields)
```

---

## Deployment

### Environment Variables

```bash
# Database
PRODUCT_MONGODB_URI=mongodb://localhost:27017/myticket
MONGODB_URI=mongodb://localhost:27017/myticket

# Server
PORT=3055

# CORS
CORS_ORIGIN=http://localhost:3000

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

### Production Checklist

#### Security

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use helmet.js for security headers

#### Performance

- [ ] Enable database indexing
- [ ] Implement caching (Redis)
- [ ] Use compression middleware
- [ ] Optimize database queries
- [ ] Enable gzip compression

#### Monitoring

- [ ] Add logging (Winston/Morgan)
- [ ] Implement health checks
- [ ] Set up error tracking
- [ ] Monitor database performance
- [ ] Add API documentation (Swagger)

---

## SOLID-GRASP-GoF Combined Framework Evaluation

### SOLID Principles

#### Single Responsibility Principle (SRP)

✅ **Controller**: Only handles HTTP requests/responses
✅ **Service**: Only contains business logic
✅ **Repository**: Only handles data access
✅ **Model**: Only defines data structure

#### Open/Closed Principle (OCP)

✅ **Response Classes**: Extensible for new response types
✅ **Service Layer**: Open for extension, closed for modification
✅ **Repository Pattern**: Allows new data sources without changing business logic

#### Liskov Substitution Principle (LSP)

✅ **Error Classes**: All error types can be substituted
✅ **Response Classes**: Consistent interface across all response types

#### Interface Segregation Principle (ISP)

✅ **Repository Pattern**: Specific interfaces for different data operations
✅ **Service Methods**: Focused on specific business operations

#### Dependency Inversion Principle (DIP)

✅ **Service depends on Repository abstraction**
✅ **Controller depends on Service abstraction**

### GRASP Principles

#### Creator

✅ **Models create their own instances**
✅ **Services create domain objects**

#### Information Expert

✅ **Repository knows how to query data**
✅ **Service knows business rules**
✅ **Controller knows HTTP handling**

#### Low Coupling

✅ **Layers communicate through interfaces**
✅ **Dependencies injected through modules**

#### High Cohesion

✅ **Each class has focused responsibilities**
✅ **Related functionality grouped together**

#### Controller

✅ **Controllers handle HTTP concerns only**
✅ **Business logic delegated to services**

#### Polymorphism

✅ **Different response types use same interface**
✅ **Error handling unified through base classes**

#### Pure Fabrication

✅ **Repository pattern for data access abstraction**
✅ **Service layer for business logic separation**

#### Indirection

✅ **Middleware handles cross-cutting concerns**
✅ **AsyncHandler provides error handling indirection**

#### Protected Variations

✅ **Database changes isolated in repository**
✅ **Business logic changes isolated in service**

### GoF Design Patterns

#### Factory Pattern

✅ **Response classes create appropriate response objects**
✅ **Error classes create specific error types**

#### Repository Pattern

✅ **Data access abstraction in repositories**
✅ **Consistent interface for data operations**

#### Template Method Pattern

✅ **Base response classes define response structure**
✅ **Pre-save hooks define document lifecycle**

#### Strategy Pattern

✅ **Different sorting strategies in queries**
✅ **Different filter strategies in services**

#### Observer Pattern

✅ **Mongoose middleware hooks**
✅ **Pre-save and pre-update hooks**

---

## Conclusion

### Tiếng Việt

Backend của My Ticket App được thiết kế theo các best practices hiện đại với kiến trúc layered, separation of concerns rõ ràng, và tuân thủ các nguyên tắc SOLID, GRASP, và GoF Design Patterns. Hệ thống blog và blog category được implement với đầy đủ tính năng CRUD, search, pagination và security.

### English

The My Ticket App backend is designed following modern best practices with layered architecture, clear separation of concerns, and adherence to SOLID, GRASP, and GoF Design Patterns. The blog and blog category systems are implemented with full CRUD functionality, search, pagination, and security features.

---

## Contact & Support

For technical support or questions about this documentation, please contact the development team.

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Development Team
