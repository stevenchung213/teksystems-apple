import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useInput } from '../hooks/';
import Media from './Media';

const Search = ({ view }) => {
  
  const api = 'http://localhost:3000/api/v1/itunes/search';
  const { value, props, reset } = useInput('');
  const [data, setData] = useState(undefined);
  const [kinds, setKinds] = useState(undefined);
  
  const submit = (e) => {
    e.preventDefault();
    const url = `${api}/${value}`;
    
    fetch(url, { method: 'POST' })
      .then(resp => resp.json())
      .then(result => {
        const kinds = Object.keys(result);
        setKinds(kinds);
        setData(result);
      })
      .catch(err => console.log(err));
    
    reset();
    console.log(data);
  };
  
  const saveToLocal = () => {
    localStorage
  };
  
  const searchContainer = {
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: '5vh'
    },
    inputContainer = {
      display: 'flex',
      width: '45vw',
      flexDirection: 'row'
    },
    input = {
      width: '35vw'
    },
    buttonBox = {
      width: '10vw'
    },
    button = {
      marginTop: 28,
      borderRadius: 20,
      marginLeft: 5
    },
    kindsContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    sections = {
      marginTop: '2vh'
    },
    sectionTitle = {
      paddingBottom: '2vh'
    };
  
  return (
    <div id={`search-wrapper`} style={view}>
      <div id={`search-container`} style={searchContainer}>
        <form onSubmit={submit} style={inputContainer}>
          <div id={`input-box`} style={input}>
            <TextField required id="standard-search"
                       label="search media" type="search"
                       margin="normal" {...props}
                       autoFocus fullWidth/>
          </div>
          <div id={`input-button`} style={buttonBox}>
            <Button variant="contained" color="secondary"
                    type="submit" style={button}>search</Button>
          </div>
        </form>
      </div>
      <Divider/>
      <div id={`results-container`}>
        {
          data && kinds &&
          <div id={`kinds-container`}>
            {
              kinds.map(kind =>
                <div id={`section-container`} key={kind} style={sections}>
                  <Typography variant="h5" align="center"
                              color="secondary" style={sectionTitle}>
                    {`${kind[0].toUpperCase()}${kind.slice(1)}s`}
                  </Typography>
                  <Divider/>
                  <div id={`${kind}-container`} style={kindsContainer}>
                    {
                      data[kind].map((media, i) => (
                        <Media media={media} key={i}/>
                      ))
                    }
                  </div>
                  <Divider/>
                </div>
              )
            }
          </div>
        }
      </div>
    </div>
  );
};

export default Search;
