import React, {Component} from "react";
import axios from "axios";

//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

const filmesAPI = axios.create({
    baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=47baac08bd0da53c84230fe07a911cf7&language=en-US&page=1`
})

export default class Filmes extends Component{

    state = {
        filmes: []
    }

    // VAMOS PEGAR A API E JÁ MONTAR NA TELA
    componentDidMount(){
        this.pegarFilmes()
    }
    
    // PUXANDO API
    pegarFilmes = async () => {
        const resposta = await filmesAPI.get()
        console.log(resposta)
        
        const armazenamento = resposta.data.results.map((item) => {
            return{
                id: item.id,
                nome: item.title,
                imgs: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }

        })
        this.setState({
            filmes: armazenamento
        })

    }

  render(){
    return(
      <>
        <h1>Puxando API</h1>
        {this.state.filmes.map((item) => (
            <div key={item.id}>
                <img src={item.imgs} alt="imgs" />
                <li >{item.nome}</li>
            </div>
        ))}
      </>
    )
  }
}
