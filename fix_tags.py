import json

def fix_tags_in_bookshelf():
    """Fix the tags that were incorrectly split in the bookshelf JSON"""
    json_file_path = "user_bookshelf.json"
    
    # Load the bookshelf
    with open(json_file_path, 'r', encoding='utf-8') as f:
        bookshelf = json.load(f)
    
    # Define compound terms that should be merged back together
    compound_fixes = {
        # Pattern: [split_parts] -> merged_term
        ('Non', 'Fiction'): 'Non-Fiction',
        ('Self', 'Help'): 'Self-Help', 
        ('Sci', 'Fi'): 'Sci-Fi',
        ('Science', 'Fiction'): 'Science Fiction',
        ('Historical', 'Fiction'): 'Historical Fiction',
        ('Literary', 'Fiction'): 'Literary Fiction',
        ('Short', 'Stories'): 'Short Stories',
        ('Social', 'Issues'): 'Social Issues',
        ('Food', 'Ethics'): 'Food Ethics',
        ('Color', 'Theory'): 'Color Theory',
        ('Creative', 'Philosophy'): 'Creative Philosophy',
        ('Chinese', 'Philosophy'): 'Chinese Philosophy',
        ('Computer', 'Interaction'): 'Computer Interaction',
        ('Human', 'Computer', 'Interaction'): 'Human Computer Interaction',
        ('Fictional', 'Memoir'): 'Fictional Memoir',
        ('Visual', 'Anthology'): 'Visual Anthology'
    }
    
    # Special replacements
    special_replacements = {
        'Photography': 'Art',  # Convert Photography to Art
    }
    
    # Process each book
    books_modified = 0
    for book in bookshelf:
        if 'Tags' in book:
            original_tags = book['Tags'][:]
            new_tags = []
            skip_next = 0
            
            for i, tag in enumerate(book['Tags']):
                if skip_next > 0:
                    skip_next -= 1
                    continue
                    
                # Check for compound terms
                found_compound = False
                
                # Check 2-part compounds
                if i + 1 < len(book['Tags']):
                    two_part = (tag, book['Tags'][i + 1])
                    if two_part in compound_fixes:
                        new_tags.append(compound_fixes[two_part])
                        skip_next = 1
                        found_compound = True
                
                # Check 3-part compounds
                if not found_compound and i + 2 < len(book['Tags']):
                    three_part = (tag, book['Tags'][i + 1], book['Tags'][i + 2])
                    if three_part in compound_fixes:
                        new_tags.append(compound_fixes[three_part])
                        skip_next = 2
                        found_compound = True
                
                # If no compound found, add the tag (with special replacements)
                if not found_compound:
                    final_tag = special_replacements.get(tag, tag)
                    new_tags.append(final_tag)
            
            # Remove duplicates while preserving order
            unique_tags = []
            for tag in new_tags:
                if tag not in unique_tags:
                    unique_tags.append(tag)
            
            # Update if tags changed
            if unique_tags != original_tags:
                book['Tags'] = unique_tags
                books_modified += 1
                print(f"Fixed '{book['Title']}': {original_tags} -> {unique_tags}")
    
    # Save the updated bookshelf
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(bookshelf, f, indent=2, ensure_ascii=False)
    
    print(f"\nTag fixing completed!")
    print(f"Modified {books_modified} books")
    
    # Get unique tags after fixing
    all_tags = set()
    for book in bookshelf:
        all_tags.update(book['Tags'])
    
    print(f"Total unique tags after fixing: {len(all_tags)}")
    print("All tags:", sorted(list(all_tags)))

if __name__ == "__main__":
    fix_tags_in_bookshelf() 