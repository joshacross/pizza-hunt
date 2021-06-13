// create a variable to store conencted database object when connection is complete
let db;

// request variable to act as an event listener - event listener is created
// when we open the connection to the database using the indexedDB.open() method - pizza_hunt is the name, and it's version 1
const request = indexedDB.open('pizza_hunt', 1);

// event listener will emit if the database version changes (nonexistant to v1, v1 to v2, etc...)
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    // 1.) create an object store (table) called `new_pizza`
    // 2.) set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// after successful
request.onsuccess = function(event) {
    // when db is successfully created with its object store
    //(from onupgradedneeded event above or simply established a connection), 
    // save reference to the db in global variable
    db = event.target.result;

    // check if app is online
    // if yes => run uploadPizza() to send all local db data to api
    if (naviagator.online) {
        //uploadPizza();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

/* NOTES ^:
onsuccess is setup so that when we finalize the ocnnection to the database,
we can store the resulting database object to the global variable db we created earlier
This event will also emit everytime we interact = check to see if the app is connected to internet
if it is, then we execute uploadPizza function.

Plus - onerror event handler if anything goes wrong with the database interaction

*/

// run function if user attempts to submit a new pizza and there's not internet
// runs if the fetch() function's .catch() method is executed
function saveRecord(record) {
    // new transaction to db with read/write permission
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the object store for new_pizza
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //add record to your store with add method
    pizzaObjectStore.add(record);
}

/* NOTES ^: 
IndexedDB opens a transaction or temp connection to maintain an accurate reading
of the data it stores so that data is not in flux all the time.

Transaction is open - we access new_pizza object store, because that is where we'll be adding data

.add() method to insert data into the new_pizza object store*/