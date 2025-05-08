
import React,{ useState,useEffect } from "react";
import "../News.css"

export default function Cards() {
const[news,setNews]=useState([]);
const[visibleNews,setVisibleNews]=useState(20);
// const[category,setCategory]=useState("general");

// useEffect(()=>{
//   fetchNews()
// },[category])

// const fetchNews= async()=>{
//   try{
//     const response=await fetch(`http://localhost:5000/api/news?q=${category}`)
//     const data=await response.json();
//     setNews(data.articles)
//   }
//   catch(error){
//     console.log("Error in fetching news",error);
//   }  
// }

// "https://newsapi.org/v2/everything?q=general"
useEffect(()=>{
  fetch('http://localhost:5000/api/news?q=general')
  .then((response)=>response.json())
  .then((data)=>{
    setNews(data.articles)
   
    
  })
  .catch((error)=>{
    console.error('Error fetching data:', error);
   

  })
    

},[])

const loadmore=()=>{
  setVisibleNews((cnt)=> cnt+20);
}



  return (
    <div className="news-container">
      {news.slice(0,visibleNews).map((article,index)=>(
        <div key={index} className="news-card">
          {article.urlToImage &&(
            <img src={article.urlToImage} alt={article.title} className="news-img" />
             
            
          )}
          <div className="news-content">
          <h2  className="news-title">{article.title}</h2>
          <p className="news-description">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link"> Read More</a>


          </div>
          
        </div>
        
      ))}

      {visibleNews<news.length && (
        <div className="mt-3">

           <button onClick={loadmore} className="btn btn-dark">Load More</button>
          </div>

      )
        
      }

    </div>
  
  );
}
