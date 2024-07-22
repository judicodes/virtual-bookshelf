import { useEffect, useState } from "react";
import { Book } from "./components/Book";
import { Book as BookType, getAllBooks } from "./services/books.service";
import { Button, buttonVariants } from "./components/ui/button";
import FormDialog from "./components/FormDialog";
import BookDetailsDialog from "./components/BookDetailsDialog";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isBookDetailsDialogOpen, setIsBookDetailsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | undefined>(
    undefined
  );
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

  const handleOnEditBook = () => {
    setIsBookDetailsDialogOpen(false);
    setIsBookDialogOpen(true);
  };

  const openBookDetailsDialog = (book: BookType) => {
    setSelectedBook(book);
    setIsBookDetailsDialogOpen(true);
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedBook) return;
    const lastBookId = selectedBook.id;
    const updatedSelectedBook = books.find((book) => book.id === lastBookId);
    setSelectedBook(updatedSelectedBook);
  }, [books, selectedBook]);

  return (
    <div className="m-4 grid gap-4">
      <h1 className="font-bold text-3xl">All books</h1>
      <ul className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        {books.map((book) => (
          <button
            onClick={() => {
              openBookDetailsDialog(book);
            }}
            key={book.id}
            className="text-left contents"
          >
            <Book book={book} />
          </button>
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

      <FormDialog
        isOpen={isBookDialogOpen}
        handleOnOpenChange={handleOnOpenChange}
        handleOnUpdateBooks={handleUpdate}
        book={selectedBook}
      />
      {selectedBook && (
        <BookDetailsDialog
          isOpen={isBookDetailsDialogOpen}
          handleOnOpenChange={setIsBookDetailsDialogOpen}
          handleOnUpdateBooks={handleUpdate}
          handleOnEditBook={handleOnEditBook}
          book={selectedBook}
        />
      )}
    </div>
  );
}

export default App;
