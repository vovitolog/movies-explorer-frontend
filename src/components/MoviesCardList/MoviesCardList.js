import "./MoviesCardList.css"
import { MoviesCard } from "../MoviesCard/MoviesCard"

export function MoviesCardList(){
  return(
<ul className="movies-list">
    <MoviesCard/>
    <MoviesCard/>
    <MoviesCard/>
    <MoviesCard/>
    <MoviesCard/>
    <MoviesCard/>
</ul>
  )
}