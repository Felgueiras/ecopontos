import userImage from '../../img/contas_externas/google_fit.png'
class ForumAPI {

  static getUsers = () => {
    let users = [];
    const status = ['online', 'offline'];
    for (let index = 0; index < 5; index++) {
      const element = index;
      users.push({
        name: 'user' + element,
        tokens: 20 * element,
        ranking: element,
        image: userImage,
        status: status[index % 2]
      })
    }
    return users;
  }

  static fetchMessages() {
    var messages = [];
    const len = 5;
    for (var i = 0; i < len; i++) {
      messages.push({
        userIcon: userImage,
        tokens: 123,
        time: new Date(),
        sender: "UserX",
        text: "Hello!"
      });
    }
    return messages;
  }
}

export default ForumAPI
