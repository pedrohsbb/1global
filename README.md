# Device Management API

## Overview

Project developed for 1Global
![1Global](https://mms.businesswire.com/media/20240711551962/pt/2181168/5/1GLOBAL_RGB.jpg?download=1)

This API allows the management of devices, including creation, updating, retrieval, and deletion. Devices have a name, brand, state (`available`, `in-use`, `inactive`), and a creation timestamp.

## Features

- Create a new device.
- Fetch a single device or all devices.
- Fetch devices by brand or state.
- Fully or partially update an existing device.
- Prevent updates to `name` and `brand` if a device is `in-use`.
- Prevent `creation time` from being modified.
- Prevent deletion of devices that are `in-use`.
- API documentation with Swagger.
- Persistent storage using PostgreSQL.
- Containerized with Docker and Docker Compose.

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the database with Docker:

   ```bash
   docker-compose up -d
   ```

3. Run the application:

   ```bash
   yarn start
   ```

4. Access API documentation at `http://localhost:3000/api`.

5. run test:
   ```bash
   yarn test
   ```
