# import os
# import pandas as pd

# # Set the folder path where the CSV files are located
# folder_path = './companies'

# # Initialize an empty list to store DataFrames
# data_frames = []

# # Loop through the files in the folder
# for filename in os.listdir(folder_path):
#     if filename.endswith('.csv'):
#         company_name = os.path.splitext(filename)[0]
#         file_path = os.path.join(folder_path, filename)
        
#         # Read the CSV file into a DataFrame
#         df = pd.read_csv(file_path)
        
#         # Add a 'company' column with the company name
#         df['company'] = company_name
        
#         # Append the DataFrame to the list
#         data_frames.append(df[['problem_name', 'company', 'num_occur']])

# # Concatenate all DataFrames into one
# combined_data = pd.concat(data_frames, ignore_index=True)

# # Save the combined data to a new CSV file
# combined_data.to_csv('combined_data.csv', index=False)

# #####################################################################################################
#  Json formation for all combined data in
#  {problem_name=string, company=[], num_occur=[]}
# #####################################################################################################

import os
import pandas as pd
import json

# Set the folder path where the CSV files are located
folder_path = './companies'

# Initialize a dictionary to store data with problem names as keys
data_dict = {}

# Loop through the files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.csv'):
        company_name = os.path.splitext(filename)[0]
        file_path = os.path.join(folder_path, filename)
        
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)
        
        # Create a list of dictionaries
        for index, row in df.iterrows():
            problem_name = row['problem_name']
            num_occur = row['num_occur']
            
            if problem_name not in data_dict:
                data_dict[problem_name] = {
                    'company': [],
                    'num_occur': []
                }
            
            data_dict[problem_name]['company'].append(company_name)
            data_dict[problem_name]['num_occur'].append(num_occur)

# Convert the dictionary to a list of dictionaries
data_list = [{'problem_name': problem_name, **values} for problem_name, values in data_dict.items()]

# Save the combined data to a JSON file
with open('combined_data.json', 'w') as json_file:
    json.dump(data_list, json_file)
