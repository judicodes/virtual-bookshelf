import { Trash2, Edit2, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Book, updateBook } from "@/services/books.service";
import { deleteBook } from "@/services/books.service";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

  const [isEditingRating, setIsEditingRating] = useState(false);

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
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

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
          {rating}
          {rating && (
            <div
              onMouseEnter={() => {
                setIsEditingRating(true);
              }}
              onMouseLeave={() => {
                setIsEditingRating(false);
              }}
            >
              <StarRating
                filledStars={rating}
                isEditing={isEditingRating}
                onClickStar={updateRating}
              />
            </div>
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

function StarRating({
  filledStars,
  isEditing,
  onClickStar
}: {
  filledStars: number;
  isEditing: boolean;
  onClickStar: (starIndex: number) => void;
}) {
  return (
    <figure className="flex text-yellow-500">
      {Array.from(Array(5).keys()).map((key) => (
        <Star
          key={key}
          size={24}
          className={cn(
            isEditing &&
              "stroke-yellow-500 hover:fill-yellow-500 cursor-pointer has-[~_&:hover]:fill-yellow-500",
            !isEditing && key + 1 <= filledStars && "fill-yellow-500"
          )}
          onClick={() => {
            onClickStar(key + 1);
          }}
        />
      ))}
    </figure>
  );
}

export default BookDetailsDialog;
