async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test GET - Fetch all products
    console.log('📥 Testing GET /api/products');
    const getResponse = await fetch('http://localhost:3000/api/products');
    if (getResponse.ok) {
      const products = await getResponse.json();
      console.log(`✅ Found ${products.length} products in database`);
      console.log('📊 Products:', products.map((p: any) => `${p.name} - ₹${p.sellingPrice}`).join(', '));
    } else {
      console.log('❌ GET request failed');
    }

    // Test POST - Create new product
    console.log('\n📤 Testing POST /api/products');
    const newProduct = {
      name: "Test Product",
      brand: "Test Brand",
      specifications: {
        ram: "8GB",
        storage: "128GB"
      },
      costPrice: 10000,
      sellingPrice: 15000,
      stock: 10,
      imageUrls: ["/uploads/test.png"]
    };

    const postResponse = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (postResponse.ok) {
      const createdProduct = await postResponse.json();
      console.log('✅ Product created successfully:', createdProduct.name);
      console.log('🆔 Product ID:', createdProduct._id);

      // Test PUT - Update product
      console.log('\n📝 Testing PUT /api/products');
      const updateData = {
        ...createdProduct,
        sellingPrice: 16000,
        stock: 15
      };

      const putResponse = await fetch('http://localhost:3000/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (putResponse.ok) {
        const updatedProduct = await putResponse.json();
        console.log('✅ Product updated successfully');
        console.log('💰 New price: ₹' + updatedProduct.sellingPrice);
        console.log('📦 New stock:', updatedProduct.stock);

        // Test DELETE - Delete product
        console.log('\n🗑️ Testing DELETE /api/products');
        const deleteResponse = await fetch(`http://localhost:3000/api/products?id=${createdProduct._id}`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) {
          console.log('✅ Product deleted successfully');
        } else {
          console.log('❌ DELETE request failed');
        }
      } else {
        console.log('❌ PUT request failed');
      }
    } else {
      console.log('❌ POST request failed');
    }

    // Final verification
    console.log('\n🔍 Final verification - GET /api/products');
    const finalResponse = await fetch('http://localhost:3000/api/products');
    if (finalResponse.ok) {
      const finalProducts = await finalResponse.json();
      console.log(`✅ Final count: ${finalProducts.length} products`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }

  console.log('\n🎉 API testing completed!');
}

// Run test
testAPI();
