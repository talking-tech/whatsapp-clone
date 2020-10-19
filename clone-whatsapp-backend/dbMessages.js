import mongoose from 'mongoose';

const whatsapp_schema=mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    sender: Boolean
});

export default mongoose.model('messagecontent',whatsapp_schema,'messagecontent');

