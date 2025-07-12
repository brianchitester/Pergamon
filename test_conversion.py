from convert_genres_to_tags import parse_genre_to_tags

# Test cases to verify the fix
test_cases = [
    "Non-Fiction",
    "Self-Help",
    "Sci-Fi", 
    "Photography / Art",
    "Fiction - Sci-Fi",
    "Self-Help / Philosophy",
    "Non-Fiction / History",
    "Mystery / Thriller",
    "Art / Photography",
    "Fiction / Historical",
    "Science Fiction"
]

print("Testing genre to tags conversion:")
print("=" * 50)

for test_case in test_cases:
    result = parse_genre_to_tags(test_case)
    print(f"'{test_case}' -> {result}") 