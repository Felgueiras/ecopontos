
class Utils
{

  static getRandomFloat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Utils
