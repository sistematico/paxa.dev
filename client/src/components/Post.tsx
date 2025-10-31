import { useParams } from "react-router";
 
function Post(){
  const { slug } = useParams()
 
  return (
    <>
      <h1>Post {slug}</h1>
    </>
  )
}
 
export default Post;