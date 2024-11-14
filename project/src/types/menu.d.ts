type MenuItem = {
  id: number;
  type: "wonton" | "dip" | "drink";
  name: string;
  description: string;
  price: number;
};

type Wonton = MenuItem & {
  type: "wonton";
  ingredients: string[];
};

type Dip = MenuItem & {
  type: "dip";
};

type Drink = MenuItem & {
  type: "drink";
};

type MenuData = (Wonton | Dip | Drink)[];
