import csv
import json
import os

# Input CSV file
CSV_FILE = os.path.join(os.path.dirname(__file__), '..', 'total.csv')
# Output JSON file
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), 'products.json')

def parse_products(csv_file):
    products = []
    with open(csv_file, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            # Skip empty or header rows
            if not row or len(row) < 6:
                continue
            name = row[2].strip()
            price = row[3].strip()
            weight = row[4].strip()
            image_url = row[5].strip()
            # Ignore rows with 'CAMERA PIC' or empty image
            if not image_url or image_url.upper() == 'CAMERA PIC':
                continue
            # Skip rows without a product name
            if not name:
                continue
            # Try to infer category from previous non-empty row (optional)
            products.append({
                'name': name,
                'price': price,
                'weight': weight,
                'image_url': image_url
            })
    return products

def main():
    products = parse_products(CSV_FILE)
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"Extracted {len(products)} products to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()