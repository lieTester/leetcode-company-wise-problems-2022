import fs from "fs";
import { PrismaClient } from "@prisma/client";

async function main() {
   const prisma = new PrismaClient();

   try {
      // Read tags from tag.json
      const tagFilePath = "./temp/tag/tags.json"; // Replace with the path to your JSON file
      const tagsData = fs.readFileSync(tagFilePath, "utf-8");
      const tagsArray = JSON.parse(tagsData);

      // Add tags to the database
      for (const tag of tagsArray) {
         const { name, slug } = tag;
         await prisma.tag.create({
            data: {
               name,
               slug,
            },
         });
      }

      console.log("Tags added to the database successfully");
   } catch (error) {
      console.error("Error adding tags to the database:", error);
   } finally {
      await prisma.$disconnect();
   }
}

main().catch(console.error);
