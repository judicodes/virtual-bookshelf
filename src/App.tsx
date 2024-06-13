import { useEffect, useState } from "react";
import { BookItem } from "./components/Book";
import { Book, getAllBooks } from "./services/books.service";
import { Button, buttonVariants } from "./components/ui/button";
import AddBook from "./components/AddBook";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const handleOnOpenChange = (isOpen: boolean) => {
    setIsBookDialogOpen(isOpen);
  };

  async function fetchBooks() {
    try {
      const books = await getAllBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = () => {
    fetchBooks().catch(console.error);
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  return (
    <div className="m-4 grid gap-4">
      <h1 className="font-bold text-3xl">All books</h1>
      <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(22ch,1fr))]">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            handleOnUpdateBooks={handleUpdate}
          />
        ))}
      </ul>

      <div className="flex justify-center">
        <Button
          className={buttonVariants({ variant: "default" })}
          onClick={() => {
            setIsBookDialogOpen(true);
          }}
        >
          Add new book
        </Button>
      </div>

      <AddBook
        isOpen={isBookDialogOpen}
        handleOnOpenChange={handleOnOpenChange}
        handleOnUpdateBooks={handleUpdate}
      />
    </div>
  );
}

export default App;
