const db = idb.openDB('posts-store', 1, {
    upgrade(db) {
        // Create a store of objects
        const store1 = db.createObjectStore('posts', {
            keyPath: '_id',
            autoIncrement: true
        });
        store1.createIndex('_id', '_id');

        // Create another store of objects
        const store2 = db.createObjectStore('sync-posts', {
            keyPath: 'id',
            autoIncrement: true
        });
        store2.createIndex('id', 'id');
    },
});

function writeData(st, data) {
    return db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.put(data);
            return tx.done;
        })
}

function readAllData(st) {
    return db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readonly');
            let store = tx.objectStore(st);
            return store.getAll();
        })
}

function clearAllData(st) {
    return db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.clear();
            return tx.done;
        })
}


function deleteOneData(st, id) {
    db
        .then( dbPosts => {
            let tx = dbPosts.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.delete(id);
            return tx.done;
        })
        .then( () => {
            console.log('Data deleted ...');
        });
}
