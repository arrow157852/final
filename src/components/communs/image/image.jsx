import { AdvancedImage } from '@cloudinary/react';
import cld from '../../services/cloudinary'; // Importe a instância configurada

const Image = () => {
  // Use a instância 'cld' para criar sua imagem
  const myImage = cld.image('public_id_da_sua_imagem');

  // Aplique transformações se desejar
  myImage.format('auto').quality('auto');

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default Image;