n = int(input())  
students = [[input(), float(input())] for _ in range(n)]  

scores = sorted(set(score for _, score in students)) 
second_highest = scores[1]

second_students = sorted(name for name, score in students if score == second_highest)  

print("\n".join(second_students))