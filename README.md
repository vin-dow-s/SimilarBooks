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

- **React**: For building the user interface.
- **Next.js**: React framework for server-side rendering.
- **Tailwind CSS**: For styling components responsively.
- **@nextui-org/react**: For skeleton placeholders and other UI components.
