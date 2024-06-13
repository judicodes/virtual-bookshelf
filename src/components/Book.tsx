import { Book } from "@/services/books.service";
import { Button } from "./ui/button";
import { Trash2, Edit2 } from "lucide-react";
import { deleteBook } from "@/services/books.service";

export function BookItem({
  book,
  handleOnUpdateBooks
}: {
  book: Book;
  handleOnUpdateBooks: () => void;
}) {
  const { id, title, author, publicationYear, description, rating } = book;

  const onDeleteButtonClick = () => {
    deleteBook(id)
      .then(() => {
        handleOnUpdateBooks();
      })
      .catch(console.error);
  };
  return (
    <li className="grid gap-1 p-4 content-start rounded-lg border border-slate-300">
      <header className="flex gap-2 justify-between items-start">
        <p className="font-bold text-xl">{title}</p>
        <Button variant="ghost" size="icon" onClick={onDeleteButtonClick}>
          <Trash2 />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log("edit");
          }}
        >
          <Edit2 />
        </Button>
      </header>
      {author && <p>{author}</p>}
      {publicationYear && <time>{publicationYear}</time>}
      {description && <p>{description}</p>}
      {rating && (
        // TODO: Make this clickable star icons later on
        <p>
          Rating: <span>{rating}</span>
        </p>
      )}
    </li>
  );
}
