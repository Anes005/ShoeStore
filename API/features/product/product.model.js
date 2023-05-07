import mongoose,{Schema} from 'mongoose';


const CommentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLanght:500
    },
    upvotes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

const productSchema = new mongoose.Schema({
    name: {
         type: String, 
         trim : true,
         required: true
         },
    description: {
            type: String,
            trim: true,
    },
    size: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothes', 'Shoes', 'Accessories', 'Books', 'Beauty', 'Sports', 'Home', 'Kitchen', 'Toys', 'Food', 'Other']
    },
    price: {
        required: true,
        type: Schema.Types.Array,
        of : {value: Number, currency: {type: String, enum: ['USD', 'EUR', 'GBP'], default: 'USD'}}
    },
    color :{
        type: String,
    },
    rating: {
        type: Number,
        min : 0,
        max : 5,
    },
    image: {
        type: String,
    },
    Comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }, 
}) 

productSchema.statics.getAllProductDocs = async function () {
    const docs = await this.find({});
    return docs;

}
productSchema.statics.getProductDocByID = async function (id) {
    const doc = await this.findOne({_id : id});
    return doc;
}

export const Product = mongoose.model('Product', productSchema);
export const Comment = mongoose.model('Comment', CommentsSchema);