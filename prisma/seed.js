// Sample data for the Product model
const products = [
    { name: 'Laptop', description: 'High-performance laptop', price: 1200 },
    { name: 'Smartphone', description: 'Latest smartphone model', price: 800 },
    { name: 'Headphones', description: 'Wireless noise-canceling headphones', price: 250 },
    { name: 'Tablet', description: 'Large touchscreen tablet', price: 500 },
    { name: 'Camera', description: 'Professional DSLR camera', price: 1500 },
    { name: 'Smartwatch', description: 'Fitness tracking smartwatch', price: 300 },
    // Add more sample products here as needed
  ];
  
  async function main() {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
  
    try {
      // Loop to create 30 products with sample data
      for (let i = 0; i < 30; i++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        await prisma.product.create({
          data: {
            name: randomProduct.name,
            description: randomProduct.description,
            price: randomProduct.price,
          },
        });
      }
  
      console.log('30 products created successfully!');
    } catch (error) {
      console.error('Error creating products:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();
  