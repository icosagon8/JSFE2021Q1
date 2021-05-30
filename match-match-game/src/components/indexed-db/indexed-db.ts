export class Database {
  public db: IDBDatabase | null = null;

  init(dbName: string, version?: number): void {
    const openRequest = indexedDB.open(dbName, version);

    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const settings = database.createObjectStore('settings', { keyPath: 'id', autoIncrement: true });
      const users = database.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      users.createIndex('score', 'score');
      settings.add({ cardsType: 'animals', difficulty: 4 });
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write<RecordType>(collection: string, data: RecordType): Promise<RecordType> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readwrite');
        const store = transaction.objectStore(collection);
        const newRecord: RecordType = { ...data };
        store.put(newRecord);

        transaction.oncomplete = () => {
          resolve(newRecord);
        };
      }
    });
  }

  readAll<RecordType>(collection: string): Promise<Array<RecordType>> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readonly');
        const store = transaction.objectStore(collection);
        const result = store.getAll();

        transaction.oncomplete = () => {
          resolve(result.result);
        };
      }
    });
  }

  readSorted<RecordType>(collection: string): Promise<Array<RecordType>> {
    return new Promise((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readonly');
        const store = transaction.objectStore(collection);
        const result = store.index('score').openCursor(null, 'prev');
        const resData: RecordType[] = [];

        result.onsuccess = () => {
          const cursor = result.result;

          if (cursor) {
            const currentValue: RecordType = cursor.value;
            resData.push(currentValue);
            cursor.continue();
          }
        };

        transaction.oncomplete = () => {
          resolve(resData);
        };
      }
    });
  }
}

export const iDB = new Database();
