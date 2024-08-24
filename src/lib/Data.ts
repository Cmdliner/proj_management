type RequireOne<T, K extends keyof T = keyof T> = 
  K extends keyof T 
    ? Required<Pick<T, K>> & Partial<Omit<T, K>> 
    : never;

export type ResponseType = RequireOne<{ success?: string; error?: string }> & {
  [key: string]: string;
};
