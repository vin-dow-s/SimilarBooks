# Find Similar Books 📚

Search for a book and get similar suggestions based on its description.
<br/><br/>Current results: ``3 English novels that share with the provided book a common core theme, narrative style, or setting/location.``

## Features

- **Search Functionality**: Allows users to search for books using the Google Books API.
- **Book Suggestions**: Offers a dynamically updated dropdown of book titles as the user types (with thumbnails).
- **Similar Books**: On selecting a book, the app gets the book description from Google Books API, sends it to OpenAI API which returns 3 similar books titles, then the app fetches their data from Google Books API.
- **Responsive Design**: Adapts to different screen sizes for an optimal viewing experience.
- **Skeleton Loading**: Uses skeleton screens for a pleasant user loading experience.

## Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
