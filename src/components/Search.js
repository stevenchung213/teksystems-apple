import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import MediaTabs from './MediaTabs';

const Search = ({ view }) => {
  
  const api = 'http://localhost:3000/api/v1/itunes/search';

  const [value, setValue] = useState('');
  const [data, setData] = useState({
    data: undefined,
    loading: false,
    done: false
  });
  const [kinds, setKinds] = useState(undefined);
  
  const submit = (e) => {
    e.preventDefault();
    const url = `${api}/${value}`;
    setData({
      data: undefined,
      loading: true,
      done: false
    });
    fetch(url, { method: 'POST' })
      .then(resp => resp.json())
      .then(result => {
        const kinds = Object.keys(result);
        setKinds(kinds);
        setData({
          data: result,
          loading: false,
          complete: true
        });
      })
      .catch(err => console.log(err));
    
    setValue('');
  };
  
  const searchContainer = {
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'sticky',
      top: 64,
      backgroundColor: 'rgba(245, 245, 245, 1)',
      zIndex: 5
    },
    inputContainer = {
      display: 'flex',
      width: '50vw',
      flexDirection: 'row'
    },
    input = {
      width: '40vw'
    },
    buttonBox = {
      width: '10vw'
    },
    button = {
      marginTop: 28,
      borderRadius: 20,
      marginLeft: 5
    };
 
  return (
    <div id={`search-wrapper`} style={view}>
      <div id={`search-container`} style={searchContainer}>
        <form onSubmit={submit} style={inputContainer}>
          <div id={`input-box`} style={input}>
            <TextField required id="standard-search"
                       label="search media" type="search"
                       margin="normal" value={value}
                       onChange={e => setValue(e.target.value)}
                       autoFocus fullWidth/>
          </div>
          <div id={`input-button`} style={buttonBox}>
            <Button variant="contained" color="secondary"
                    type="submit" style={button}>search</Button>
          </div>
        </form>
      </div>
      <div id={`results-container`}>
        {
          data.loading ? <LinearProgress/> :
            data.complete && <MediaTabs kinds={kinds} data={data.data}/>
        }
      </div>
    </div>
  );
};

export default Search;
