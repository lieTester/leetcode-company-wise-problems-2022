import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to add a company to the database
async function addCompany(name, slug) {
   try {
      const existingCompany = await prisma.company.findFirst({
         where: { name },
      });

      if (!existingCompany) {
         const newCompany = await prisma.company.create({
            data: { name, slug },
         });

         console.log(`Added company: ${name}`);
      } else {
         console.log(`Company already exists: ${name}`);
      }
   } catch (error) {
      console.error(`Error adding company: ${name}`, error);
   }
}

// Function to read and process JSON data
function processJSONData() {
   const companySet = new Set([]); // Use a Set to store distinct company names

   const filePath = `./temp/company/combined_data.json`;
   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         console.error("Error reading JSON file:", err);
         prisma.$disconnect();
         return;
      }

      const jsonData = JSON.parse(data);

      // Process the distinct company names and add them to the database
      jsonData.forEach((row) => {
         if (Array.isArray(row.company)) {
            row.company.forEach((companyName) => {
               companySet.add(companyName);
            });
         }
      });
      companySet.forEach((company) => {
         const slug = company.toLowerCase().replace(/ /g, "-");
         // console.log(companySet);
         addCompany(company, slug);
      });

      prisma.$disconnect();
   });
}

// Run the JSON data processing function
processJSONData();
