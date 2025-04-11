// src/config/config.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  logLevel: string;
}

const config: Config = {
  port: parseInt('3000', 10),
  nodeEnv: 'development',
  logLevel: 'info',
};

export default config;
