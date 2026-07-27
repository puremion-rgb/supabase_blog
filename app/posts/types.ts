export type PostFormState = {
  errors: {
    title?: string;
    content?: string;
  };
  message: string | null;
};
