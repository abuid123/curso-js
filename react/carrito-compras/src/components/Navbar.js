import { Component } from "react";
import Logo from './Logo'
import Carro from './Carro.js'

const styles = {
    navbar:{
        height:'100px',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        position:'relative',
        padding:'0 50px',
        boxShadow:'0 2px 3px rgba(0,0,0,0.1)'
    }
}

class Navbar extends Component{
    render(){
        return(
            <nav style={styles.navbar}>
                <Logo/>
                <Carro/>
            </nav>
        )
    }
}

export default Navbar