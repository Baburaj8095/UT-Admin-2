import React,{useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';

const SearchBar = () => {

        const [searchedWord, setsearchedWord] = useState('');

        const handleSearchedWord = (event) =>{

            setsearchedWord(event.target.value)
            console.log("searched word: ", searchedWord)
        }

        const handleOnSearchIconClicked =() =>{
            console.log("searched icon clicked")
        }





    return (
       
            <TextField 
                style={{marginTop:'-10px',marginLeft :'40px',width:'340px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
                          
                InputProps={{       
                    
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleOnSearchIconClicked}
                                edge="end"
                                >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    
                    }}
                placeholder="search inventory with product name.."
                variant="outlined"
                //margin="normal"
                required
                size="small"
                name="search"
                id="search"
                value={searchedWord}
                onChange={(event) =>handleSearchedWord(event)}
                />
    )
}

export default SearchBar
