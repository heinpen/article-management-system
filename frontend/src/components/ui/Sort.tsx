import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SortData } from '@types';
import { useEffect, useState, type FC } from 'react';

interface SortProps {
  handleSort: (value: string) => void;
  sortData?: SortData;
}

const Sort: FC<SortProps> = ({ handleSort, sortData }) => {
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // set the default sort option
    if (sortData && sortData.sortingValues.length !== 0 && sortOption === '') {
      setSortOption(sortData.defaultValue);
    }
  }, [sortData, setSortOption, sortOption]);

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
          {sortData &&
            sortData.sortingValues.map(({ label, value }) => (
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
