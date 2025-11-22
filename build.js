const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
  const lines = markdown.split('\n');
  let html = [];
  let i = 0;
  let inStepSection = false;
  let inQuizQuestion = false;
  let currentSection = null;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Step sections
    if (trimmed.match(/^## Step \d+:/)) {
      if (inStepSection) {
        html.push('</div>');
      }
      html.push('<div class="step-section">');
      html.push(trimmed.replace(/^## (.*)$/, '<h2>$1</h2>'));
      inStepSection = true;
      i++;
      continue;
    }
    
    // Quiz questions
    if (trimmed.match(/^## Question \d+$/)) {
      if (inQuizQuestion) {
        html.push('</div>');
      }
      const questionNum = trimmed.match(/Question (\d+)/)[1];
      html.push(`<div class="quiz-question" data-question="${questionNum}" style="display: none;">`);
      html.push(trimmed.replace(/^## (.*)$/, '<h2>$1</h2>'));
      inQuizQuestion = true;
      i++;
      continue;
    }
    
    // Process structured fields
    const fieldPattern = /^\*\*([^:]+):\*\*$/;
    const fieldMatch = trimmed.match(fieldPattern);
    
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      i++;
      
      // Collect content until next field or section
      const contentLines = [];
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        if (nextLine.match(fieldPattern) || 
            nextLine.match(/^##? /) || 
            nextLine === '---' ||
            nextLine.match(/^\- /) ||
            nextLine.match(/^\|/)) {
          break;
        }
        if (nextLine) {
          contentLines.push(nextLine);
        }
        i++;
      }
      
      const content = contentLines.join(' ');
      
      // Handle different field types
      if (fieldName === 'Instructions') {
        html.push(`<p><strong>Instructions:</strong> ${content}</p>`);
      } else if (fieldName === 'Arabic' || fieldName === 'Arabic Text') {
        html.push('<p><strong>Arabic:</strong></p>');
        html.push('<div class="arabic-text">' + contentLines.join('<br>') + '</div>');
      } else if (fieldName === 'Transliteration') {
        html.push(`<p><strong>Transliteration:</strong></p><p class="transliteration">${contentLines.join('<br>')}</p>`);
      } else if (fieldName === 'Translation' || fieldName === 'English Translation') {
        html.push('<p><strong>Translation:</strong></p>');
        html.push('<p class="translation">' + contentLines.join('<br>') + '</p>');
      } else if (fieldName === 'Why') {
        html.push(`<div class="why-section"><p><strong>Why:</strong> ${content}</p></div>`);
        if (inStepSection) {
          html.push('</div>');
          inStepSection = false;
        }
      } else if (fieldName === 'Explanation') {
        html.push(`<div class="explanation" style="display: none !important;"><p><strong>Explanation:</strong> ${content}</p></div>`);
        if (inQuizQuestion) {
          html.push('</div>');
          inQuizQuestion = false;
        }
      } else {
        // Generic field (Arabic Name, Number of Verses, Significance, etc.)
        html.push(`<p><strong>${fieldName}:</strong> ${content}</p>`);
      }
      continue;
    }
    
    // Headers
    if (trimmed.match(/^### /)) {
      html.push(trimmed.replace(/^### (.*)$/, '<h3>$1</h3>'));
      i++;
      continue;
    }
    
    if (trimmed.match(/^## /) && !trimmed.match(/^## Step/) && !trimmed.match(/^## Question/)) {
      html.push(trimmed.replace(/^## (.*)$/, '<h2>$1</h2>'));
      i++;
      continue;
    }
    
    if (trimmed.match(/^# /)) {
      html.push(trimmed.replace(/^# (.*)$/, '<h1>$1</h1>'));
      i++;
      continue;
    }
    
    // Horizontal rules
    if (trimmed === '---') {
      html.push('<hr>');
      i++;
      continue;
    }
    
    // Lists
    if (trimmed.match(/^\- \[x\] /)) {
      const content = trimmed.replace(/^\- \[x\] /, '');
      html.push(`<li class="quiz-answer correct" data-correct="true">${content}</li>`);
      i++;
      continue;
    }
    
    if (trimmed.match(/^\- \[ \] /)) {
      const content = trimmed.replace(/^\- \[ \] /, '');
      html.push(`<li class="quiz-answer" data-correct="false">${content}</li>`);
      i++;
      continue;
    }
    
    if (trimmed.match(/^\- /)) {
      const content = trimmed.replace(/^\- /, '');
      html.push(`<li>${content}</li>`);
      i++;
      continue;
    }
    
    // Tables
    if (trimmed.match(/^\|.+\|$/)) {
      const tableRows = [];
      let j = i;
      while (j < lines.length && lines[j].trim().match(/^\|.+\|$/)) {
        tableRows.push(lines[j].trim());
        j++;
      }
      
      if (tableRows.length > 0) {
        html.push('<table>');
        // First row is header
        const headerCells = tableRows[0].split('|').map(c => c.trim()).filter(c => c);
        html.push('<thead><tr>' + headerCells.map(c => `<th>${c}</th>`).join('') + '</tr></thead>');
        html.push('<tbody>');
        
        // Process data rows (skip separator row)
        for (let k = 1; k < tableRows.length; k++) {
          const row = tableRows[k];
          if (!row.match(/^\|\s*-+\s*\|/)) {
            const cells = row.split('|').map(c => c.trim()).filter(c => c);
            html.push('<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>');
          }
        }
        html.push('</tbody></table>');
      }
      i = j;
      continue;
    }
    
    // Regular paragraphs
    if (trimmed && !trimmed.match(/^<[^>]+>/) && !trimmed.match(/^<\/[^>]+>/)) {
      // Process inline markdown
      let processed = trimmed;
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
      processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
      processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      html.push(`<p>${processed}</p>`);
    } else if (!trimmed) {
      html.push('');
    } else {
      html.push(line);
    }
    
    i++;
  }
  
  // Close any open sections
  if (inStepSection) {
    html.push('</div>');
  }
  if (inQuizQuestion) {
    html.push('</div>');
  }
  
  // Wrap consecutive list items in ul tags
  let result = [];
  let inList = false;
  
  for (let j = 0; j < html.length; j++) {
    const line = html[j];
    if (line.match(/^<li/)) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(line);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(line);
    }
  }
  if (inList) {
    result.push('</ul>');
  }
  
  html = result.join('\n');
  
  // Remove duplicate nested explanation divs first
  html = html.replace(/<div class="explanation"[^>]*>\s*<div class="explanation"[^>]*>/g, 
    '<div class="explanation" style="display: none !important;">');
  html = html.replace(/<\/div>\s*<\/div>(?=\s*(?:<hr>|<\/div>|$))/g, '</div>');
  
  // Post-process: Find any paragraphs with "Explanation:" that aren't already in explanation divs
  // Check if it's not already inside an explanation div
  const htmlLines = html.split('\n');
  const processed = [];
  let inExplanationDiv = false;
  
  for (let i = 0; i < htmlLines.length; i++) {
    const line = htmlLines[i];
    
    // Track if we're inside an explanation div
    if (line.includes('<div class="explanation"')) {
      inExplanationDiv = true;
      processed.push(line);
    } else if (line.includes('</div>') && inExplanationDiv) {
      inExplanationDiv = false;
      processed.push(line);
    } else if (line.match(/<p><strong>Explanation:<\/strong>/) && !inExplanationDiv) {
      // Wrap explanation paragraph that's not already in a div
      const content = line.match(/<p><strong>Explanation:<\/strong> (.+?)<\/p>/);
      if (content) {
        processed.push(`<div class="explanation" style="display: none !important;"><p><strong>Explanation:</strong> ${content[1]}</p></div>`);
      } else {
        processed.push(line);
      }
    } else {
      processed.push(line);
    }
  }
  
  return processed.join('\n');
}

// Read markdown files
const contentDir = path.join(__dirname, 'content');
const files = {
  'how-to-pray': fs.readFileSync(path.join(contentDir, 'how-to-pray.md'), 'utf8'),
  'surah-guide': fs.readFileSync(path.join(contentDir, 'surah-guide.md'), 'utf8'),
  'quiz': fs.readFileSync(path.join(contentDir, 'quiz.md'), 'utf8'),
  'prayer-breakdown': fs.readFileSync(path.join(contentDir, 'prayer-breakdown.md'), 'utf8')
};

// Convert to HTML
const htmlContent = {};
for (const [key, markdown] of Object.entries(files)) {
  htmlContent[key] = markdownToHTML(markdown);
}

// Read the HTML template
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

// Replace placeholders
let finalHTML = template
  .replace('{{HOW_TO_PRAY}}', htmlContent['how-to-pray'])
  .replace('{{SURAH_GUIDE}}', htmlContent['surah-guide'])
  .replace('{{QUIZ}}', htmlContent['quiz'])
  .replace('{{PRAYER_BREAKDOWN}}', htmlContent['prayer-breakdown']);

// Write to index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), finalHTML);
console.log('Build complete! index.html generated.');
