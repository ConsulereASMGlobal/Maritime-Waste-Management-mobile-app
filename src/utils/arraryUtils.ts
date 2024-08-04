export const mergeTwoArray = (
  arr1: any[],
  arr2: any[],
  mergeBy: string,
  optionalMergeKey?: string
) => {
  const temp = new Set();

  arr1 &&
    arr1?.forEach((x, index) => {
      if (x?.[optionalMergeKey ?? mergeBy] === arr2?.[index]?.[mergeBy]) {
        temp.add({ ...x, ...arr2?.[index] });
      }
    });

  return Array.from(temp);
};
