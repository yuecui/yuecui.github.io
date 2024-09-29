#!/bin/bash

# Directory containing the images
IMAGE_DIR="./images"

# Counter for numbering the images
counter=1

# String that will hold the formatted output
formatted_string=""

# Create the directory if it doesn't exist
if [ ! -d "$IMAGE_DIR" ]; then
  echo "Directory $IMAGE_DIR does not exist."
  exit 1
fi

# Loop through all the image files in the directory
for file in "$IMAGE_DIR"/*.{jpg,jpeg,png,gif}; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Get the file extension
    extension="${file##*.}"
    
    # Create the new file name (image1.jpg, image2.jpg, ...)
    new_name=$(printf "image%d.%s" "$counter" "$extension")

    # Rename the file
    mv "$file" "$IMAGE_DIR/$new_name"
    
    echo "Renamed $file to $new_name"
    
    # Append the formatted string for each image
    formatted_string+="'images/$new_name', "
    
    # Increment the counter
    counter=$((counter + 1))
  fi
done

# Print the final formatted string (removing the trailing comma and space)
formatted_string=$(echo "$formatted_string" | sed 's/, $//')
echo "Formatted String: $formatted_string"

echo "Renaming complete."
