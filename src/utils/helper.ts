import fs from "fs";
import path from "path";

export const importGraphQL = (file: string) => {
  return fs.readFileSync(path.join(__dirname, file), "utf-8");
};
