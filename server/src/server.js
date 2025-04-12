const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB();
    console.log('Database connected');

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
