export default class Voisin {
  constructor(max, min, region) {
    this.max = max;
    this.min = min;
    this.region = region;
  }
}

//useless
const getMin = list => {
  let currentMin = list.length;
  for (let i = 0; i < list.length; i++) {
    const elem = list[i].split[1];
    if (Number(elem) < currentMin) {
      currentMinIndex = Number(elem);
    }
  }
  return Number(elem);
};

//useless
const getMax = list => {
  let currentMinIndex = 0;
  for (let i = 0; i < list.length; i++) {
    const elem = list[i].split[1];
    if (Number(elem) > currentMinIndex) {
      currentMinIndex = Number(elem);
    }
  }
  return Number(elem);
};
