import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return mock connection if MONGODB_URI is not configured
  if (!MONGODB_URI || MONGODB_URI.includes('mongodb+srv://username')) {
    console.warn('MongoDB URI not configured, using mock connection');
    return { 
      connection: { readyState: 1 },
      models: {},
    };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        // Return mock connection on error
        return {
          connection: { readyState: 0 },
          models: {},
        };
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Return mock connection
    return {
      connection: { readyState: 0 },
      models: {},
    };
  }
}

export default dbConnect;
