interface typeEmit {
  [index: string]: Function[];
}

export default class Emitter {
  private emmit: typeEmit = {};
  on = (type: string, listener: Function) => {
    this.emmit[type] = this.emmit[type] || [];
    this.emmit[type].push(listener);
  };
  emit = (type: string) => {
    if (this.emmit[type]) {
      this.emmit[type].forEach((element) => {
        element();
      });
    } else {
      console.log("dosen't contain emmit");
    }
  };
}
