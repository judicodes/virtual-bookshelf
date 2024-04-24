import demoBooks from "./books.demo-data.json";

export interface Book {
  id: number;
  title: string;
  author?: string;
  publicationYear?: number;
  description?: string;
  personalNotes?: string;
  rating?: number;
}

export const getAllBooks = () => {
  return demoBooks as Book[];
};
