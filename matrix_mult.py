def matrix_multiplication(n, matrix_A, matrix_B):
    result = [[0] * n for _ in range(n)]

    for i in range(n):
        for j in range(n):
            for k in range(n):
                result[i][j] += matrix_A[i][k] * matrix_B[k][j]

    for row in result:
        print(" ".join(map(str, row)))

n = int(input())

matrix_A = [list(map(int, input().split())) for _ in range(n)]
matrix_B = [list(map(int, input().split())) for _ in range(n)]

matrix_multiplication(n, matrix_A, matrix_B)