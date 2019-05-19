import React, { useState } from 'react';
import Responsive from 'react-responsive';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import MediaTabs from './MediaTabs';
import useLocalStorage from '../hooks';

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
  
  const mobileSearchContainer = {
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'sticky',
      top: 48,
      backgroundColor: 'rgba(245, 245, 245, 1)',
      zIndex: 20
    },
    searchContainer = {
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'sticky',
      top: 64,
      backgroundColor: 'rgba(245, 245, 245, 1)',
      zIndex: 20
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
  
  const View = (style) =>
    <div id={`search-container`} style={style}>
      <form onSubmit={submit} style={inputContainer}>
        <div id={`input-box`} style={input}>
          <TextField required id="standard-search"
                     label="search media" type="search"
                     margin="normal" value={value}
                     onChange={e => setValue(e.target.value)}
                     fullWidth/>
        </div>
        <div id={`input-button`} style={buttonBox}>
          <Button variant="contained" color="secondary"
                  type="submit" style={button}>
            Search
          </Button>
        </div>
      </form>
    </div>;
  
  return (
    <div id={`search-wrapper`} style={view}>
      <Responsive maxWidth={599}>
        {
          matches => matches ?
            View(mobileSearchContainer)
            :
            View(searchContainer)
        }
      </Responsive>
      <div id={`results-container`}>
        {
          data.loading ?
            <LinearProgress/>
            :
            data.complete &&
            <MediaTabs kinds={kinds} data={data.data} home={false} centered/>
        }
      </div>
    </div>
  );
};

export default Search;
