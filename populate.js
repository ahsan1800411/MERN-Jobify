import dotenv from 'dotenv';
dotenv.config();
import { readFile } from 'fs/promises';

import { connectDB } from './config/db.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();

    const allJobs = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );
    await Job.create(allJobs);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
