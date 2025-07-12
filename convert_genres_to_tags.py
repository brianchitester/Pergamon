import json
import re

def parse_genre_to_tags(genre_string):
    """Convert a genre string to a list of clean tags"""
    if not genre_string:
        return []
    
    # Handle special cases first
    genre_string = genre_string.strip()
    
    # Handle specific mappings
    special_mappings = {
        'Photography / Art': 'Art',
        'Photography/Art': 'Art',
        'Photography - Art': 'Art',
        'Photography-Art': 'Art',
    }
    
    # Check for exact matches first
    if genre_string in special_mappings:
        return [special_mappings[genre_string]]
    
    # Define compound terms that should NOT be split
    compound_terms = [
        'Non-Fiction', 'Self-Help', 'Sci-Fi', 'Science Fiction',
        'Historical Fiction', 'Literary Fiction', 'Short Stories',
        'Social Issues', 'Food Ethics', 'Color Theory', 'Creative Philosophy',
        'Chinese Philosophy', 'Computer Interaction', 'Human Computer Interaction',
        'Fictional Memoir', 'Visual Anthology'
    ]
    
    # Replace compound terms with placeholders to protect them during splitting
    protected_string = genre_string
    placeholders = {}
    
    for i, term in enumerate(compound_terms):
        if term in protected_string:
            placeholder = f"__COMPOUND_{i}__"
            protected_string = protected_string.replace(term, placeholder)
            placeholders[placeholder] = term
    
    # Replace common separators with a standard delimiter
    # Handle both "/" and "-" as separators, but only for non-compound terms
    normalized = protected_string.replace(' / ', '|').replace(' - ', '|').replace('/', '|')
    
    # Only split on standalone "-" if it's not part of a compound term
    # This is trickier, so we'll be more conservative and only split on " - " patterns
    
    # Split by the delimiter and clean up each tag
    tags = []
    for tag in normalized.split('|'):
        cleaned_tag = tag.strip()
        if cleaned_tag:
            # Restore compound terms
            for placeholder, original in placeholders.items():
                cleaned_tag = cleaned_tag.replace(placeholder, original)
            tags.append(cleaned_tag)
    
    return tags

def convert_bookshelf_genres_to_tags():
    """Convert all genre strings to tag arrays in user_bookshelf.json"""
    json_file_path = "user_bookshelf.json"
    
    # Load the bookshelf
    with open(json_file_path, 'r', encoding='utf-8') as f:
        bookshelf = json.load(f)
    
    # Convert each book's genre to tags
    for book in bookshelf:
        if 'Genre' in book:
            genre_string = book['Genre']
            tags = parse_genre_to_tags(genre_string)
            
            # Replace Genre with Tags
            book['Tags'] = tags
            del book['Genre']
    
    # Save the updated bookshelf
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(bookshelf, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"Conversion completed!")
    print(f"Updated {len(bookshelf)} books with tag arrays")
    
    # Show some examples
    print("\nSample conversions:")
    for i, book in enumerate(bookshelf[:5]):
        print(f"  {book['Title']}: {book['Tags']}")
    
    # Get unique tags
    all_tags = set()
    for book in bookshelf:
        all_tags.update(book['Tags'])
    
    print(f"\nTotal unique tags: {len(all_tags)}")
    print("All tags:", sorted(list(all_tags)))

if __name__ == "__main__":
    convert_bookshelf_genres_to_tags() 