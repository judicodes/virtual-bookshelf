import { Book } from "@/services/books.service";

export function BookItem({
  title,
  author,
  publicationYear,
  description,
  rating
}: Book) {
  return (
    <li className="grid gap-1 p-4 content-start rounded-lg border border-slate-300">
      <p className="font-bold text-xl">{title}</p>
      {author && <p>{author}</p>}
      {publicationYear && <time>{publicationYear}</time>}
      {description && <p>{description}</p>}
      {rating && (
        // TODO: Make this clickable star icons later on
        <p>
          Rating: <span>{rating}</span>
        </p>
      )}
      <button>Edit icon here</button>
      <button>Delete icon here</button>
    </li>
  );
}
