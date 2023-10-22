import fs from "fs";

function quetionList() {
   // Read the data from the old JSON file
   const rawData = fs.readFileSync("questions/questions.json", "utf-8");
   const oldData = JSON.parse(rawData);

   // Extract the desired fields from the old data
   const newData = oldData.questions.map((question) => ({
      acRate: question.acRate,
      status: question.status,
      difficulty: question.difficulty,
      title: question.title,
      titleSlug: question.titleSlug,
      topicTags: question.topicTags.map((tags) => tags.name),
   }));

   // Write the extracted data to a new JSON file
   fs.writeFileSync(
      "questions/newDataQuestions.json",
      JSON.stringify(newData, null, 2)
   );
}
quetionList();

function extractTags() {
   function createSlug(tagName) {
      // Replace spaces with hyphens and make it lowercase
      return tagName.toLowerCase().replace(/ /g, "-");
   }

   // Read the file content as a string
   const filePath = "./tag/tags.txt"; // Replace with the path to your file
   const fileContent = fs.readFileSync(filePath, "utf-8");

   // Split the content into an array of strings (tags) and create slugs
   const tagsArray = fileContent
      .split("\n")
      .map((tag) => tag.trim()) // Remove any leading/trailing white spaces
      .filter((tag) => tag) // Remove any empty lines
      .map((tag) => ({
         name: tag,
         slug: createSlug(tag),
      }));

   // Convert the array of tags to JSON and write it to a new file
   const jsonTags = JSON.stringify(tagsArray, null, 2);
   const outputFilePath = "./tag/tags.json"; // Replace with the desired output file path

   fs.writeFileSync(outputFilePath, jsonTags);

   console.log(`Tags and slugs extracted and saved to ${outputFilePath}`);
}
// extractTags();
