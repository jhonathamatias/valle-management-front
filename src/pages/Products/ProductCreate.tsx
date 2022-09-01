import { ForwardRefExoticComponent, useCallback, useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import ProductInfoForm from './ProductInfoForm';
import ProductAdditionalInfoForm from './ProductAdditionalInfoForm';
import ProductPriceForm from './ProductPriceForm';
import { ProductFormInterface, ProductPayloadInterface, ProductStateInterface } from '../../interfaces/product.interface';
import api from '../../services/api';
import { imageToBase64 } from '../../tools/imageConvert';

type StepperType = {
  label: string;
  component: ForwardRefExoticComponent<ProductFormInterface & React.RefAttributes<HTMLFormElement>>
};

const steps: StepperType[] = [
  { label: 'Informações do produto', component: ProductInfoForm },
  { label: 'Informações adicionais', component: ProductAdditionalInfoForm },
  { label: 'Precificação', component: ProductPriceForm },
];

function Feedback({
  handleReset,
  productState
}: {
  handleReset: Function,
  productState: ProductStateInterface,
}) {
  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <ShoppingBagIcon
        sx={{
          marginBottom: 2,
          fontSize: 70,
        }}
        color="disabled"
      />
      <Grid
        item
        xs={4}
        component="div"
        title={productState.file.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1
        }}
      >
        <CheckCircleIcon sx={{ color: '#48bb78' }} />
        <Typography variant='subtitle1' textAlign="center" ml={1} sx={{ fontWeight: 'medium' }}>
          Produto cadastrado com sucesso!
        </Typography>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          size='small'
          variant="outlined"
          onClick={() => handleReset()}
        >
          cadastrar outro produto
        </Button>
        <Button
          size='small'
          sx={{ mr: 1 }}
          color="inherit"
          href='/products'
        >
          Lista de produtos
        </Button>
      </Box>
    </Box >
  );
}

export default function ProductCreate() {
  const formRef = useRef<HTMLFormElement>({} as HTMLFormElement);
  const [activeStep, setActiveStep] = useState(0);
  const [formValidated, setFormValidated] = useState(false);
  const [product, setProduct] = useState<ProductStateInterface>({} as ProductStateInterface);
  const [productCreated, setProductCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
    setFormValidated(false);
  }, [activeStep]);

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
    setFormValidated(false);
  }, [activeStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setFormValidated(false);
    setProductCreated(false);
    setProduct({} as ProductStateInterface);
  }, []);

  const isLastStep = useCallback(() => {
    return activeStep === steps.length - 1;
  }, [activeStep]);

  const isFeedbackStep = useCallback(() => {
    return activeStep === steps.length;
  }, [activeStep]);

  useEffect(() => {
    if (!isLastStep() && formValidated) {
      handleNext();
    }
  }, [formValidated, handleNext]);

  function getStepContent(step: number) {
    if (isFeedbackStep() && productCreated) {
      return <Feedback handleReset={handleReset} productState={product} />;
    }

    const { label, component: Component } = steps[step];

    return <Component
      fillData={product}
      ref={formRef}
      title={label}
      listenerSubmit={data => {
        if (isLastStep()) {
          createProduct({ ...product, ...data });
        }
        setProduct({ ...product, ...data });
        setFormValidated(true);
      }}
      listenerInvalid={() => {
        setFormValidated(false);
      }}
    />
  };

  function stepsControlButtons() {
    return <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {activeStep !== 0 && (
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Voltar
        </Button>
      )}

      {isLastStep() ? (
        <LoadingButton
          onClick={handleFormSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </LoadingButton>
      ) : (
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1 }}
        >
          Próximo
        </Button>
      )}
    </Box>;
  }

  const handleFormSubmit = () => {
    if (formRef.current) {
      // console.log(formRef.current.dispatchEvent(new Event('submit')));
      formRef.current.requestSubmit();
    }
  };

  const makePayload = async (productData: ProductStateInterface): Promise<ProductPayloadInterface> => {
    const {
      name,
      description,
      file: image,
      size: product_size_id,
      color: product_color_id,
      price,
      sizeNumber
    } = productData;

    try {
      const imageBase64 = await imageToBase64(image);

      return {
        name,
        description,
        image: imageBase64,
        product_size_id,
        product_color_id,
        price,
        size_number: sizeNumber
      };
    } catch (err) {
      throw 'Convert image to base64';
    }
  }

  const createProduct = async (productData: ProductStateInterface) => {
    setLoading(true);

    try {
      const payload = await makePayload(productData);
      await api.post('/products', payload);

      setLoading(false);
      setProductCreated(true);
      handleNext();
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: { xs: 8, md: 4 }, p: { xs: 0 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: { xs: 4 }, borderRadius: { xs: 0 } }}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {getStepContent(activeStep)}
          {!isFeedbackStep() && stepsControlButtons()}
        </>
      </Paper>
      <Fab
        aria-label="Add"
        color='primary'
        sx={{
          position: 'absolute',
          bottom: 64,
          right: { md: 16 },
          left: { xs: 16, md: 'auto' }
        }}
        onClick={() => navigate('/products')}
      >
        <ShoppingBagIcon />
      </Fab>
    </Container>
  );
}