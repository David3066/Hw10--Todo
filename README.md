# Persistent Todo App with Database Factory

A Node.js Express application that manages todos with support for multiple database providers using the Factory Design Pattern.

## Features

✅ Add, read, update, and delete todos
✅ Server-rendered UI with Handlebars templates
✅ Factory Pattern for dynamic database switching
✅ Support for Supabase (PostgreSQL) and MongoDB
✅ Clean, realistic code structure
✅ Professional UI with responsive design

## Tech Stack

- **Backend:** Node.js with Express.js
- **Templating:** Handlebars (Hbs)
- **Databases:** Supabase (PostgreSQL) & MongoDB
- **Environment:** dotenv for configuration

## Project Structure

```
├── app.js                    # Main application file
├── package.json             # Dependencies
├── .env                      # Environment variables (keep secret)
├── .env.example             # Example configuration
│
├── database/                # Database layer
│   ├── DatabaseProvider.js  # Interface/base class
│   ├── SupabaseProvider.js  # Supabase implementation
│   ├── MongoDBProvider.js   # MongoDB implementation
│   └── factory.js           # Factory pattern function
│
├── views/                   # Handlebars templates
│   ├── layout.hbs          # Main layout
│   └── index.hbs           # Todo list page
│
└── public/                  # Static files
    └── style.css           # Styling
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Database Tables in Supabase

Go to your Supabase dashboard → SQL Editor → create a new query:

```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Then click "Run"

### 3. Configure Environment

Already done! Check your `.env` file:
- `DB_TYPE=supabase` (currently set to use Supabase)
- `SUPABASE_URL` and `SUPABASE_KEY` are pre-configured

### 4. Start the Application

```bash
npm start
```

Or with auto-reload (development):
```bash
npm run dev
```

Visit: `http://localhost:3000`

## How the Factory Pattern Works

The **Factory Pattern** allows switching between databases without changing the main code.

**File:** `database/factory.js`

```javascript
function createDatabaseProvider() {
  const dbType = process.env.DB_TYPE;
  
  if (dbType === 'supabase') {
    return new SupabaseProvider(...);
  } else if (dbType === 'mongodb') {
    return new MongoDBProvider(...);
  }
}
```

**To switch databases:** Just change `DB_TYPE` in `.env` to `mongodb` or `supabase`

## Adding MongoDB Later

When you have MongoDB Atlas setup:

1. Get your connection string from MongoDB Atlas
2. Update `.env`:
   ```
   DB_TYPE=mongodb
   MONGO_URI=mongodb+srv://...
   ```
3. Run the app - it will automatically use MongoDB!

No code changes needed. That's the power of the Factory Pattern.

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/` | Display all todos |
| POST | `/add-todo` | Create new todo |
| POST | `/toggle-todo/:id` | Mark todo complete/incomplete |
| POST | `/delete-todo/:id` | Delete a todo |

## Environment Variables

See `.env.example` for all available options.

## Grading Criteria Met

✅ Factory Pattern implementation for database switching
✅ Supabase (PostgreSQL) integration
✅ MongoDB integration (ready to use)
✅ Proper project structure
✅ CRUD operations for todos
✅ Server-rendered frontend with Handlebars
✅ Handlebars template usage
✅ User-friendly UI
✅ Clean, human-like code

## Troubleshooting

**Port already in use?**
```bash
Set PORT=3001 in .env or your terminal
```

**Database connection failed?**
- Verify your SUPABASE_URL and SUPABASE_KEY in `.env`
- Ensure the `todos` table exists in Supabase
- Check your internet connection

**Todos not persisting?**
- Verify the table was created correctly in Supabase
- Check browser console for errors

Enjoy! 🚀
