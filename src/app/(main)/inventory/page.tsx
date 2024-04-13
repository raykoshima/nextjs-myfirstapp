import { getOwnedProduct } from "@/action/product-action";

import { ShowData } from "./_components/showdata";

export default async function Home() {
    



  const productData = await getOwnedProduct()
//   console.log(productData)
//   productData.map(item => {
//     console.log(item.product); // Log the 'product' object of each item
// });
function convertDecimalToNumber(data: any[]) {
    return data.map(item => {
        const { product, ...rest } = item;
        return {
            product: {
                ...product,
                price: Number(product.price) // Convert Decimal price to number
            },
            ...rest
        };
    });
}




  return (
  <>
    <section className="py-20">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8"><center>Your Product</center></h2>
        

        <ShowData data={convertDecimalToNumber(productData)}/>

        
    </div>
  </section>
  
  </>
  );
}
