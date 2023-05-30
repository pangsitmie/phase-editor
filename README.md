# phase-editor

Phase-Editor is a web application project built with React, TypeScript, Vite, Tailwind CSS, Styled Components, Redux, and tested with Jest & Babel. 
The project is divided into two main directories: v1 and final. 

- **final** - This is the final version of the application with support for nested elements feature.

- **v1** - This is the initial version of the application, which does not support nested elements feature. 
- link to v1: https://github.com/pangsitmie/Websites/tree/main/phase-editor-v1

## How to Start the Application

Install the dependencies:
```bash
yarn install
```
To start the application, run:
```bash
yarn dev or yarn run dev
```
5. Open your browser and navigate to `http://localhost:5173`.

## Normalization Approach

Normalization is a method for structuring data using separate entities for pages and elements. 
Each entity has its own Redux slice, `pagesSlice` and `elementsSlice`. 
This approach addresses relationship management, streamlined data retrieval, and data consistency.

Please refer to this notion page for more descriptions: https://pangsitmie.notion.site/Phase-Editor-Jeriel-Isaiah-8a54eabe40c24002b6f5eb404598465f
