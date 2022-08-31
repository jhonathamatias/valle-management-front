import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ProductFormInterface, ProductInfoInterface } from '../../interfaces/product.interface';
import InputFileUpload from '../../components/InputFileUpload';

const schema = yup.object({
  file: yup.mixed().required("Selecione uma foto."),
  name: yup.string().required("Digite um nome para o produto."),
  description: yup.string().required("Descreva o produto.").min(10, 'Descreva um pouco mais sobre o produto.'),
}).required();

const ProductInfoForm = React.forwardRef(({
  title,
  listenerSubmit,
  listenerInvalid,
  fillData: product
}: ProductFormInterface, ref: React.Ref<HTMLFormElement>) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductInfoInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ProductInfoInterface> = data => {
    listenerSubmit(data);
  };

  const onInvalid: SubmitErrorHandler<ProductInfoInterface> = (errors) => {
    listenerInvalid(errors);
  };

  const onSelectFile = (file: File) => {
    setValue('file', file);
  }

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
        <InputFileUpload
          onChangeFile={onSelectFile}
          error={Boolean(errors.file?.message)}
          helperText={errors.file?.message}
          defaultValue={product?.file}
        />
        <Grid item xs={12} sm={12}>
          <TextField
            label="Nome do produto"
            fullWidth
            {...register('name')}
            defaultValue={product?.name}
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Descrição do produto"
            fullWidth
            multiline
            {...register('description')}
            defaultValue={product?.description}
            error={Boolean(errors.description?.message)}
            helperText={errors.description?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductInfoForm;