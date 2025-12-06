# MongoDB Setup Guide

## Prerequisites

You need MongoDB installed and running. Choose one option:

### Option A: Local MongoDB
1. **Download MongoDB**: https://www.mongodb.com/try/download/community
2. **Install MongoDB** following the installer instructions
3. **Start MongoDB**:
   ```bash
   # Windows (run as admin)
   mongod
   
   # Or install as Windows Service during installation
   ```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env.local` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm-software
   ```

---

## Setup Steps

### 1. Configure Environment Variables

Create a `.env.local` file in the project root (if not exists):

```env
MONGODB_URI=mongodb://localhost:27017/crm-software
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> **Note**: The `.env.local` file is in `.gitignore` so you'll need to create it manually

### 2. Seed the Database

Run the seed script to populate initial demo data:

```bash
pnpm run seed
```

You should see output like:
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB
🗑️  Clearing existing data...
✅ Cleared existing data
🏢 Creating demo organization...
✅ Created organization: Demo Company
👤 Creating demo user...
✅ Created user: demo@crm.com
📋 Creating leads...
✅ Created 10 leads
👥 Creating customers...
✅ Created 10 customers
💼 Creating deals...
✅ Created 10 deals
✅ Creating tasks...
✅ Created 6 tasks

✨ Database seeding completed successfully!

📝 Login credentials:
   Email: demo@crm.com
   Password: demo123
```

### 3. Start the Application

```bash
pnpm run dev
```

Navigate to `http://localhost:3000`

---

## Verification

Once the app is running, verify:

1. **Dashboard** loads with real statistics
2. **Leads page** shows 10 leads from database
3. **Customers page** displays 10 customers
4. **Pipeline page** shows deals organized by stage
5. **Tasks page** lists tasks filtered by status
6. **Data persists** after page refresh

---

## Troubleshooting

### MongoDB Connection Errors

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`
- **Solution**: Make sure MongoDB is running. Start it with `mongod` command.

**Error**: `MongoParseError: Invalid connection string`
- **Solution**: Check your `MONGODB_URI` in `.env.local`

### Seed Script Fails

**Error**: `Cannot find module '../models/Organization'`
- **Solution**: Make sure all model files were created correctly

**Error**: `E11000 duplicate key error`
- **Solution**: The fixed organization ID already exists. Drop the database:
  ```bash
  mongosh
  > use crm-software
  > db.dropDatabase()
  > exit
  ```
  Then run seed again.

### No Data Showing

- Check browser console for API errors
- Verify MongoDB is running
- Check that seed script completed successfully
- Ensure `.env.local` is properly configured

---

## Database Structure

After seeding, your MongoDB database will have:

- **organizations** collection: 1 document
- **users** collection: 1 document  
- **leads** collection: 10 documents
- **customers** collection: 10 documents
- **deals** collection: 10 documents
- **tasks** collection: 6 documents

You can view the data using:
- MongoDB Compass GUI
- mongosh CLI
- Any MongoDB client

---

## Next Steps

Now that your database is set up:

1. Explore the application and see real data
2. Try creating, updating, and deleting records
3. Verify data persists across page reloads
4. Check that filtering and pagination work
5. Test the API endpoints using the browser network tab

For more details, see the [walkthrough documentation](file:///c:/Users/Jahid/.gemini/antigravity/brain/00a77cea-18a3-40a0-8fb8-691b43155b22/walkthrough.md).
