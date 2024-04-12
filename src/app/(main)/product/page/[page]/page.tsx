
import Image from "next/image";
import { getProductByPage } from "@/action/product-action"

interface Page {
    params : {
        page : string
    }
}
interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    CreateAt: string;
    UpdateAt: string;
    Inventory: { user_id: string }[];
  }
enum action {
    Back = 0,
    Front = 1
}
function pagevaildate(page : number,action : action){
    // console.log(action)
    if(action === 0){
        if(page === 1) return "/"
        return `/product/page/${page - 1}`
    }else{
        return `/product/page/${page + 1}`
    }
}

function pagenavegation(){
    
}

export default async function Page({params} : Page) {
    const product = await getProductByPage(parseInt(params.page))
    return (
        <>
            <section className="py-20">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Product</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {product.map((product: Product) => (
                            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <Image src={product.image} width={400} height={250} className="w-full" alt={""} />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    {product.Inventory.length === 0 ? (
                                        <a href={`/product/${Number(product.id) + 0}`} className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full">View Details</a>
                                    ) : (
                                        <>
                                            <a href={`/product/${Number(product.id) + 0}`} className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full">View Details</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a className="inline-block px-4 py-2 bg-gray-500 text-white font-bold rounded-full cursor-not-allowed">Owned</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    {Number(params.page) === 1 ? (
                    <div className="bg-white rounded-lg overflow-hidden shadow-md pt-[25%]">
                        <div className="p-4">
                            <center>
                                <h3 className="text-xl font-bold mb-2">ไปหน้าที่แล้ว</h3>
                                <a className="inline-block px-4 py-2 bg-gray-500 text-white font-bold rounded-full cursor-not-allowed"> {`<-`} </a>
                            </center>
                        </div>
                    </div>
                    ) : (
                        <div className="bg-white rounded-lg overflow-hidden shadow-md pt-[25%]">
                        <div className="p-4">
                            <center>
                                <h3 className="text-xl font-bold mb-2">ไปหน้าที่แล้ว</h3>
                                <a href={`${pagevaildate(Number(params.page),action.Back)}`} className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full"> {`<-`} </a>
                            </center>
                        </div>
                    </div>
                    )}
                    {product.length === 10 ? (
                        <div className="bg-white rounded-lg overflow-hidden shadow-md pt-[25%]">
                            <div className="p-4">
                                <center>
                                    <h3 className="text-xl font-bold mb-2">ไปหน้าถัดไป</h3>
                                    <a href={`${pagevaildate(Number(params.page),action.Front)}`} className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full"> {`->`} </a>
                                </center>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg overflow-hidden shadow-md pt-[25%]">
                            <div className="p-4">
                                <center>
                                    <h3 className="text-xl font-bold mb-2">ไปหน้าถัดไป</h3>
                                    <a className="inline-block px-4 py-2 bg-gray-500 text-white font-bold rounded-full cursor-not-allowed"> {`->`} </a>
                                </center>
                            </div>
                        </div>
                    )}

                        


                    </div>
                </div>
            </section>
        </>
            );
}