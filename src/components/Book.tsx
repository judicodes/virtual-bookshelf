import { Book } from "@/services/books.service";
import { Button } from "./ui/button";
import { Trash2, Edit2, Star } from "lucide-react";
import { deleteBook } from "@/services/books.service";

export function BookItem({
  book,
  handleOnUpdateBooks,
  handleOnEditBook
}: {
  book: Book;
  handleOnUpdateBooks: () => void;
  handleOnEditBook: () => void;
}) {
  const {
    id,
    title,
    author,
    publicationYear,
    description,
    personalNotes,
    rating
  } = book;

  const onDeleteButtonClick = () => {
    if (
      window.confirm("Are you sure you want to permanently delete this book?")
    ) {
      deleteBook(id)
        .then(() => {
          handleOnUpdateBooks();
        })
        .catch(console.error);
    }
  };

  return (
    <li className="grid gap-2 content-start">
      <header className="flex gap-2 items-center justify-between">
        <p className="font-bold text-xl">{title}</p>
      </header>
      <p className="italic">
        {author && <span>{author}</span>}
        {publicationYear && <time>, {publicationYear}</time>}
      </p>
      {description && <p>{description}</p>}
      <article className="grid gap-1">
        {personalNotes && (
          <>
            <h2 className="text-xs font-bold uppercase text-slate-500 mt-4">
              Notes:
            </h2>
            <p>{personalNotes}</p>
          </>
        )}
        {rating && (
          <figure className="flex gap-1 text-yellow-500">
            {Array.from(Array(rating).keys()).map((key) => (
              <Star key={key} size={16} />
            ))}
          </figure>
        )}
      </article>
      <div className="border-t border-slate-100 flex gap-1 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="p-0"
          onClick={handleOnEditBook}
        >
          <Edit2 size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDeleteButtonClick}>
          <Trash2 size={16} />
        </Button>
      </div>
    </li>
  );
}
