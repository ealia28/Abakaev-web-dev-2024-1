import string

with open("example.txt", "r", encoding="utf-8") as file:
    content = file.read()

clean_text = content.translate(str.maketrans("", "", string.punctuation))

words = clean_text.split()

max_length = max(len(word) for word in words)

longest_words = [word for word in words if len(word) == max_length]

for word in longest_words:
    print(word)