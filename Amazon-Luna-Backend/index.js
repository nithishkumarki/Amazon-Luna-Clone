const express=require("express");
const app=express();
require('dotenv').config();
const port=process.env.PORT;
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000', 
    'http://localhost:5173',
    'https://your-frontend-domain.com' 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));

// Connect to MongoDB
const mongoose=require('mongoose');
const { title } = require("process");
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDB connected")).catch((err) => console.error("MongoDB error:", err));

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

app.listen(port,(error)=>{
       if(!error)
       {
        console.log("Server Running on Port"+port);
       }
       else{
        console.log("Error : "+error);
       }
})

const userSchema=mongoose.model('users',
{
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    playList: {type: Map,of: Number,default: {}},
    date:{type:Date,default:Date.now},
    primesubscription:{type:String,default:"notSubscribed"},
    ubisoftsubscription:{type:String,default:"notSubscribed"},
    EAsubscription:{type:String,default:"notSubscribed"},
    gogsubscription:{type:String,default:"notSubscribed"},
    subscriptionExpiryDate:{type:Map,of:Date,default: {}},
})

//login sign =

app.post("/signup",async(req,res)=>
{
     const {username,email,password}=req.body;
    
     let checkUser=await userSchema.findOne({email:email});

     if(checkUser)
     {
        return res.status(400).json({success:false,error:"User already exists"});
     }
     
      let playListObject={};
      for(let i=0;i<100;i++)
      {
         playListObject[i]=0;
      }
      const newUser=new userSchema({
        username:username,
        email:email,
        password:password,
        playList:playListObject,
        date:Date.now(),
        primesubscription:"notSubscribed",
        ubisoftsubscription:"notSubscribed",
        amazonluna:"notSubscribed",
        jackbox:"notSubscribed",
        gogcom:"notSubscribed",
      })
       await newUser.save();

        const data={
            user:{
                id:newUser.id
            }
        }
        const Token=jwt.sign(data,'secret');
        return res.status(200).json({status:"success",token:Token});
     
})

app.post("/signin",async(req,res)=>{
    const {email,password}=req.body;

    let checkUser=await userSchema.findOne({email:email});
    if(!checkUser)
    {
        return res.status(400).json({success:false,error:"User does not exist"});
    } 
    if(checkUser.password!==password)
    {
        return res.status(400).json({success:false,error:"Incorrect Password"});
    }
    const data={
        user:{
            id:checkUser.id
        }
    }
    const token=jwt.sign(data,'secret');
    res.json({success:true,token});
})


const fetchUser=(req,res,next)=>{

   const token=req.header('auth-token');

   if(!token)
   {
    return res.status(401).json({success:false,error:"Please authenticate using a valid token"});
   }
   try
   {
      const data=jwt.verify(token,"secret");
      req.user=data.user;
      next();
   }
   catch(error)
   {
    res.status(500).json({success:false,error:"Internal Server Error"});
   }
}

app.post("/getuserdata",fetchUser,async(req,res)=>
{
    let userData=await userSchema.findById(req.user.id);
    if(!userData)
    {
        return res.status(400).json({success:false,error:"User does not exist"});
    }
    else
    {   
          const now = new Date();
          const packs=["prime","ubisoft","EA","gog"];
          packs.forEach((pack)=>{
            const expiry=userData.subscriptionExpiryDate.get(pack);
            if(userData[`${pack}subscription`] === "subscribed" && expiry < now)
            {
                userData[`${pack}subscription`] = "notSubscribed";
            }
          })
        return res.status(200).json({success:true,userData:userData});
    }
})

const gameSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // unique identifier for the game
  metacritic: { type: Number, required: true },
  theme: { type: [String], required: true },
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true },
  gameplay: { type: String, required: true },
  videoQuality: { type: String, required: true },
  inputs: [{ type: String, required: true }], // array of strings
  languages: [{ type: String, required: true }], // array of strings
  ageRating: { type: String, required: true },
  contentWarnings: [{ type: String, required: true }], // array of strings
  description: { type: String, required: true },
  videoLink: { type: String, required: true },
  imageCardLink: { type: String, required: true },
  imageGallery: [{ type: String, required: true }], // array of image URLs
  backgroundImage: { type: String, required: true },
  titleImage: { type: String, required: true },
  pack: { type: String, required: true } ,
  
});


const gameModel=mongoose.model('games',gameSchema);

app.post("/addgame", async (req, res) => {
  try {
    const games = await gameModel.find({});
    const id = games.length > 0 ? games[games.length - 1].id + 1 : 1;

    const newGame = new gameModel({
        id: id,
        
      metacritic: req.body.metacritic,
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      publisher: req.body.publisher,
      developer: req.body.developer,
      gameplay: req.body.gameplay,
      videoQuality: req.body.videoQuality,
      inputs: req.body.inputs, // array
      languages: req.body.languages, // array
      ageRating: req.body.ageRating,
      contentWarnings: req.body.contentWarnings, // array
      description: req.body.description,
      videoLink: req.body.videoLink,
      imageCardLink: req.body.imageCardLink,
      imageGallery: req.body.imageGallery, // array
      backgroundImage: req.body.backgroundImage,
      titleImage: req.body.titleImage,
      pack: req.body.pack,
      theme: req.body.theme,
    });

    await newGame.save();
    return res.status(200).json({ success: true, message: "Game added successfully" });

  } catch (error) {
    console.error("Error in /addgame:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/getAllGames",async(req,res)=>
{
    try
    {
         const games=await gameModel.find({});
         if(games.length === 0)
         {
            return res.status(404).json({success:false,error:"No games found"});
         }
         return res.status(200).json({success:true,games:games});
    }
    catch(error)
    {
        console.error("Error in /getAllGames:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

app.post("/addToPlayList",fetchUser,async(req,res)=>
{
       const userId=req.user.id;
       const gameId=req.body.gameid.toString();

       const user= await userSchema.findById(userId);
       if(!user)
       {
           return res.status(404).json({success:false,error:"User not found"});
       }
    //    console.log("adding game into playlist", gameId);

        user.playList.set(gameId, 1);

    //    console.log("adding game from playlist", user.playList);

       await user.save();

        return res.status(200).json({success:true,playList:user.playList});
        
 })

    app.post("/removeFromPlayList",fetchUser,async(req,res)=>
{
       const userId=req.user.id;
       const gameId=req.body.gameid.toString();
       
       const user= await userSchema.findById(userId);
       if(!user)
        {
            return res.status(404).json({success:false,error:"User not found"});
        }
        // console.log("removing game from playlist", gameId);

        user.playList.set(gameId, 0);

        // console.log("removing game from playlist", user.playList);

       await user.save();


        return res.status(200).json({success:true,playList:user.playList});

})
app.post("/purchaseSubscription",fetchUser,async(req,res)=>
    {
        const userId=req.user.id;
        const pack=req.body.pack;
        const user=await userSchema.findById(userId);
        if(!user)
        {
            return res.status(404).json({success:false,error:"User not found"});
        }
        
        const expiryDate=new Date();
        expiryDate.setMonth(expiryDate.getMonth()+1);
        
        if(["prime","ubisoft","EA","gog"].includes(pack))
        {
            user[`${pack}subscription`]="subscribed";
            user.subscriptionExpiryDate.set(pack,expiryDate);
        }
        await user.save();

        return res.status(200).json({success:true,subscription:pack});

})






