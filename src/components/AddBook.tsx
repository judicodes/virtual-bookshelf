import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

export default function AddBook() {
  const form = useForm({
    defaultValues: {
      title: ""
      // add other fields here
    }
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a new book</DialogTitle>
      </DialogHeader>

      <Form {...form}>
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
          <Button type="submit">Add Book to Library</Button>
        </form>
      </Form>

      <DialogDescription>
        You can add a new book through this form. Enjoy.
      </DialogDescription>
    </DialogContent>
  );
}
