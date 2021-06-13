const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//Schema
const PizzaSchema = new Schema({
//Name of pizza
    pizzaName: {
        type: String,
        required: 'You need to provide a pizza name!',
        trim: true
    },
// name of the user that created the pizza
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
// timestamp of when the pizza was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
// timestamp of any updates to the pizza's data
    updatedAt: {
        type: Date,
        default: Date.now
    },
// Pizza's suggested size
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
            getters: true
        },
        id: false
    }   
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });
  

const Pizza = model('Pizza', PizzaSchema);

//export Pizza model
module.exports = Pizza;
