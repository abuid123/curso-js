import logo from './logo.svg';
import './App.css';

const estilo = (bg = '#333')=>({
  backgroundColor: bg,
  color:'#fff',
  padding:'5px 5px',
  margin: '5px 5px',
})

const Li = (props)=>{
  console.log(props)
  return(
    <li style={estilo('#000')} className='clase-li'>Valor de li</li>
  )
}

function App() {
  const valor = 'Triste';
  return (
    <ul className='clase-css'>
      <Li></Li>
    </ul>
  );
}

export default App;
