export interface Item {
  item_name: string;
  item_description: string;
  item_image: string;
  item_price: number;
  item_quantity: number;
  category_id: number;
}

export let items: Item[] = [];
