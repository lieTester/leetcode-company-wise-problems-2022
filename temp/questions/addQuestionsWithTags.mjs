import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createQuestionsAndTags() {
   try {
      // Read the questions and tags data from your JSON file
      const filePath = "./temp/questions/newDataQuestions.json"; // Replace with the path to your JSON file
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      let titleData = {};
      let index = 0;
      for (const item of data) {
         const { title, titleSlug, difficulty, status, topicTags } = item;

         const que = await prisma.question_Bank.findFirst({
            where: { titleSlug: titleSlug },
         });
         if (que) {
            titleData[index] = title;
            index++;
            continue;
         }

         // Create the question with the given data
         const question = await prisma.question_Bank.create({
            data: {
               title,
               titleSlug,
               difficulty,
               status,
            },
         });

         // Find or create the tags and associate them with the question
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

            // Associate the tag with the question
            await prisma.question_Bank.update({
               where: { id: question.id },
               data: {
                  tags: {
                     connect: { id: tag.id },
                  },
               },
            });
         }
      }

      // temp to check the total que added
      const jsonString = JSON.stringify(titleData);
      // Specify the file path where you want to save the array
      const fileOutput = "./temp/questions/checkOuput.json";
      // Write the JSON string to the file
      fs.writeFile(fileOutput, jsonString, (err) => {
         if (err) {
            console.error("Error writing to file:", err);
         } else {
            console.log("Array has been written to the file.");
         }
      });

      console.log("Questions and tags added to the database successfully");
   } catch (error) {
      console.error("Error adding questions and tags to the database:", error);
   } finally {
      await prisma.$disconnect();
   }
}

// Execute the function to add questions and tags to the database
createQuestionsAndTags();
