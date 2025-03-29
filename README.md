
## Developer

- **Name**:  Oyku Cabuk
- **Student ID**: 149790230
- **Class**: ocabuk@myseneca.ca 
- **Date**: 28 march 2025  
- **GitHub Repository**:  https://github.com/oykucabuk/web322_assignment  
-**Vercel**:https://web322-assignment-ashen.vercel.app/
            https://web322-assignment-oykucabuks-projects.vercel.app/
            https://web322-assignment-git-main-oykucabuks-projects.vercel.app/

---

A basic Node.js application using Express.js for a simple website with two pages. This project demonstrates a foundational understanding of server setup and routing.The static HTML structure was replaced with EJS templating and Articles now link to real category names sourced from categories.json.Users can click article titles to explore dedicated pages with full content.The "Add Article" form was upgraded to dynamically to include catagories instead of hardcoded.  

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone  https://github.com/oykucabuk/web322_assignment  
   cd web322_assignment
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the server**:
   Launch the application locally:
   ```bash
   npm start
   ```

---

## Usage  
Access these routes after starting the server:  
- **Articles Page**: `/articles`  
  - Filter articles by category or date.  
  - Click titles to view individual articles.  
- **Categories Page**: `/categories`  
  - View all categories from `categories.json`.  
- **Add Article**: `/articles/add`  
  - Submit new articles with dynamic category dropdowns.  
- **Individual Article**: `/article/:id`  
  - Shows full article content and featured images (if available).  

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it as permitted under this license.
