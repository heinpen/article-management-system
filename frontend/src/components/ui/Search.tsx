import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { ChangeEvent, FC } from 'react';
interface SearchProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = ({ handleSearch }) => {
  return (
    <Box
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a post"
        inputProps={{ 'aria-label': 'search for a post' }}
        onChange={handleSearch}
      />
    </Box>
  );
};
export default Search;
