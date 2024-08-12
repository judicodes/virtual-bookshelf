import { Trash2, Edit2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Book, updateBook } from "@/services/books.service";
import { deleteBook } from "@/services/books.service";
import { Button } from "./ui/button";
import StarRating from "./StarRating";

interface Props {
  isOpen: boolean;
  handleOnOpenChange: (isOpen: boolean) => void;
  handleOnUpdateBooks: () => void;
  handleOnEditBook: () => void;
  book: Book;
}

const BookDetailsDialog = ({
  isOpen,
  handleOnOpenChange,
  handleOnUpdateBooks,
  handleOnEditBook,
  book
}: Props) => {
  const {
    id,
    title,
    author,
    description,
    publicationYear,
    personalNotes,
    rating
  } = book;

  const onDeleteButtonClick = () => {
    if (
      window.confirm("Are you sure you want to permanently delete this book?")
    ) {
      deleteBook(id)
        .then(() => {
          handleOnOpenChange(false);
          handleOnUpdateBooks();
        })
        .catch(console.error);
    }
  };

  const updateRating = (rating: number) => {
    updateBook(id, { rating })
      .then(() => {
        handleOnUpdateBooks();
      })
      .catch(console.error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
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
            <StarRating filledStars={rating} onClickStar={updateRating} />
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
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsDialog;
