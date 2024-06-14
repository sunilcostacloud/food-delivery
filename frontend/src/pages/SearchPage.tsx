import { useParams } from "react-router-dom"


const SearchPage = () => {
    const {city} = useParams();
  return (
    <div>User Searched for {city}</div>
  )
}

export default SearchPage