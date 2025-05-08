const mongoose=require("mongoose")
const url="mongodb+srv://newsBite:newsBite1020@cluster0.wf5vw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const mongodb=async()=>{
    try{
        await mongoose.connect(url);
        console.log("Connected to the database")

    }
    catch(error){
        console.log(error)

    }
}
module.exports=mongodb