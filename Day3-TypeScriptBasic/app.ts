// interface cat {
//   model: string;
// }
// class Cat {
//   kindsOfCat: cat[] = [];
//   AddSpeciesCat = (item: cat) => {
//     this.kindsOfCat.push(item);
//   };
//   ShowListCat() {
//     this.kindsOfCat.forEach((element) => {
//       console.log(`loài ${element}`);
//     });
//   }
// }

// let Cats = new Cat();
// let species: cat = {
//   model: "Mớp",
// };
// Cats.AddSpeciesCat(species);
// species = {
//   model: "Anh",
// };
// Cats.AddSpeciesCat(species);
// Cats.ShowListCat();

interface MeoowType {
  model: string;
  name: string;
}
interface DogTypes {
  model: string;
  name: string;
}
class Animal<T> {
  kindsOfAnimal: T[] = [];
  AddSpeciesAnimal = (item: T) => {
    this.kindsOfAnimal.push(item);
  };
  ShowListAnimal() {
    this.kindsOfAnimal.forEach((element) => {
      console.log(`loài ${element}`);
    });
  }
}

let MeoowlList = new Animal<MeoowType>();
let species: MeoowType = {
  model: "Mớp",
  name: "mèo",
};
MeoowlList.AddSpeciesAnimal(species);
let DogList = new Animal<DogTypes>();
let dogs: DogTypes = {
  model: "Cảnh khuyển",
  name: "Chó",
};
DogList.AddSpeciesAnimal(dogs);
DogList.ShowListAnimal();
MeoowlList.ShowListAnimal();
