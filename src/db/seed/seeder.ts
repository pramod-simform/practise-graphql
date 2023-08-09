import fs from "fs";
import mongoose from "mongoose";
import path from "path";

import { config } from "dotenv";
import AllModels from "../models/index.model.js";

config();

// MongoDB connection URL
const mongoUrl = process.env.DB_URL;

// Create a Mongoose connection
mongoose.connect(`${mongoUrl}`);

// Get the directory name of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const jsonFilesDir = path.join(__dirname, "../../../sampleDB");

function changeModelNameCase(modelName: string) {
  return modelName.slice(0, 1).toLocaleUpperCase() + modelName.slice(1, -1);
}

// Function to read and seed JSON files
async function seedJsonFiles() {
  try {
    const jsonFiles = fs
      .readdirSync(jsonFilesDir)
      .filter((file) => file.endsWith(".json"));

    for (const jsonFile of jsonFiles) {
      try {
        const filePath = path.join(jsonFilesDir, jsonFile);
        const rawData = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(rawData);
  
        const modelName: string = path.basename(jsonFile, ".json");
  
        const Model = AllModels[modelName as keyof typeof AllModels];
        if (Model) {
          await Model.collection.insertMany(jsonData);
          console.log(`Seeded data from ${jsonFile} into collection ${modelName}`);
        } else {
          console.log(`No model registered for ${modelName}`);
        }
      } catch(e) {
        console.log("🚀 ~ file: seeder.ts:48 ~ seedJsonFiles ~ e:", e)
      }
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Call the seeding function
seedJsonFiles();
