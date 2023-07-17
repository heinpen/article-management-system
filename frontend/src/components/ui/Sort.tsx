import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useState, type FC, ChangeEvent, useEffect, memo, useRef } from 'react';

interface SortProps {
  handleSort: (value: string) => void;
  sortingValues?: {
    label: string;
    value: string;
  }[];
}

const Sort: FC<SortProps> = ({ handleSort, sortingValues }) => {
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // set the default sort option
    if (sortingValues && sortingValues.length !== 0 && sortOption === '') {
      console.log(sortingValues);

      setSortOption(sortingValues[0].value);
    }
  }, [sortingValues, setSortOption, sortOption]);

  const handleLocalSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortOption(value);
    handleSort(value);
  };

  return (
    <>
      <FormControl size="small">
        <InputLabel id="sort-by-date-label">Sort by Date</InputLabel>
        <Select
          labelId="sort-by-date-label"
          id="sort-by-date-select"
          label="Sort by Date"
          value={sortOption}
          onChange={handleLocalSortChange}
        >
          {sortingValues &&
            sortingValues.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Sort;
