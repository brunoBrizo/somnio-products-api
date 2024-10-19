## Technical Decisions

Here are the key technical decisions I've made:

1. **Chunking with Lodash**: Used the `chunk` function from Lodash to break down large datasets into manageable pieces. This approach allows to process large numbers of products efficiently without overwhelming system resources.

2. **Concurrent Processing with Bluebird**: The `map` function from Bluebird is employed to process chunks concurrently. This parallel processing significantly improves performance when handling bulk operations.

3. **Database Transactions**: All database operations are wrapped in transactions. This ensures data integrity and allows for atomic operations, meaning all products in a batch are either saved successfully or rolled back in case of an error.

4. **SQL Database**: I selected a SQL database for its reliability, structured data handling, and scalability. This choice aligns with the product data requirements and supports a long-term growth strategy.
