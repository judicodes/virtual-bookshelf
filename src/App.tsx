import { useEffect, useState } from "react";
import { BookItem } from "./components/Book";
import { Book, getAllBooks } from "./services/books.service";
import { buttonVariants } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import AddBook from "./components/AddBook";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await getAllBooks();
        setBooks(books);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks().catch(console.error);
  }, []);

  return (
    <div className="m-4 grid gap-4">
      <h1 className="font-bold text-3xl">All books</h1>
      <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(22ch,1fr))]">
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </ul>

      <Dialog>
        <div className="flex justify-center">
          <DialogTrigger className={buttonVariants({ variant: "default" })}>
            Add new book
          </DialogTrigger>
        </div>

        <AddBook />
      </Dialog>
    </div>
  );
}

export default App;
