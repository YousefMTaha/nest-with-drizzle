# Inventory Management System

A robust inventory management system built with NestJS, designed to handle SKU (Stock Keeping Unit) and Inventory Branch management efficiently.

## Features

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

## Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Additional Libraries**:
  - `bwip-js` for barcode generation
  - `qrcode` for QR code generation
  - `@nestjs/config` for configuration management

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```makefile
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=inventory_management
DB_SYNCHRONIZE=true
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Docker Setup

You can run this application using Docker. This will set up both the application and PostgreSQL database in containers.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Build and start the containers:

```bash
docker-compose up -d
```

2. The application will be available at:
   - API: `http://localhost:3001`
   - Swagger Documentation: `http://localhost:3001/api`
   - PostgreSQL: `localhost:5432`

### Docker Commands

```bash
# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Remove volumes (will delete database data)
docker-compose down -v
```

## API Endpoints

### SKU Management

- `POST /sku` - Create a new SKU
- `GET /sku/search` - Search SKUs with filters
- `PUT /sku/:id/deactivate` - Deactivate a SKU

### Inventory Branch Management

- `POST /inventory-branch` - Create a new branch
- `GET /inventory-branch` - List all branches
- `GET /inventory-branch/:id` - Get branch details
- `PUT /inventory-branch/:id` - Update branch information

## API Documentation

The API documentation is available through Swagger UI. After starting the application, visit:

```bash
http://localhost:3001/api
```

This will provide an interactive documentation interface where you can:
- View all available endpoints
- Test API endpoints directly
- See request/response schemas
- View detailed parameter descriptions

## Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── config/             # Configuration files
├── inventory-branch/   # Inventory Branch module
├── sku/               # SKU module
└── shared/            # Shared utilities and interfaces
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
