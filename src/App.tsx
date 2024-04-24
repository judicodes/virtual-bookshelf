import { BookItem } from "./components/Book";
import { getAllBooks } from "./services/books.service";

function App() {
  const books = getAllBooks();

  return (
    <div className="m-4 grid gap-4">
      <h1 className="font-bold text-3xl">All books</h1>
      <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(22ch,1fr))]">
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </ul>

      <button>Add new book</button>
    </div>
  );
}

export default App;
