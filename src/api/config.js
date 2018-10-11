import initialState from '../initialState';

const State = localStorage.getItem('state');

export default {
  db: typeof State === 'string' ? JSON.parse(State) : initialState,
  updateDb() {
    localStorage.setItem('state', JSON.stringify(this.db));
  },
};
