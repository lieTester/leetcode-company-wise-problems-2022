import fs from "fs";
import csv from "csv-parser";
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

// Function to read and process CSV files
function processCSVFiles() {
   const companySet = new Set(); // Use a Set to store distinct company names

   const filePath = `./temp/company/combined_data.csv`;
   fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
         // Assuming 'company' is the column containing the company name in the CSV
         companySet.add(row.company);
      })
      .on("end", () => {
         // Process the distinct company names and add them to the database
         companySet.forEach((companyName) => {
            // Generate a slug from the company name (e.g., replace spaces with dashes)
            const slug = companyName.toLowerCase().replace(/ /g, "-");
            addCompany(companyName, slug);
         });
         console.log("sd");
         prisma.$disconnect();
      });
}

// Run the CSV processing function
processCSVFiles();
