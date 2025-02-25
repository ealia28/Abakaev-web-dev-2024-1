def pirate_ship(n, m, cargo_list):
    cargo = []
    for name, weight, value in cargo_list:
        price_per_unit = value / weight
        cargo.append((name, weight, value, price_per_unit))

    cargo.sort(key=lambda x: x[3], reverse=True)

    result = []
    total_weight = 0
    
    for name, weight, value, price_per_unit in cargo:
        if total_weight + weight <= n:
            result.append((name, weight, value))
            total_weight += weight
        else:
            remaining_weight = n - total_weight
            if remaining_weight > 0:
                partial_value = price_per_unit * remaining_weight
                result.append((name, round(remaining_weight, 2), round(partial_value, 2)))
                total_weight += remaining_weight
            break

    for name, weight, value in result:
        print(f"{name} {weight} {value}")

n, m = map(int, input().split())
cargo_list = []

for _ in range(m):
    parts = input().split()
    name = " ".join(parts[:-2])
    weight, value = map(int, parts[-2:])
    cargo_list.append((name, weight, value))

pirate_ship(n, m, cargo_list)
