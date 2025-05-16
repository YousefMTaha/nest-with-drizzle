# Inventory Management System

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

A modern, robust inventory management system built with NestJS, designed to handle SKU (Stock Keeping Unit) and Inventory Branch management efficiently. Using Drizzle ORM for database operations, this system provides a solid foundation for managing inventory across multiple branches.

## ✨ Features

### SKU Management

- Create new SKUs with automatic code generation
- Search SKUs with flexible filters
- Deactivate SKUs when needed
- Automatic barcode and QR code generation for each SKU

### Inventory Branch Management

- Create and manage multiple inventory branches
- Track branch details including location and contact information
- Update branch information as needed
- List all active branches

## 🛠️ Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Additional Libraries**:
  - `bwip-js` for barcode generation
  - `qrcode` for QR code generation
  - `@nestjs/config` for configuration management
  - `@nestjs/swagger` for API documentation
  - `nanoid` and `uuid` for unique ID generation

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/YousefMTaha/nest-with-drizzle.git
   cd nest-with-drizzle
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=admin
   DB_DATABASE=inventory_management
   DB_SYNCHRONIZE=true
   ```

## ▶️ Running the Application

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## 🐳 Docker Setup

You can run this application using Docker. This will set up both the application and PostgreSQL database in containers.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Build and start the containers:

   ```bash
   # For development environment
   docker-compose -f docker-compose.dev.yml up -d

   # For production environment
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. The application will be available at:
   - API: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/swagger`
   - PostgreSQL: `localhost:5432`

### Docker Commands

```bash
# View logs (development)
docker-compose -f docker-compose.dev.yml logs -f

# View logs (production)
docker-compose -f docker-compose.prod.yml logs -f

# Stop containers (development)
docker-compose -f docker-compose.dev.yml down

# Stop containers (production)
docker-compose -f docker-compose.prod.yml down

# Rebuild and restart (development)
docker-compose -f docker-compose.dev.yml up -d --build

# Rebuild and restart (production)
docker-compose -f docker-compose.prod.yml up -d --build

# Remove volumes (will delete database data) (development)
docker-compose -f docker-compose.dev.yml down -v

# Remove volumes (will delete database data) (production)
docker-compose -f docker-compose.prod.yml down -v
```

## 📡 API Endpoints

### SKU Management

- `POST /sku` - Create a new SKU
- `GET /sku/search` - Search SKUs with filters
- `PUT /sku/:id/deactivate` - Deactivate a SKU

### Inventory Branch Management

- `POST /inventory-branch` - Create a new branch
- `GET /inventory-branch` - List all branches
- `GET /inventory-branch/:id` - Get branch details
- `PUT /inventory-branch/:id` - Update branch information

## 📚 API Documentation

The API documentation is available through Swagger UI. After starting the application, visit:

```
http://localhost:3001/api
```

This will provide an interactive documentation interface where you can:

- View all available endpoints
- Test API endpoints directly
- See request/response schemas
- View detailed parameter descriptions

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📂 Project Structure

```
src/
├── common/             # Common utilities and filters
├── db/                 # Database configuration and migrations
├── inventory-branch/   # Inventory Branch module
│   └── dtos/           # Data Transfer Objects
├── sku/                # SKU module
│   └── dtos/           # Data Transfer Objects
└── main.ts             # Application entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
