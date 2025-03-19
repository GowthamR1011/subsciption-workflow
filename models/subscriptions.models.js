import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [50, 'Name must be at most 50 characters'],
        trim: true
    },

    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive']
    },

    currency:{
        type: String,
        required: [true, 'Currency is required'],
        enum: ['USD', 'EUR', 'GBP','INR'],
        default: 'USD'
    },

    frequency:{
        type: String,
        required: [true, 'Frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },

    paymentMethod:{
        type: String,
        required: [true, 'Payment Method is required'],
        enum: ['card', 'paypal', 'stripe'],
        default: 'card'
    },

    status:{
        type: String,
        enum: ['active', 'inactive','cancelled'],
        default: 'active'
    },

    startDate:{
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: function(v){
                return v >= new Date();
            },
            message: 'Start Date must be in the future'
        }
    },

    renewalDate:{
        type: Date,
        validate: {
            validator: function(v){
                return v > this.startDate;
            },
            message: 'Renewal Date must be after Start Date'
        }
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    }

}, {
    timestamps: true
});

subscriptionSchema.pre('save', function(next){

    if(!this.renewalDate){
        if(this.frequency === 'daily'){
            this.renewalDate = new Date(this.startDate).setDate(this.startDate.getDate() + 1);
        } else if(this.frequency === 'weekly'){ 
            this.renewalDate = new Date(this.startDate).setDate(this.startDate.getDate() + 7);
        }
        else if(this.frequency === 'monthly'){
            this.renewalDate = new Date(this.startDate).setMonth(this.startDate.getMonth() + 1);
        }
        else if(this.frequency === 'yearly'){
            this.renewalDate = new Date(this.startDate).setFullYear(this.startDate.getFullYear() + 1);
        }
    }

    if(this.renewalDate < new Date()){
        this.status = 'inactive';
    }
    
    next();

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;