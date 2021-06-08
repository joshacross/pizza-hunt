const { Schema, model } = require("mongoose");


//Schema
const PizzaSchema = new Schema({
//Name of pizza
    pizzaName: {
        type: String
    },
// name of the user that created the pizza
    createdBy: {
        type: String
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
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }   
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });
  

const Pizza = model('Pizza', PizzaSchema);

//export Pizza model
module.exports = Pizza;
