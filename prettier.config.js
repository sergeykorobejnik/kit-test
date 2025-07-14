/** @type {import('prettier').Config} */
module.exports = {
  semi: true, // Add semicolons
  singleQuote: true, // Use single quotes
  printWidth: 100, // Line wrap at 100 chars
  tabWidth: 2, // Use 2 spaces per indentation
  trailingComma: 'all', // Add trailing commas where valid
  bracketSpacing: true, // Add spaces inside object braces
  arrowParens: 'always', // Always include parens in arrow functions
  endOfLine: 'auto', // Use system-specific line endings
  plugins: ['prettier-plugin-tailwindcss'], // Optional: if using Tailwind CSS
};
