const { Schema, model } = require("mongoose");
const Pizza = model('Pizza', PizzaSchema);


//Schema
const PizzaSchema = new Schema({
//Name of pizza
    pizzaName: {
        type: String
    },
// name of the user that created the pizza
    createdBy: {
        type: toString,
    },
// timestamp of when the pizza was created
    createdAt: {
        type: Date,
        default: Date.now
    },
// timestamp of any updates to the pizza's data
    updatedAt: {
        type: Date,
        default: Date.now
    },
// Pizza's suggested size
    size: {
        type: String,
        default: 'Large'
    },
// pizza's toppings
    toppings: []
});

//export Pizza model
module.exports = Pizza;
