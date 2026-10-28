# SafeSteps — CEP Project Website

A responsive educational website for the CEP project **Online Safety for Children and Adolescents**.

## Files
- `index.html` — page structure and content
- `style.css` — responsive design and styling
- `script.js` — mobile navigation, safety tip reminders, quiz, demo login/signup, feedback-form link

## Run the website
1. Extract the ZIP file.
2. Keep all three files in the same folder.
3. Open `index.html` in a browser (Chrome recommended).

For editing, open the folder in Visual Studio Code. You can also use the Live Server extension.

## Connect your Google Form
1. Open `script.js`.
2. Find `const GOOGLE_FORM_URL = "";`
3. Paste your published Google Form response URL between the quotation marks.
4. Save and refresh the page.

## Important note about login/signup
Login/signup is a **browser-only demonstration** using `localStorage`. It is not secure authentication and should not be used with real passwords or sensitive data. It does not provide server-side accounts, password hashing, email verification, or multi-device login. For a real public website, use a trusted authentication service and backend.

## Customising the project
Change the title, text, colours, safety tips, or quiz questions in `index.html`, `style.css`, and `script.js`.
