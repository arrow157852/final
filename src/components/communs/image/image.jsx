
import style from "./image.module.css"

const image=({src, alt})=>{
return <div>
    <img src={src} alt={alt}/>
</div>
}

export default  image;