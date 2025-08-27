export interface Category {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export let categories: Category[] = [];
