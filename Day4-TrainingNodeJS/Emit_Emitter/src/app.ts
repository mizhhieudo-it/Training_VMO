import eventEmit from "./EmitaAndEmitterNodeJS/emit";
const Emitter = new eventEmit();
Emitter.on("good", () => {
  console.log("good job man");
});
Emitter.on("good", () => {
  console.log("bonus 1k$");
});

function isAchieveTarget(KPI: number) {
  if (KPI < 3000) {
    console.log("không đủ chỉ tiêu tháng !!! ");
  } else {
    console.log("Đã đạt chỉ tiêu !!!");
    Emitter.emit("good");
  }
}
isAchieveTarget(3000);
