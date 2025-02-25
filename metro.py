N = int(input())
passengers = []

for _ in range(N):
    A, B = map(int, input().split())
    passengers.append((A, B))

T = int(input())

count = sum(1 for A, B in passengers if A <= T <= B)
print(count)