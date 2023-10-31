import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createUser = async () => {
   await prisma.user
      .create({
         data: {
            username: "default",
            email: "default@codeSlug.code",
            profile: "default",
         },
      })
      .then((res) => {
         console.log(res);
      });
};
// createUser();

const createList = async () => {
   const lists = [
      {
         name: "Blind 75",
         slug: "blind-75",
         isPublic: true,
         userId: "a0c441b7-585e-4954-a8b8-32e10e4d92d8",
      },
      {
         name: "Neetcode 150",
         slug: "neetcode-150",
         isPublic: true,
         userId: "a0c441b7-585e-4954-a8b8-32e10e4d92d8",
      },
      {
         name: "Striver SDE Sheet",
         slug: "striver-sde-sheet",
         isPublic: true,
         userId: "a0c441b7-585e-4954-a8b8-32e10e4d92d8",
      },
   ];
   lists.forEach(async ({ name, slug, isPublic, userId }) => {
      await prisma.list
         .create({
            data: {
               name,
               slug,
               isPublic,
               userId,
            },
         })
         .then((res) => console.log(res));
   });
};

// createList();
async function connectProblemsToList() {
   try {
      const problemUrls = [
         "https://leetcode.com/problems/implement-trie-prefix-tree/",
         "https://leetcode.com/problems/word-search-ii/",
         "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
         "https://leetcode.com/problems/container-with-most-water/",
         "https://leetcode.com/problems/trapping-rain-water/",
         "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
         "https://leetcode.com/problems/3sum/",
         "https://leetcode.com/problems/valid-palindrome/",
         "https://leetcode.com/problems/group-anagrams/",
         "https://leetcode.com/problems/top-k-frequent-elements/",
         "https://leetcode.com/problems/product-of-array-except-self/",
         "https://leetcode.com/problems/valid-sudoku/",
         "https://leetcode.com/problems/longest-consecutive-sequence/",
         "https://leetcode.com/problems/valid-anagram/",
         "https://leetcode.com/problems/contains-duplicate/",
         "https://leetcode.com/problems/two-sum/",
         "https://leetcode.com/problems/encode-and-decode-strings/",
         "https://leetcode.com/problems/single-number/",
         "https://leetcode.com/problems/number-of-1-bits/",
         "https://leetcode.com/problems/counting-bits/",
         "https://leetcode.com/problems/reverse-bits/",
         "https://leetcode.com/problems/missing-number/",
         "https://leetcode.com/problems/sum-of-two-integers/",
         "https://leetcode.com/problems/reverse-integer/",
         "https://leetcode.com/problems/set-matrix-zeroes/",
         "https://leetcode.com/problems/happy-number/",
         "https://leetcode.com/problems/rotate-image/",
         "https://leetcode.com/problems/spiral-matrix/",
         "https://leetcode.com/problems/plus-one/",
         "https://leetcode.com/problems/multiply-strings/",
         "https://leetcode.com/problems/detect-squares/",
         "https://leetcode.com/problems/powx-n/",
         "https://leetcode.com/problems/insert-interval/",
         "https://leetcode.com/problems/merge-intervals/",
         "https://leetcode.com/problems/non-overlapping-intervals/",
         "https://leetcode.com/problems/meeting-rooms/",
         "https://leetcode.com/problems/meeting-rooms-ii/",
         "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
         "https://leetcode.com/problems/maximum-subarray/",
         "https://leetcode.com/problems/jump-game/",
         "https://leetcode.com/problems/jump-game-ii/",
         "https://leetcode.com/problems/gas-station/",
         "https://leetcode.com/problems/hand-of-straights/",
         "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
         "https://leetcode.com/problems/partition-labels/",
         "https://leetcode.com/problems/valid-parenthesis-string/",
         "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
         "https://leetcode.com/problems/unique-paths/",
         "https://leetcode.com/problems/regular-expression-matching/",
         "https://leetcode.com/problems/burst-balloons/",
         "https://leetcode.com/problems/edit-distance/",
         "https://leetcode.com/problems/distinct-subsequences/",
         "https://leetcode.com/problems/interleaving-string/",
         "https://leetcode.com/problems/target-sum/",
         "https://leetcode.com/problems/coin-change-ii/",
         "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
         "https://leetcode.com/problems/longest-common-subsequence/",
         "https://leetcode.com/problems/climbing-stairs/",
         "https://leetcode.com/problems/min-cost-climbing-stairs/",
         "https://leetcode.com/problems/house-robber/",
         "https://leetcode.com/problems/house-robber-ii/",
         "https://leetcode.com/problems/longest-palindromic-substring/",
         "https://leetcode.com/problems/palindromic-substrings/",
         "https://leetcode.com/problems/maximum-product-subarray/",
         "https://leetcode.com/problems/word-break/",
         "https://leetcode.com/problems/longest-increasing-subsequence/",
         "https://leetcode.com/problems/decode-ways/",
         "https://leetcode.com/problems/coin-change/",
         "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
         "https://leetcode.com/problems/alien-dictionary/",
         "https://leetcode.com/problems/swim-in-rising-water/",
         "https://leetcode.com/problems/network-delay-time/",
         "https://leetcode.com/problems/min-cost-to-connect-all-points/",
         "https://leetcode.com/problems/reconstruct-itinerary/",
         "https://leetcode.com/problems/number-of-islands/",
         "https://leetcode.com/problems/clone-graph/",
         "https://leetcode.com/problems/max-area-of-island/",
         "https://leetcode.com/problems/pacific-atlantic-water-flow/",
         "https://leetcode.com/problems/surrounded-regions/",
         "https://leetcode.com/problems/rotting-oranges/",
         "https://leetcode.com/problems/course-schedule/",
         "https://leetcode.com/problems/course-schedule-ii/",
         "https://leetcode.com/problems/word-ladder/",
         "https://leetcode.com/problems/redundant-connection/",
         "https://leetcode.com/problems/walls-and-gates/",
         "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
         "https://leetcode.com/problems/graph-valid-tree/",
         "https://leetcode.com/problems/n-queens/",
         "https://leetcode.com/problems/subsets/",
         "https://leetcode.com/problems/palindrome-partitioning/",
         "https://leetcode.com/problems/combination-sum/",
         "https://leetcode.com/problems/permutations/",
         "https://leetcode.com/problems/subsets-ii/",
         "https://leetcode.com/problems/word-search/",
         "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
         "https://leetcode.com/problems/combination-sum-ii/",
         "https://leetcode.com/problems/find-median-from-data-stream/",
         "https://leetcode.com/problems/k-closest-points-to-origin/",
         "https://leetcode.com/problems/kth-largest-element-in-an-array/",
         "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
         "https://leetcode.com/problems/last-stone-weight/",
         "https://leetcode.com/problems/design-twitter/",
         "https://leetcode.com/problems/task-scheduler/",
         "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
         "https://leetcode.com/problems/diameter-of-binary-tree/",
         "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
         "https://leetcode.com/problems/binary-tree-level-order-traversal/",
         "https://leetcode.com/problems/balanced-binary-tree/",
         "https://leetcode.com/problems/same-tree/",
         "https://leetcode.com/problems/subtree-of-another-tree/",
         "https://leetcode.com/problems/binary-tree-right-side-view/",
         "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
         "https://leetcode.com/problems/validate-binary-search-tree/",
         "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
         "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
         "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
         "https://leetcode.com/problems/invert-binary-tree/",
         "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
         "https://leetcode.com/problems/merge-k-sorted-lists/",
         "https://leetcode.com/problems/reverse-nodes-in-k-group/",
         "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
         "https://leetcode.com/problems/copy-list-with-random-pointer/",
         "https://leetcode.com/problems/merge-two-sorted-lists/",
         "https://leetcode.com/problems/reverse-linked-list/",
         "https://leetcode.com/problems/reorder-list/",
         "https://leetcode.com/problems/add-two-numbers/",
         "https://leetcode.com/problems/linked-list-cycle/",
         "https://leetcode.com/problems/find-the-duplicate-number/",
         "https://leetcode.com/problems/lru-cache/",
         "https://leetcode.com/problems/search-a-2d-matrix/",
         "https://leetcode.com/problems/koko-eating-bananas/",
         "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
         "https://leetcode.com/problems/search-in-rotated-sorted-array/",
         "https://leetcode.com/problems/time-based-key-value-store/",
         "https://leetcode.com/problems/binary-search/",
         "https://leetcode.com/problems/median-of-two-sorted-arrays/",
         "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
         "https://leetcode.com/problems/valid-parentheses/",
         "https://leetcode.com/problems/generate-parentheses/",
         "https://leetcode.com/problems/daily-temperatures/",
         "https://leetcode.com/problems/largest-rectangle-in-histogram/",
         "https://leetcode.com/problems/car-fleet/",
         "https://leetcode.com/problems/min-stack/",
         "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
         "https://leetcode.com/problems/longest-repeating-character-replacement/",
         "https://leetcode.com/problems/permutation-in-string/",
         "https://leetcode.com/problems/sliding-window-maximum/",
         "https://leetcode.com/problems/minimum-window-substring/",
         "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      ];

      // First, find the list you want to connect the problems to
      const list = await prisma.list.findUnique({
         where: {
            id: "d1efc2ff-7b38-4af6-a40d-22870460a040",
         },
      });

      if (!list) {
         console.log(
            `List with ID d32bf1a5-164d-4dd9-a04f-6db6eb614e8a not found.`
         );
         return;
      }

      // Now, iterate through the problem URLs and connect them to the list
      for (const url of problemUrls) {
         // Extract the problem slug from the URL (you may need to adjust this based on your schema)
         const temp = url.split("/"); // Assuming the slug is the last part of the URL
         const problemSlug = temp[temp.length - 2]; // Assuming the slug is the last part of the URL

         // Find the problem using the slug
         const problem = await prisma.problem.findFirst({
            where: {
               titleSlug: problemSlug,
            },
         });

         if (!problem) {
            console.log(`Problem with slug ${problemSlug} not found.`);
         } else {
            // Connect the problem to the list
            // Check if the problem is not already connected to the list
            const isProblemInList = await prisma.list.findFirst({
               where: {
                  id: list.id,
                  problems: { some: { id: problem.id } },
               },
            });

            if (!isProblemInList) {
               // Connect the problem to the list
               const updatedList = await prisma.list.update({
                  where: { id: list.id },
                  data: {
                     problems: {
                        connect: { id: problem.id },
                     },
                  },
               });

               console.log(
                  `Connected problem ${problem.title} to list ${updatedList.name}`
               );
            }
         }
      }
   } catch (error) {
      console.error("Error adding tags to the database:", error);
   } finally {
      await prisma.$disconnect();
   }
}

connectProblemsToList();

async function disconnectListFromProblems(listId) {
   try {
      // Find the list by its ID
      const list = await prisma.list.findUnique({
         where: {
            id: listId,
         },
      });

      if (!list) {
         console.log(`List with ID ${listId} not found.`);
         return;
      }

      const problems = await prisma.problem.findMany({
         where: {
            lists: {
               some: {
                  id: listId,
               },
            },
         },
      });

      // Disconnect the list from each problem
      for (const problem of problems) {
         await prisma.problem.update({
            where: { id: problem.id },
            data: {
               lists: {
                  disconnect: {
                     id: listId,
                  },
               },
            },
         });
      }

      console.log(`Disconnected list ${updatedList.name} from all problems.`);
   } catch (error) {
      console.error("Error:", error);
   } finally {
      await prisma.$disconnect();
   }
}

// Call the function with the ID of the list you want to disconnect
// disconnectListFromProblems(listIdToDisconnect);
const listIdToDisconnect = "d32bf1a5-164d-4dd9-a04f-6db6eb614e8a"; // Replace with the actual list ID
