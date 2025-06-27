# chuyenminhke blog

## quick start

1. clone the repo
2. make sure you have `node>=22` and `bun` installed
3. important: make sure you have a postgresql database running and create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/example
   ```

   Replace `username`, `password`, and `example` with your actual PostgreSQL credentials and database name.

4. run:

   ```bash
   bun i
   ```

5. run the dev server:

   ```bash
   bun dev
   ```

6. open your browser and go to `http://localhost:3000`

7. if you want to build like on vercel, run:

   ```bash
   bun vercel-build
   ```

8. test the build:

   ```bash
   bun start
   ```
