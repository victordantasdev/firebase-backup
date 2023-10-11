# Firebase Storage Backup App

This Node.js application is designed to help you back up files from one Firebase Storage to another. It's built using TypeScript and can be easily run within a Docker container.

## Prerequisites

Before you get started, make sure you have the following:

- Node.js and npm installed
- Docker and Docker Compose installed (if you plan to use Docker)
- Firebase project details for both the source (ORIGIN) and destination (DESTINY) Firebase Storage instances.

## Environment Variables

You need to set the following environment variables in a `.env` file or your system environment for the application to work correctly:

### Source Firebase Configuration
- `ORIGIN_API_KEY`: Your source Firebase API Key
- `ORIGIN_AUTH_DOMAIN`: Your source Firebase Authentication Domain
- `ORIGIN_PROJECT_ID`: Your source Firebase Project ID
- `ORIGIN_STORAGE_BUCKET`: Your source Firebase Storage Bucket
- `ORIGIN_MESSAGING_SENDER_ID`: Your source Firebase Messaging Sender ID
- `ORIGIN_APP_ID`: Your source Firebase App ID

### Destination Firebase Configuration
- `DESTINY_API_KEY`: Your destination Firebase API Key
- `DESTINY_AUTH_DOMAIN`: Your destination Firebase Authentication Domain
- `DESTINY_PROJECT_ID`: Your destination Firebase Project ID
- `DESTINY_STORAGE_BUCKET`: Your destination Firebase Storage Bucket
- `DESTINY_MESSAGING_SENDER_ID`: Your destination Firebase Messaging Sender ID
- `DESTINY_APP_ID`: Your destination Firebase App ID

## Build the Application

If you want to build the application manually, you can run the following command:

```bash
npm run build
```

## Docker Setup

If you prefer to run the application within a Docker container, you can follow these steps:

Build the Docker image with the provided Dockerfile:
```bash
docker build -t firebase-storage-backup -f Dockerfile .
```

Or run the application using Docker Compose:

```bash
docker-compose up
```

## Usage

Once the application is set up, it will copy files from the source Firebase Storage to the destination Firebase Storage. You can customize the backup process by modifying the TypeScript code according to your specific requirements.

## License

This project is licensed under the [ISC License](LICENSE) - see the [LICENSE](LICENSE) file for details.


# Acknowledgments

Thanks to the Firebase team for providing a reliable cloud storage solution.
