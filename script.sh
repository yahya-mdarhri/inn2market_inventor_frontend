#!/bin/bash

# List of page names
pages=("Dashboard" "Ticket" "Patents" "Coniventors" "Profile" "Settings" "Logout")

# Base path for page components
base_path="./src/pages"

# Create pages directory if it doesn't exist
mkdir -p "$base_path"

# Loop through each page name
for page in "${pages[@]}"; do
  page_dir="$base_path/$page"
  tsx_file="$page_dir/$page.tsx"
  css_file="$page_dir/$page.css"

  # Create the directory for the page
  mkdir -p "$page_dir"

  # Generate TSX file
  cat > "$tsx_file" <<EOF
import './$page.css';

export default function $page() {
  return (
    <div className="${page,,}-container">
      <h1>$page</h1>
      <p>This is the $page page.</p>
    </div>
  );
}
EOF

  # Generate CSS file
  cat > "$css_file" <<EOF
.${page,,}-container {
  padding: 1rem;
  background-color: white;
}
EOF

  echo "✅ Created $page/$page.tsx and $page.css"
done

echo ""
echo "🎉 All page folders and files created successfully!"
