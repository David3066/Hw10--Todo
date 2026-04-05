const SupabaseProvider = require('./SupabaseProvider');
const MongoDBProvider = require('./MongoDBProvider');

// Factory function to create database provider based on environment
function createDatabaseProvider() {
  const dbType = process.env.DB_TYPE || 'supabase';

  if (dbType === 'supabase') {
    return new SupabaseProvider(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  } else if (dbType === 'mongodb') {
    return new MongoDBProvider(process.env.MONGO_URI);
  } else {
    throw new Error(`Unknown database type: ${dbType}`);
  }
}

module.exports = createDatabaseProvider;
