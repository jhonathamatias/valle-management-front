import React, { useState, useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ProductFormInterface, ProductAdditionalInfoInterface, OptionInterface } from '../../interfaces/product.interface';
import api from "../../services/api";
import CustomSelect from '../../components/CustomSelect';

const schema = yup.object({
  size: yup.number().min(1, "Selecione um tamanho.").required("Selecione um tamanho."),
  sizeNumber: yup.number().required("Selecione um número."),
  color: yup.number().min(1, "Selecione uma cor.").required("Selecione uma cor."),
}).required();

const ProductAdditionalInfoForm = React.forwardRef(({
  title,
  listenerSubmit,
  listenerInvalid,
  fillData: product
}: ProductFormInterface, ref: React.Ref<HTMLFormElement>) => {
  const [range, setRange] = useState(product?.sizeNumber || 38);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [loadingColors, setLoadingColors] = useState(true);
  const [sizeOptions, setSizeOptions] = useState<OptionInterface[]>([]);
  const [colorOptions, setColorOptions] = useState<OptionInterface[]>([]);

  const getSizes = useCallback(async () => {
    try {
      const { data } = await api.get('/products/sizes');
      const options: OptionInterface[] = [];

      data.product_sizes.forEach((size: { id: any, size: string }) => {
        options.push({
          value: size.id,
          label: size.size
        });
      });

      setSizeOptions(options);
      setLoadingSizes(false);
    } catch (error) {
      setLoadingSizes(false);
    }
  }, []);

  const getColors = useCallback(async () => {
    try {
      const { data } = await api.get('/products/colors');
      const options: OptionInterface[] = [];

      data.product_colors.forEach((color: { id: any, name: string }) => {
        options.push({
          value: color.id,
          label: color.name
        });
      });

      setColorOptions(options);
      setLoadingColors(false);
    } catch (error) {
      setLoadingColors(false);
    }
  }, []);

  useEffect(() => {
    getColors();
    getSizes();
  }, [getColors, getSizes]);

  const handleChangeSize = (value: any) => {
    setValue("size", Number(value))
  };

  const handleChangeColor = (value: any) => {
    setValue('color', Number(value))
  };
  
  const { handleSubmit, formState: { errors }, setValue } = useForm<ProductAdditionalInfoInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      size: product?.size,
      sizeNumber: product?.sizeNumber || 38,
      color: product?.color
    }
  });

  const onSubmit: SubmitHandler<ProductAdditionalInfoInterface> = data => {
    listenerSubmit(data);
  };

  const onInvalid: SubmitErrorHandler<ProductAdditionalInfoInterface> = (errors) => {
    listenerInvalid(errors);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { marginTop: 3 },
      }}
      noValidate
      autoComplete="off"
      ref={ref}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container mt={2}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <CustomSelect
              async
              options={sizeOptions}
              fullWidth
              defaultValue={product?.size}
              label="Tamanho"
              onChangeSelect={(value, label) => {
                handleChangeSize(value);
              }}
              error={Boolean(errors.size?.message)}
              helperText={errors.size?.message}
              loading={loadingSizes}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} mt={2}>
          <Typography variant="caption">Veste até ({range})</Typography>
          <Slider
            aria-label="Temperature"
            defaultValue={product?.sizeNumber}
            valueLabelDisplay="auto"
            step={2}
            marks
            min={38}
            max={52}
            value={range}
            onChange={(event, value) => {
              setRange(Number(value));
              setValue('sizeNumber', Number(value));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} mt={2}>
          <FormControl fullWidth>
            <CustomSelect
              options={colorOptions}
              fullWidth
              placeholder="testesla"
              defaultValue={product?.color}
              label="Cor"
              onChangeSelect={(value) => {
                handleChangeColor(value);
              }}
              error={Boolean(errors.color?.message)}
              helperText={errors.color?.message}
              loading={loadingColors}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductAdditionalInfoForm;