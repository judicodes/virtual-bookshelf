import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { createBook, updateBook } from "@/services/books.service";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Book } from "@/services/books.service";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  publicationYear: z.string().optional(),
  description: z.string().optional(),
  personalNotes: z.string().optional(),
  rating: z.string().optional()
});

interface Props {
  isOpen: boolean;
  handleOnOpenChange: (isOpen: boolean) => void;
  handleOnUpdateBooks: () => void;
  book?: Book;
}

export default function BookDialog({
  isOpen,
  handleOnOpenChange,
  handleOnUpdateBooks,
  book
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      author: "",
      publicationYear: "",
      description: "",
      personalNotes: "",
      rating: ""
    }
  });

  useEffect(() => {
    form.setValue("title", book?.title ?? "");
    form.setValue("author", book?.author ?? "");
    form.setValue("publicationYear", book?.publicationYear?.toString() ?? "");
    form.setValue("description", book?.description ?? "");
    form.setValue("personalNotes", book?.personalNotes ?? "");
    form.setValue("rating", book?.rating?.toString() ?? "");
  }, [book, form]);

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    // 1. Transform values from form into expected format for Supabase
    const transformedValues = {
      title: values.title,
      author: values.author === "" ? undefined : values.author,
      publicationYear:
        values.publicationYear === ""
          ? undefined
          : Number(values.publicationYear),
      description: values.description === "" ? undefined : values.description,
      personalNotes:
        values.personalNotes === "" ? undefined : values.personalNotes,
      rating: values.rating === "" ? undefined : Number(values.rating)
    };

    try {
      if (book) {
        await updateBook(book.id, transformedValues);
      } else {
        // 2. Post transformed values to Supabase to create new record
        await createBook(transformedValues);
      }
      // 3. Clear the form, so that it is ready use when the dialog openes the next time
      form.reset();

      // 4. Close the dialog
      handleOnOpenChange(false);

      // 5. Fetch all books again
      handleOnUpdateBooks();
    } catch (error) {
      console.error("Failed to create book: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book ? "Edit book" : "Add a new book"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hitchhiker's Guide to the Galaxy"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="author"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="publicationYear"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication Year</FormLabel>
                  <FormControl>
                    <Input placeholder="1984" {...field} type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="This book … " {...field} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="personalNotes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="I thought this book was …"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="rating"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
            <nav className="mt-4">
              <Button type="submit">
                {book ? "Update book" : "Add Book to Library"}
              </Button>
            </nav>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
