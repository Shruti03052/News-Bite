
import React,{ useState,useEffect, use } from "react";
import "../News.css"
import { useParams } from "react-router-dom";
export default function Cards() {
const[news,setNews]=useState([]);
const[visibleNews,setVisibleNews]=useState(20);
const {category}=useParams();
console.log(category);
 useEffect(()=>{
  const fetchNews= async()=>{
    const query= category || 'general';
    try{
      const response=await fetch(`http://localhost:5000/api/news?q=${query}`)
      const data=await response.json();
      setVisibleNews(20)
      setNews(data.articles)
      console.log(data);
    }
    catch(error){
      console.error("Error in fetching the data",error);
    }

  }
  fetchNews();
 },[category])


// useEffect(()=>{
  
//   fetch('http://localhost:5000/api/news?q=general')
//   .then((response)=>response.json())
//   .then((data)=>{
//     setNews(data.articles)
   
    
//   })
//   .catch((error)=>{
//     console.error('Error fetching data:', error);
   

//   })
    

// },[])

const loadmore=()=>{
  setVisibleNews((cnt)=> cnt+20);
}



  return (
    <div className="news-container">
      {news.filter(article => article.description && article.title && article.urlToImage).slice(0,visibleNews).map((article,index)=>(
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
