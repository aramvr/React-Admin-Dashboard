// @flow
import dataBase from './config';

const optionsApi = {
  saveOptions(data: any, callback: any) {
    dataBase.db.options = {
      ...dataBase.db.options,
      ...data,
    };
    dataBase.updateDb();
    setTimeout(callback(data), 100);
  },
  getOptions(callback: any) {
    const data = dataBase.db.options;
    setTimeout(callback(data), 100);
  },
  getOption(key: string, callback: any) {
    const data = dataBase.db.options[key];
    setTimeout(callback(data), 100);
  },
};

export default optionsApi;
