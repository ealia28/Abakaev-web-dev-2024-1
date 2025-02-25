n = int(input())
scores = list(map(int, input().split()))
unique_scores = sorted(set(scores), reverse=True)

if len(unique_scores) > 1:
    print(unique_scores[1])
else:
    print(unique_scores[0])