// @flow
import initialState from '../initialState';

const State = localStorage.getItem('state');
const db = typeof State === 'string' ? JSON.parse(State) : initialState;
const isAuthenticated = localStorage.getItem('isAuthenticated');

const Auth = {
  isAuthenticated: isAuthenticated === 'true' || false,
  authenticate(data: any, callback: any) {
    const { username, password } = data;
    const login = db.users.filter(user => user.username === username && user.password === password);
    if (login.length) {
      this.isAuthenticated = true;
      const response = {
        id: login[0].id,
        nickname: login[0].nickname,
      };
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(response));
    }
    setTimeout(callback(this.isAuthenticated), 100);
  },
  signout(callback: any) {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', 'false');
    setTimeout(callback, 100);
  },
  getUserById(id: number, callback: any) {
    const data = db.users.filter(user => user.id === id);
    setTimeout(callback(data[0]), 100);
  },
  addUser(data: any, callback: any) {
    const id = db.users.length + 1;

    db.users.push({
      id,
      ...data,
    });
    this.updateDb();
    this.getUserById(id, (user) => {
      setTimeout(callback(user), 100);
    });
  },
  editUser(id: number, data: any, callback: any) {
    const userId = parseInt(id, 0);
    const index = db.users.findIndex(user => user.id === userId);
    console.log(index);
    db.users[index] = { ...db.users[index], ...data };
    this.updateDb();
    setTimeout(callback(db.users[index]), 100);
  },
  deleteUser(id: number, callback: any) {
    const userId = parseInt(id, 0);
    const index = db.users.findIndex(user => user.id === userId);
    // /delete db.users[index];
    if (userId !== 1) {
      db.users.splice(index, 1);
      this.updateDb();
    }
    setTimeout(callback(db.users[index]), 100);
  },
  getUsers(callback: any) {
    setTimeout(callback(db.users), 100);
  },
  updateDb() {
    localStorage.setItem('state', JSON.stringify(db));
  },
};

export default Auth;
