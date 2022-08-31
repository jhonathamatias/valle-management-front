import React, { ReactNode, useEffect, useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';

import CircularProgress from '@mui/material/CircularProgress';

interface BasicSelectProps extends SelectProps {
  error?: boolean;
  helperText?: string;
  options: { value: string, label: string }[];
  onChangeSelect?: (value: any, label: string) => void;
  async?: boolean;
  loading?: boolean;
}

export default function CustomSelect({
  label,
  error = false,
  helperText,
  options,
  onChangeSelect,
  defaultValue = '',
  async = true,
  loading = true,
  ...rest
}: BasicSelectProps) {
  const [state, setState] = useState<any>('');

  const random = Math.floor(Math.random() * 99);
  const labelId = `demo-simple-select-helper-label-${random}`;
  const selectId = `demo-simple-select-helper-${random}`;

  useEffect(() => {
    if (defaultValue && loading === false) {
      setState(defaultValue);
    }
  }, [loading, defaultValue]);

  useEffect(() => {
    if (onChangeSelect) {
      const label = document.getElementById(selectId)?.innerText || '';
      onChangeSelect(state, label);
    }
  }, [state, onChangeSelect, selectId]);

  const handleChange = (event: SelectChangeEvent, child: React.ReactNode) => {
    setState(event.target.value);
  }

  const renderOptions = () => {
    const menuItems: ReactNode[] = [];

    if ((async && loading) && options.length === 0) {
      return <MenuItem value=''>
        <CircularProgress size='20px' />
        <Typography variant="body2" ml={1}>
          carregando opções...
        </Typography>
      </MenuItem>;
    }

    if (options.length === 0) {
      return <MenuItem value=''>Nenhuma opção</MenuItem>;
    }

    options.forEach((option, index) => {
      menuItems.push(<MenuItem key={index} value={option.value}>{option.label}</MenuItem>)
    });

    return menuItems;
  };

  const renderLabel = () => {
    return loading ? (
      <Box sx={{
        display: 'flex',
        alignContent: 'center',
        width: '100%'
      }}>
        <CircularProgress size='20px' />
        <Typography variant="body2" ml={1}>
          carregando...
        </Typography>
      </Box>
    ) : label;
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
      <InputLabel id={labelId}>{renderLabel()}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        label={renderLabel()}
        error={error}
        value={!state ? '' : state}
        onChange={handleChange}
        {...rest}
      >
        {renderOptions()}
      </Select>
      {error &&
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      }
    </FormControl>
  )
}