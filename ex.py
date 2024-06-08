import csv
import json

def json_to_csv(json_data, csv_file):
    """Converts JSON data to CSV format.

    Args:
        json_data: JSON data to convert.
        csv_file: File path for the output CSV file.
    """
    # Extract AuthorWorklog data
    data = json_data['data']['AuthorWorklog']
    activity_meta = data['activityMeta']
    rows = data['rows']

    # Create headers for CSV
    headers = ['Name'] + [meta['label'] for meta in activity_meta] 

    # Write data to CSV
    with open(csv_file, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=headers)
        writer.writeheader()

        # Iterate over each developer
        for row in rows:
            data_dict = {'Name': row['name']} 

            # Extract total activity counts
            for activity in row['totalActivity']:
                data_dict[activity['name']] = activity['value']

            # Write data as a row in CSV
            writer.writerow(data_dict) 

# Example usage
with open('data.json', 'r') as json_file:
    json_data = json.load(json_file)
json_to_csv(json_data, 'activity_data.csv')