import { Book as BookType } from "@/services/books.service";
import StarRating from "./StarRating";

export function Book({ book }: { book: BookType }) {
  const { title, author, publicationYear, description, personalNotes, rating } =
    book;

  return (
    <li className="grid gap-2 content-start">
      <header className="flex gap-2 items-center justify-between">
        <p className="font-bold text-xl">{title}</p>
      </header>
      <p className="italic">
        {author && <span>{author}</span>}
        {publicationYear && <time>, {publicationYear}</time>}
      </p>
      {description && <p className="line-clamp-1">{description}</p>}
      <article className="grid gap-1">
        {personalNotes && (
          <>
            <h2 className="text-xs font-bold uppercase text-slate-500 mt-4">
              Notes:
            </h2>
            <p className="line-clamp-1">{personalNotes}</p>
          </>
        )}
        {rating && <StarRating filledStars={rating} />}
      </article>
    </li>
  );
}
