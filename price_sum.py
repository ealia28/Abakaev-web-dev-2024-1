import csv

total_adult = 0.0
total_pensioner = 0.0
total_child = 0.0

with open("products.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)

    for row in reader:
        total_adult += float(row[1])
        total_pensioner += float(row[2])
        total_child += float(row[3])

print(f"{total_adult:.2f} {total_pensioner:.2f} {total_child:.2f}")