import mongoose, { mongo } from "mongoose";

const connectDB = async ()=>{
     try{
        console.log('working  connectDB')
        
        const conn = await mongoose.connect('mongodb+srv://vfcmanikandan7:H3QX5P5e0HRSbmnG@foodko-cluster.uqlcj.mongodb.net/FoodKo?retryWrites=true&w=majority&appName=FoodKo-Cluster', {});


       
     }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1)
     }
}    
 export default connectDB