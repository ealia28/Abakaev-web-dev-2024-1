def calculate_mood(n, m, arr, A, B):
    mood = 0
    set_A = set(A)
    set_B = set(B)

    for num in arr:
        if num in set_A:
            mood += 1
        elif num in set_B:
            mood -= 1

    return mood

n, m = map(int, input().split())
arr = list(map(int, input().split()))
A = list(map(int, input().split()))
B = list(map(int, input().split()))

print(calculate_mood(n, m, arr, A, B))