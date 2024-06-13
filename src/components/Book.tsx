import { Book } from "@/services/books.service";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteBook } from "@/services/books.service";

export function BookItem({
  id,
  title,
  author,
  publicationYear,
  description,
  rating
}: Book) {
  const onDeleteButtonClick = () => {
    deleteBook(id).catch(console.error);
  };
  return (
    <li className="grid gap-1 p-4 content-start rounded-lg border border-slate-300">
      <header className="flex gap-2 justify-between items-start">
        <p className="font-bold text-xl">{title}</p>
        <Button variant="ghost" size="icon" onClick={onDeleteButtonClick}>
          <Trash2 />
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
