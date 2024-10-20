

export class Utils {

  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async generateRandomEmail(): Promise<string> {
    const randomString = Math.random().toString(36).substring(2, 10); // Creates a random string
    return 'girgan' + randomString + '@example.com';
  }


  static async generateRandomString(length: number): Promise<string> {
    let randomString = '';
    while (randomString.length < length) {
      randomString += Math.random().toString(36).substring(2);
    }
    randomString = randomString.substring(0, length);
    return randomString;
  }


  static async generateRandomNumber(length: number): Promise<string> {
    let randomIntString = '';
    while (randomIntString.length < length) {
      randomIntString += Math.floor(Math.random() * 10); // Generates a random integer between 0 and 9
    }
    return randomIntString;
  }





}
























