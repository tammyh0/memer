import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { LinearProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';


function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

async function getMemes() {
  setLoading(true)
  setMemes([])
  const key = '5DURMCaeYx7p8oNiBpm8nJOOZIl7fdLU'
  let url = 'https://api.giphy.com/v1/gifs/search?'
  url += 'api_key='+key
  url += '&q='+text
  const r = await fetch(url) // get the response
  const body = await r.json() // get the body of the response
  setMemes(body.data) // store the body
  setText('') // set it back to empty after searching + grabbing the memes
  setLoading(false)
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search for memes!" 
            value={text} 
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> { // whenever there's a keypress, run the function that's contained below
              if(e.key==='Enter') getMemes()
            }}
          /> 

          <Button variant="contained" color="primary" 
          onClick={getMemes}> {/* whenever the button is clicked, run the getMemes function */}
            <Search />
            Search
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />}

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>
    </div>
  );
}

function Meme({title,images}) {
  const url = images.fixed_height.url

  return <div className="meme" onClick={()=> window.open(url, '_blank')}>
    <img src={images.fixed_height.url} alt="meme" /> 
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
