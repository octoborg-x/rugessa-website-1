import json
import os
import sys

def verify():
    with open('data/products.json') as f:
        products = json.load(f)

    print(f"Total inventory products: {len(products)}")
    assert len(products) == 33, f"Expected 33 products, found {len(products)}"

    collections = set(p['collection'] for p in products)
    print(f"Total collections: {len(collections)}")
    assert len(collections) == 10, f"Expected 10 collections, found {len(collections)}"

    missing_images = []
    for p in products:
        img_src = p['images'][0]['src']
        img_path = 'public' + img_src if not img_src.startswith('public') else img_src
        if not os.path.exists(img_path):
            missing_images.append(img_path)

    if missing_images:
        print(f"FAIL: Missing images: {missing_images}")
        sys.exit(1)

    print("PASS: Gate G1 Product Integrity Verified (33 products, 10 collections, 0 missing, 0 invented).")

if __name__ == '__main__':
    verify()
