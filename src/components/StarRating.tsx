import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

function StarRating({
  filledStars,
  onClickStar
}: {
  filledStars: number;
  onClickStar?: (starIndex: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <figure
      className="flex text-yellow-500"
      onMouseEnter={
        onClickStar
          ? () => {
              setIsEditing(true);
            }
          : undefined
      }
      onMouseLeave={
        onClickStar
          ? () => {
              setIsEditing(false);
            }
          : undefined
      }
    >
      {Array.from(Array(5).keys()).map((key) => (
        <Star
          key={key}
          size={24}
          className={cn(
            isEditing &&
              "stroke-yellow-500 hover:fill-yellow-500 cursor-pointer has-[~_&:hover]:fill-yellow-500",
            !isEditing && key + 1 <= filledStars && "fill-yellow-500"
          )}
          onClick={
            onClickStar
              ? () => {
                  onClickStar(key + 1);
                }
              : undefined
          }
        />
      ))}
    </figure>
  );
}

export default StarRating;
