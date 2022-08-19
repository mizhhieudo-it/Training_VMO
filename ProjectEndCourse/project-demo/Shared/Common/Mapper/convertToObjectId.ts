import mongoose from 'mongoose';
export function convertToObjectWithArray(
  arr: string[],
): mongoose.Types.ObjectId[] {
  let result: mongoose.Types.ObjectId[] = [];
  if (arr.length > 0) {
    arr.forEach((x) => {
      let element = new mongoose.Types.ObjectId(x);
      result.push(element);
    });
  } else {
    throw new Error(`Arrray cannot be empty`);
  }
  return result;
}
export function convertToObject(idString: string): mongoose.Types.ObjectId {
  let element = new mongoose.Types.ObjectId(idString);
  return element;
}
