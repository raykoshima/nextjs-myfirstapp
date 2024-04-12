
import { getProductById } from '@/action/product-action'
import { redirect } from 'next/navigation'
import { InfoPage } from './_components/infopage';

interface ProductID {
	params: {
		productId: string;
	};
}

export default async function Page({params} : ProductID) {
  const productData = await getProductById(parseInt(params.productId))
    if(!productData){
      redirect("/auth/sign-in")
    }
    const newDataType = {
      id : productData.id,
      name : productData.name,
      description : productData.description,
      price : Number(productData.price),
      image : productData.image,
      CreateAt : productData.CreateAt,
      UpdateAt : productData.UpdateAt,
      Inventory : productData.Inventory
    }

  const ProductList: React.FC = () => {
    return (
        <>
          <InfoPage data={newDataType} />
        </>
      );
}

return (
  <>
  <ProductList />
  </>
)
}