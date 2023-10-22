import fs from "fs";
import { PrismaClient } from "@prisma/client";
import pLimit from "p-limit"; // Import the p-limit library

const prisma = new PrismaClient();
const limit = pLimit(5); // Limit the concurrency to 5 connections

// Function to add company question data to the database
async function addCompanyQuestion(problemName, companies, numOccurs) {
   try {
      const question = await prisma.question_Bank.findFirst({
         where: { title: problemName },
      });

      if (question) {
         await Promise.all(
            companies.map(async (companyName, i) => {
               const company = await prisma.company.findFirst({
                  where: { name: companyName },
               });

               if (company) {
                  const count = parseInt(numOccurs[i], 10);
                  if (!isNaN(count)) {
                     await prisma.companyQuestion.create({
                        data: {
                           company: {
                              connect: { id: company.id },
                           },
                           question: {
                              connect: { id: question.id },
                           },
                           count: count,
                        },
                     });

                     // console.log(
                     //    `Added data: ${problemName} ${companyName} ${count}`
                     // );
                  } else {
                     console.error(
                        `Invalid count value for ${problemName} ${companyName}`
                     );
                  }
               } else {
                  console.error(`Company not found: ${companyName}`);
               }
            })
         );
      } else {
         console.error(`Question not found: ${problemName}`);
      }
   } catch (error) {
      console.error("Error adding data to the database:", problemName);
   }
}

// Read data from the JSON file
const jsonFilePath = "./temp/company/combined_data.json";

fs.readFile(jsonFilePath, "utf-8", (err, data) => {
   if (err) {
      console.error("Error reading the JSON file:", err);
   } else {
      const combinedData = JSON.parse(data);

      // Iterate over the data and add it to the database using concurrency control
      combinedData.forEach((item) => {
         const { problem_name, company, num_occur } = item;
         limit(() => addCompanyQuestion(problem_name, company, num_occur));
      });
   }
});
