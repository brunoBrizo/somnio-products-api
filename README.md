## Technical Decisions

Here are the key technical decisions I've made:

1. **Chunking with Lodash**: Used the `chunk` function from Lodash to break down large datasets into manageable pieces. This approach allows to process large numbers of products efficiently without overwhelming system resources.

2. **Concurrent Processing with Bluebird**: The `map` function from Bluebird is employed to process chunks concurrently. This parallel processing significantly improves performance when handling bulk operations.

3. **Database Transactions**: All database operations are wrapped in transactions. This ensures data integrity and allows for atomic operations, meaning all products in a batch are either saved successfully or rolled back in case of an error.

4. **PostgreSQL Database**: We've chosen PostgreSQL as our SQL database, specifically using the cloud-native offering from https://neon.tech/. This selection combines the reliability, structured data handling, and scalability of PostgreSQL with Neon's serverless, auto-scaling, and branching capabilities.

5. **Google Cloud Deployment**: The application is deployed on Google Cloud Platform using the following services:
   - **Artifact Registry**: For storing and managing Docker container images.
   - **Cloud Build**: For automating the build and deployment process.
   - **Cloud Run**: For running the containerized application in a fully managed, serverless environment.

6. **Unit Testing**: The codebase includes a suite of unit tests. These tests cover critical functionality, ensuring code reliability and making it easier to maintain and refactor the application as it grows.
