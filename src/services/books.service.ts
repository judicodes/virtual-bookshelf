import { objectToCamel, objectToSnake } from "ts-case-convert";
import supabase from "./supabase";

export interface Book {
  id: number;
  title: string;
  author?: string;
  publicationYear?: number;
  description?: string;
  personalNotes?: string;
  rating?: number;
}

export interface BookDTO {
  id: number;
  title: string;
  author?: string;
  publication_year?: number;
  description?: string;
  personal_notes?: string;
  rating?: number;
}

export const getAllBooks = async () => {
  const { data, error } = await supabase
    .from("books")
    .select()
    .returns<BookDTO[]>();

  if (error) {
    throw new Error(error.message);
  }

  const books: Book[] = data.map((book) => objectToCamel(book));
  return books;
};

export const createBook = async (book: Omit<Book, "id">) => {
  const { data, error } = await supabase
    .from("books")
    .insert(objectToSnake(book))
    .select()
    .returns<BookDTO>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
