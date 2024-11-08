let quickEditMode = false;
let currentTag = '';

function changeFontFamily() {
  const fontFamily = document.getElementById('font-family').value;
  const textEditor = document.getElementById('text-editor');
  textEditor.style.fontFamily = fontFamily;
}

function changeFontSize() {
  const fontSize = document.getElementById('font-size').value;
  const textEditor = document.getElementById('text-editor');
  textEditor.style.fontSize = fontSize;
}

function toggleQuickEditMode() {
  quickEditMode = !quickEditMode;
  const button = document.getElementById('quick-edit-mode');
  button.classList.toggle('active', quickEditMode);
}

// Modify the existing selectTag function to include the paragraph tag behavior
function selectTag(tag) {
  currentTag = tag;

  // Highlight the selected tag and remove highlight from others
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tagElement => {
    if (tagElement.textContent.includes(`<${tag}>`)) {
      tagElement.classList.add('active');
    } else {
      tagElement.classList.remove('active');
    }
  });

  // If the <p> tag is selected, automatically apply the paragraph wrapping to untagged text
  if (tag === 'p') {
    wrapAllParagraphsInTextTags();
    currentTag = ''; // Reset the currentTag after wrapping the paragraphs
  }
}

function highlightActiveTag(tag) {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tagElement => {
    if (tagElement.textContent.includes(`<${tag}>`)) {
      tagElement.classList.add('active');
    } else {
      tagElement.classList.remove('active');
    }
  });
}

function highlightSyntax() {
  const editor = document.getElementById('text-editor');
  const content = editor.innerText;

  const formattedContent = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)(\w+)(.*?&gt;)/g, (_, start, tag, rest) => {
      return `<span class="tag-name ${tag}">${start}${tag}</span><span>${rest}</span>`;
    });

  editor.innerHTML = formattedContent;
  editor.style.display = 'none'; // Force a reflow by changing the style temporarily
  editor.offsetHeight;           // Accessing offsetHeight forces a reflow
  editor.style.display = '';     // Restore the style
  placeCaretAtEnd(editor);
}

function placeCaretAtEnd(element) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
function wrapAllParagraphsInTextTags() {
  const editor = document.getElementById('text-editor');
  let content = editor.innerText; // Get the plain text content

  // Split content into paragraphs based on double newline or standalone line breaks
  const paragraphs = content.split(/\n\s*\n|\r\n\s*\r\n/);

  // Iterate through each paragraph, wrapping with real <p> tag and displaying visual tags
  const wrappedContent = paragraphs.map(paragraph => {
    if (paragraph.trim().length > 0) {
      return `
        <p class="paragraph">
          <span class="tag-name p">&lt;p&gt;</span>
          ${paragraph.trim()}
          <span class="tag-name p">&lt;/p&gt;</span>
        </p>
      `;
    }
    return '';
  }).join('');

  // Set the updated content back to the editor as innerHTML to show tags as text and real paragraphs
  editor.innerHTML = wrappedContent;

  highlightSyntax();
  // Restore caret position at the end of the content
  placeCaretAtEnd(editor);
}





function addTaggedElement(tag, term) {
  const taggedList = document.getElementById('tagged-list');
  const listItem = document.createElement('li');
  listItem.classList.add('tagged-item');
  listItem.dataset.tag = tag;
  listItem.dataset.term = term;
  listItem.innerHTML = `<strong>&lt;${tag}&gt;</strong> ${term}`;
  listItem.onclick = () => applyTagToAll(tag, term);
  taggedList.appendChild(listItem);
}

function addTaggedElement(tag, term) {
  const taggedList = document.getElementById('tagged-list');
  
  // Check if this tag-term pair already exists in the list to avoid duplicates
  const existingItem = Array.from(taggedList.children).find(item => item.dataset.tag === tag && item.dataset.term === term);
  if (existingItem) return;

  const listItem = document.createElement('li');
  listItem.classList.add('tagged-item');
  listItem.dataset.tag = tag;
  listItem.dataset.term = term;
  listItem.innerHTML = `<strong>&lt;${tag}&gt;</strong> ${term} `;

  const applyButton = document.createElement('button');
  applyButton.textContent = 'Apply All';
  applyButton.onclick = () => applyTagToAll(tag, term);
  
  listItem.appendChild(applyButton);
  taggedList.appendChild(listItem);
}

function applyTagToAll(tag, term) {
  const editor = document.getElementById('text-editor');
  let content = editor.innerHTML;

  // Escape special characters in the term for use in a regular expression
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regex to match the term, ensuring it's not already wrapped by any tag
  const regex = new RegExp(`(?<!&lt;${tag}&gt;)(\\b${escapedTerm}\\b)(?!&lt;\\/${tag}&gt;)`, 'g');

  // Replace all occurrences of the term that are not already wrapped with the desired tag
  content = content.replace(regex, (match) => {
    return `<span class="tag-name ${tag}">&lt;${tag}&gt;</span>${match}<span class="tag-name ${tag}">&lt;/${tag}&gt;</span>`;
  });

  // Update the editor content with the modified HTML
  editor.innerHTML = content;

  // Restore caret position at the end of the content
  placeCaretAtEnd(editor);
}




function wrapAllParagraphsInTextTags() {
  const editor = document.getElementById('text-editor');
  let content = editor.innerText; // Use innerText to get plain text content

  // Split content into paragraphs based on double newline or standalone line breaks
  const paragraphs = content.split(/\n\s*\n|\r\n\s*\r\n/);

  // Iterate through each paragraph, wrapping with <p> and </p> tags as text
  const wrappedContent = paragraphs.map(paragraph => {
    if (paragraph.trim().length > 0) {
      return `&lt;p&gt;${paragraph.trim()}&lt;/p&gt;`;
    }
    return '';
  }).join('\n\n');

  // Set the updated content back to the editor as innerHTML to show tags as text
  editor.innerHTML = wrappedContent.replace(/\n/g, '<br>');

  // Restore caret position at the end of the content
  placeCaretAtEnd(editor);
}




function wrapSelectedText(tag) {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString().trim();

  if (selectedText.length === 0) {
    alert("Please select some text to wrap.");
    return;
  }

  // Create new HTML elements for the tag
  const tagStart = document.createElement("span");
  tagStart.innerHTML = `&lt;${tag}&gt;`;
  tagStart.classList.add('tag-name', tag);

  const tagEnd = document.createElement("span");
  tagEnd.innerHTML = `&lt;/${tag}&gt;`;
  tagEnd.classList.add('tag-name', tag);

  // Wrap the selected text with the tag
  const wrapper = document.createElement("span");
  wrapper.appendChild(tagStart);
  wrapper.appendChild(document.createTextNode(selectedText));
  wrapper.appendChild(tagEnd);

  range.deleteContents();
  range.insertNode(wrapper);

  // Clear the selection
  selection.removeAllRanges();

  // Add to Tagged Elements list
  addTaggedElement(tag, selectedText);
}


function verifyAllTags() {
  const editor = document.getElementById('text-editor');
  let content = editor.innerHTML;

  // Regular expression to find nested tags (e.g., multiple <quote> tags in sequence)
  const tags = ['name', 'place', 'quote', 'p'];
  
  tags.forEach(tag => {
    // Regex to match nested occurrences of the same tag
    const nestedTagRegex = new RegExp(`(<span class="tag-name ${tag}">&lt;${tag}&gt;</span>)+([\\s\\S]*?)(<span class="tag-name ${tag}">&lt;/${tag}&gt;</span>)+`, 'g');

    // Replace nested tags with a single occurrence of the tag
    content = content.replace(nestedTagRegex, (match, p1, innerText, p2) => {
      return `<span class="tag-name ${tag}">&lt;${tag}&gt;</span>${innerText}<span class="tag-name ${tag}">&lt;/${tag}&gt;</span>`;
    });
  });

  // Update the editor content with the fixed tags
  editor.innerHTML = content;

  // Notify user that verification is complete
  alert('All tags verified and double tags removed.');
}



// Event listener for the text editor
document.getElementById('text-editor').addEventListener('mouseup', () => {
  if (quickEditMode && currentTag) {
    wrapSelectedText(currentTag);
  }
});
document.getElementById('text-editor').addEventListener('input', highlightSyntax);

//Enable undo function 
document.getElementById('text-editor').addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
    // Allow browser's default undo functionality
    document.execCommand('undo');
    event.preventDefault();
  }
});


