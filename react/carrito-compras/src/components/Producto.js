import { Component } from "react";
import Button from './Button'

const styles = {
    imagenes:{
        width:'100%',
        height:'200px',
        objectFit:'scale-down'
    },
    producto:{
        border:'solid 1px #eee',
        boxShadow:'0 5px 5px rgb(0,0,0,0.1)',
        width:'30%',
        padding:'10px 15px',
        borderRadius:'15px'
    }
}

class Producto extends Component{
    render(){
        const {agregarAlCarro,producto} = this.props
        return(
            <div style={styles.producto}>
                <img style={styles.imagenes} alt={producto.name} src={producto.img}/>
                <h3>{producto.name}</h3>
                <p>${producto.price}</p>
                <Button onClick={()=> agregarAlCarro(producto)}>
                    Agregar al carro
                </Button>
            </div>
        )
    }
}

export default Producto