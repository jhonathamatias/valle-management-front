import React, { ChangeEvent, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ProductFormInterface, ProductPriceInterface } from '../../interfaces/product.interface';
import { maskMoney } from '../../tools/maskMoneyBRL';

const schema = yup.object({
  price: yup.number()
    .typeError('Defina um valor, exemplo: 12,99')
    .required("Defina um preço")
    .min(1, 'O preço é mais baixo do que o esperado'),
}).required();

const ProductPriceForm = React.forwardRef(({
  title,
  listenerSubmit,
  listenerInvalid,
  fillData: product
}: ProductFormInterface, ref: React.Ref<HTMLFormElement>) => {
  const inputPriceRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const { handleSubmit, formState: { errors }, setValue } = useForm<ProductPriceInterface>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (inputPriceRef.current) {
      inputPriceRef.current.value = maskMoney(inputPriceRef.current.value);
    }
  }, []);

  const onSubmit: SubmitHandler<ProductPriceInterface> = data => {
    listenerSubmit(data);
  };

  const onInvalid: SubmitErrorHandler<ProductPriceInterface> = (errors) => {
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
      <Grid container>
        <Grid item xs={12} sm={12}>
          <TextField
            inputRef={inputPriceRef}
            label="Preço"
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValue('price', Number(event.target.value.replace(/[^0-9]/g,'')));
              event.target.value = maskMoney(event.target.value);
            }}
            defaultValue={product?.price}
            error={Boolean(errors.price?.message)}
            helperText={errors.price?.message}
          />
        </Grid>
      </Grid >
    </Box>
  );
});

export default ProductPriceForm;