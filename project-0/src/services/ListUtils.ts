export function isIn(list1: unknown[], list2: unknown[]) {
  return list1.every((item1) => list2.includes(item1));
}
