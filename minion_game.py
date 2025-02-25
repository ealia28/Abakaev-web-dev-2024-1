def minions_game(S):
    vowels = "AEIOU"
    kevin_score = 0
    stuart_score = 0
    length = len(S)

    for i in range(length):
        if S[i] in vowels:
            kevin_score += length - i
        else:
            stuart_score += length - i

    if kevin_score > stuart_score:
        print(f"Kevin {kevin_score}")
    elif stuart_score > kevin_score:
        print(f"Stuart {stuart_score}")
    else:
        print(f"Draw {kevin_score}")

S = input().strip()
minions_game(S)