import fs from "fs/promises";

const startReading = async (fileName: string) => {
  const data = await fs.readFile(__dirname + fileName, "utf8");
  return data;
};

export { startReading };
