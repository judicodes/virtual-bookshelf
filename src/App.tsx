import { useEffect, useState } from "react";
import { BookItem } from "./components/Book";
import { Book, getAllBooks } from "./services/books.service";
import { Button, buttonVariants } from "./components/ui/button";
import BookDialog from "./components/BookDialog";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const handleOnOpenChange = (isOpen: boolean) => {
    setIsBookDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedBook(undefined);
    }
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

  const handleOnEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsBookDialogOpen(true);
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  return (
    <div className="m-4 grid gap-4">
      <h1 className="font-bold text-3xl">All books</h1>
      <ul className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            handleOnUpdateBooks={handleUpdate}
            handleOnEditBook={() => {
              handleOnEditBook(book);
            }}
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

      <BookDialog
        isOpen={isBookDialogOpen}
        handleOnOpenChange={handleOnOpenChange}
        handleOnUpdateBooks={handleUpdate}
        book={selectedBook}
      />
    </div>
  );
}

export default App;
