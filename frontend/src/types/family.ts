export type Person = {
  id: number;
  full_name: string;
  chinese_name?: string | null;
};

export type ParentChild = {
  id: number;
  parent_id: number;
  child_id: number;
};

export type CreatePersonInput = {
  full_name: string;
  chinese_name?: string | null;
};

export type CreateParentChildInput = {
  parent_id: number;
  child_id: number;
};
