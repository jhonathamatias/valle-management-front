export interface ProductDefaultInterface {}

export interface ProductFormInterface {
  title: string;
  listenerSubmit: (data: ProductDefaultInterface) => void;
  listenerInvalid: (error: any) => void;
  fillData?: ProductStateInterface;
}

export interface ProductInfoInterface extends ProductDefaultInterface{
  file: File;
  name: string;
  description: string;
}

export interface ProductAdditionalInfoInterface {
  size: number;
  sizeNumber: number;
  color: number;
}

export interface ProductPriceInterface {
  price: number;
}

export interface OptionInterface {
  label: string;
  value: any
}

export interface ProductStateInterface extends 
ProductInfoInterface, 
ProductAdditionalInfoInterface, 
ProductPriceInterface {}

export interface ProductPayloadInterface {
  name: string;
  description: string;
  image: string;
  product_color_id: number;
  product_size_id: number;
  price: number;
  size_number: number;
}

export interface ProductDetailInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  updated_at: string;
  color: {
    name: string;
    code: string;
  };
  size: {
    name: string;
    dress_up: number;
  }
}