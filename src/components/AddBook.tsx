import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { createBook } from "@/services/books.service";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

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
}

export default function AddBook({
  isOpen,
  handleOnOpenChange,
  handleOnUpdateBooks
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

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
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

    // 2. Post transformed values to Supabase to create new record
    createBook(transformedValues)
      .then(() => {
        // 3. Clear the form, so that it is ready use when the dialog openes the next time
        form.reset();

        // 4. Close the dialog
        handleOnOpenChange(false);

        // 5. Fetch all books again
        handleOnUpdateBooks();
      })
      .catch((error) => {
        console.error("Failed to create book: ", error);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
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
              <Button type="submit">Add Book to Library</Button>
            </nav>
          </form>
        </Form>

        <DialogDescription>
          You can add a new book through this form. Enjoy.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
