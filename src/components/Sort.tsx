import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import DownArrow from './icons/DownArrow';

interface SortProps {
  onRequestSort: (event: SelectChangeEvent) => void;
}

const Sort: React.FC<SortProps> = ({ onRequestSort }) => {
  return (
    <Select
      disableUnderline
      defaultValue={"0"}
      IconComponent={() => <DownArrow color={'white'} width="28" height="28" />}
      sx={{
        color: 'white'
      }}
      onChange={onRequestSort}
    >
      <MenuItem disabled value={0}>
        <em>Order by</em>
      </MenuItem>
      <MenuItem value={"asc"}>
        <span style={{marginTop:3}}>
          Name (Asc)
        </span>
      </MenuItem>
      <MenuItem value={"desc"}>
        <span style={{marginTop:3}}>
          Name (Desc)
        </span>
      </MenuItem>
    </Select>
  )
}

export default Sort;
