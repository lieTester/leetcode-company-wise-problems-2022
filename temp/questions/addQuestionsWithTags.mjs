import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProblemsAndTags() {
   try {
      // Read the problems and tags data from your JSON file
      const filePath = "./temp/questions/newDataQuestions.json"; // Replace with the path to your JSON file
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      let titleData = {};
      let index = 0;
      for (const item of data) {
         const { title, titleSlug, difficulty, topicTags, frontEndId } = item;

         const problem = await prisma.problem.findFirst({
            where: { titleSlug: titleSlug },
         });
         if (problem) {
            titleData[index] = title;
            index++;
            continue;
         }

         // Create the problem with the given data
         const createdProblem = await prisma.problem.create({
            data: {
               title,
               description: "Add a description here", // You can customize this
               difficulty,
               frontEndId,
               titleSlug,
            },
         });

         // Find or create the tags and associate them with the problem
         for (const tagName of topicTags) {
            let tag = await prisma.tag.findFirst({ where: { name: tagName } });

            if (!tag) {
               tag = await prisma.tag.create({
                  data: {
                     name: tagName,
                     slug: createSlug(tagName), // You can create a slug here
                  },
               });
            }

            // Associate the tag with the problem
            await prisma.problem.update({
               where: { id: createdProblem.id },
               data: {
                  tags: {
                     connect: { id: tag.id },
                  },
               },
            });
         }
      }

      // temp to check the total problems added
      const jsonString = JSON.stringify(titleData);
      // Specify the file path where you want to save the array
      const fileOutput = "./temp/questions/totalProblemsAddedInDb.json";
      // Write the JSON string to the file
      fs.writeFile(fileOutput, jsonString, (err) => {
         if (err) {
            console.error("Error writing to file:", err);
         } else {
            console.log("Array has been written to the file.");
         }
      });

      console.log("Problems and tags added to the database successfully");
   } catch (error) {
      console.error("Error adding problems and tags to the database:", error);
   } finally {
      await prisma.$disconnect();
   }
}

// Execute the function to add problems and tags to the database
createProblemsAndTags();
