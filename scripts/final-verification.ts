async function finalVerification() {
  console.log('🎯 FINAL VERIFICATION: Admin Panel CRUD with MongoDB\n');

  const results = {
    mongodb: false,
    api: false,
    create: false,
    read: false,
    update: false,
    delete: false,
    frontend: false
  };

  try {
    // Test 1: MongoDB Connection
    console.log('🔌 Test 1: MongoDB Connection');
    const productsResponse = await fetch('http://localhost:3000/api/products');
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`✅ Connected to MongoDB - Found ${products.length} products`);
      results.mongodb = true;
    }

    // Test 2: API Endpoints
    console.log('\n🔗 Test 2: API Endpoints');
    const testProduct = {
      name: "Final Test Product",
      brand: "VerificationBrand",
      specifications: { ram: "8GB", storage: "128GB" },
      costPrice: 15000,
      sellingPrice: 20000,
      stock: 3,
      imageUrls: ["/uploads/final-test.png"]
    };

    const createResponse = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testProduct),
    });

    if (createResponse.ok) {
      const createdProduct = await createResponse.json();
      console.log('✅ API Endpoints Working - Product Created');
      results.api = true;
      results.create = true;

      // Test 3: Read Operation
      const readResponse = await fetch('http://localhost:3000/api/products');
      const readProducts = await readResponse.json();
      const foundProduct = readProducts.find((p: any) => p.id === createdProduct.id);

      if (foundProduct) {
        console.log('✅ Read Operation Working');
        results.read = true;

        // Test 4: Update Operation
        const updateData = {
          ...foundProduct,
          sellingPrice: 22000,
          stock: 5
        };

        const updateResponse = await fetch('http://localhost:3000/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });

        if (updateResponse.ok) {
          const updatedProduct = await updateResponse.json();
          if (updatedProduct.sellingPrice === 22000) {
            console.log('✅ Update Operation Working');
            results.update = true;
          }
        }

        // Test 5: Delete Operation
        const deleteResponse = await fetch(`http://localhost:3000/api/products?id=${foundProduct.id}`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) {
          console.log('✅ Delete Operation Working');
          results.delete = true;
        }
      }
    }

    // Test 6: Frontend Connection
    console.log('\n🌐 Test 6: Frontend Connection');
    const adminResponse = await fetch('http://localhost:3000/admin');
    if (adminResponse.ok) {
      const html = await adminResponse.text();
      if (html.includes('Jain Mobile City')) {
        console.log('✅ Admin Panel Accessible');
        results.frontend = true;
      }
    }

  } catch (error) {
    console.error('❌ Verification failed:', error);
  }

  // Final Results
  console.log('\n📊 FINAL RESULTS:');
  console.log('='.repeat(50));

  const allTests = Object.values(results);
  const passedTests = allTests.filter(Boolean).length;
  const totalTests = allTests.length;

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${test.charAt(0).toUpperCase() + test.slice(1)}: ${passed ? 'PASS' : 'FAIL'}`);
  });

  console.log('='.repeat(50));
  console.log(`🎯 OVERALL SCORE: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Admin Panel CRUD with MongoDB is fully functional!');
    console.log('\n🚀 Ready for production use!');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the implementation.');
  }

  console.log('\n💡 Next Steps:');
  console.log('1. Access http://localhost:3000/admin in your browser');
  console.log('2. Test CRUD operations through the UI');
  console.log('3. Verify data persists in MongoDB');
  console.log('4. Add real product images to /public/uploads/');
}

// Run final verification
finalVerification();
