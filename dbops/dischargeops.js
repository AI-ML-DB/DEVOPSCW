const mongoose = require('mongoose');

//to log user activtites for potenial investigations requirements
const dischargeLogSchema = new mongoose.Schema({
    patient_number:{
        type:String,
        require:true,
    },
    bed_number:{
        type: Number,
        required: true,
    },
    condition:{
        type:String,
        enum:["critical","serious","fair","good","undetermined"],
        default:"undetermined",
        required: true,
    },
    admission_date:{
        type:Date,
        default: Date.now,
        required: true,
    },
    expected_discharge_date:{
        type:Date,
        default: () => new Date(+new Date() + 1*24*60*60*1000), //in one day
        required: true,
    },
}, { collection: 'Reglog' }); // Specify the collection name here

module.exports = mongoose.model('Reglog', logSchema);