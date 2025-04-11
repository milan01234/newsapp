import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './loading';

export class News extends Component {
  articles=[
    
  ]
  constructor(){
    super();
    this.state={
      articles:this.articles,
      loading:true,
      page:1,
      
    }
  }
  async componentDidMount(){
    console.log("cdm")
    let url=""
    let data=await fetch(url)
    let parsedata=await data.json()
    console.log(parsedata)
    this.setState({articles:parsedata.articles,totalArticles:parsedata.totalResults,loading:false})

  }
handleNextClick=  async  ()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalArticles/20))){
      let url=``;
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedata=await data.json();
      console.log(parsedata);
     
     
      this.setState({
        articles:parsedata.articles,
        page:this.state.page+1,
        
        loading:false
      })

    }
    

  }
 handelPreviousClick= async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=84df7e4b3bf44883b52b57e69614f50f&page=${this.state.page-1}&pageSize=20`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedata=await data.json();
    console.log(parsedata);
    
    this.setState({
      articles:parsedata.articles,
      page:this.state.page-1,
   
      loading:false
    })

  }
  render() {
    return (
      <div className="container my-3 ">
        <h2 className='text-center'>News Top Head Lines</h2>
        {this.state.loading && <Loading/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
           return (<div className='col-md-4'>
           <Newsitem title={element.title==null?"No Title":element.title.slice(0,18)} description={element.description==null?"No Description":element.description.slice(0,88)} imageurl={element.urlToImage==null?"https://t3.ftcdn.net/jpg/07/95/29/46/240_F_795294622_IHgTkKIShSTGiNPctQghx1fvIW3RQ7Mp.jpg":element.urlToImage} newsUrl={element.url} />
           </div>)

        })} 
    
        </div> 
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handelPreviousClick}>&larr;Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/20)}type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>

    )
  }
}

export default News
