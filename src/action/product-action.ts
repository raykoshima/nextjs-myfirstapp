import { getRawSession } from "@/libs/auth";
import axios from "axios";

export async function getMainproduct() {
    const session = await getRawSession();
    if(!session) {
        return {
            error : "no session"
        }
    }
    // const product = await axios.get(
    //     `${process.env.API_URL}/api/product/page/1`,
    //     {
    //         headers : {
    //             session : `${session}`
    //         }
    //     }
    // )
    // return product.data
    try {
        const apiUrl = `${process.env.API_URL}/api/product/page/1`;
        const response = await axios.get(apiUrl, {
          headers: {
            session: session
          }
        });
    
        // Assuming the response data structure matches { message: { data: [...] } }
        const responseData = response.data;
    
        if (responseData && responseData.message && responseData.message.data) {
          const products = responseData.message.data;
    
          // Now `products` is an array of objects representing product data
        //   console.log('Products:', products);
    
          // You can iterate over `products` and access properties as needed
        //   products.forEach((product: { id: any; name: any; }) => {
            // console.log('Product ID:', product.id);
            // console.log('Product Name:', product.name);
            // Access other properties as needed
        //   });
    
          return responseData.message.data; // Or use `products` further in your application
        } else {
          console.error('Invalid response format');
          return []; // Return empty array or handle error case
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        return []; // Return empty array or handle error case
      }
    
}