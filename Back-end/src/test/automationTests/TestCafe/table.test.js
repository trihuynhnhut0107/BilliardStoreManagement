import { Selector } from 'testcafe';

fixture `Table Management Page Test`
    .page `http://localhost:3000/login`; 

// Test 1: Navigate to Customer Management
test('Navigate to Table Management Page', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const tableManagementLink = Selector('a').withText('Table Management'); // Adjust selector based on exact text
    
    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'User is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(tableManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'User is not redirected to Table Management page');  
});

// Test 2 : Add table with validate value
test('Add table with validate value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const tableManagementLink = Selector('a').withText('Table Management'); 
    const addButton = Selector('a').withText('Add table');

    // Fill the form 
    const typeInput = Selector('input[placeholder="Table type"]');
    const stickInput = Selector('input[placeholder="Stick quantity"]');
    const ballInput = Selector('input[placeholder="Ball quantity"]');
    const priceInput = Selector('input[placeholder="Price"]');
    const statusInput = Selector('input[placeholder="Status"]');
    const createButton = Selector('button').withText('Create');
    
    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'User is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(tableManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'User is not redirected to Table Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addtable', 'User is not redirected to Add Table page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(typeInput, 'Hole')
        .typeText(stickInput, '4')
        .typeText(ballInput, '15')
        .typeText(priceInput, '60000')
        .typeText(statusInput, 'Available')

        .click(createButton);

    // Step 6 : 
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'Create unsuccessful');  
});

// Test 3 : Add table while 1 row is null (table type)
test('Add table with null value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const tableManagementLink = Selector('a').withText('Table Management'); 
    const addButton = Selector('a').withText('Add table');

    // Fill the form 
    const stickInput = Selector('input[placeholder="Stick quantity"]');
    const ballInput = Selector('input[placeholder="Ball quantity"]');
    const priceInput = Selector('input[placeholder="Price"]');
    const statusInput = Selector('input[placeholder="Status"]');
    const createButton = Selector('button').withText('Create');

    // Toast message
    const toastMessage = Selector('.Toastify__toast').withText('Please fill in all fields');
    
    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'User is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(tableManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'User is not redirected to Table Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addtable', 'User is not redirected to Add Table page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(stickInput, '4')
        .typeText(ballInput, '15')
        .typeText(priceInput, '60000')
        .typeText(statusInput, 'Available')

        .click(createButton);

     // Step 6: Check for "Email already exists" toast message
     await t.expect(toastMessage.exists).ok('Toast message did not appear');           
}); 

// Test 4 : Add table with invalidate value (quantity and price must be positive numbers)
test('Add table with validate value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const tableManagementLink = Selector('a').withText('Table Management'); 
    const addButton = Selector('a').withText('Add table');

    // Fill the form 
    const typeInput = Selector('input[placeholder="Table type"]');
    const stickInput = Selector('input[placeholder="Stick quantity"]');
    const ballInput = Selector('input[placeholder="Ball quantity"]');
    const priceInput = Selector('input[placeholder="Price"]');
    const statusInput = Selector('input[placeholder="Status"]');
    const createButton = Selector('button').withText('Create');

    // Toast message
    const toastMessage = Selector('.Toastify__toast').withText('Quantities and price must be positive numbers');
    
    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'User is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(tableManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'User is not redirected to Table Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addtable', 'User is not redirected to Add Table page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(typeInput, 'Hole')
        .typeText(stickInput, '-4')
        .typeText(ballInput, '-15')
        .typeText(priceInput, '-60000')
        .typeText(statusInput, 'Available')

        .click(createButton);

    // Step 6: Check for "Email already exists" toast message
    await t.expect(toastMessage.exists).ok('Toast message did not appear');       
});

// //Test 5 : Edit the table : 
test('Edit Table', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const tableManagementLink = Selector('a').withText('Table Management'); 

    // Fill the form 
    const typeInput = Selector('input[placeholder="Table type"]');
    const stickInput = Selector('input[placeholder="Stick quantity"]');
    const ballInput = Selector('input[placeholder="Ball quantity"]');
    const priceInput = Selector('input[placeholder="Price"]');
    const dropdown = Selector('#status');
    const optionAvailable = dropdown.find('option[value="available"]');
    const submitButton = Selector('button').withText('Submit');
    
    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'Staff is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(tableManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'Staff is not redirected to Customer Management page');  
    
    // Step 3: Locate the row for the specific customer 
    const customerRow = Selector('tr').withText('1'); // Replace with ID

    // Step 4: Find the Edit button within the customer's row
    const editButton = customerRow.find('td.p-2 > svg').withAttribute('fill', '#000');

    // Step 5: Click the Edit button
    await t
        .expect(editButton.exists).ok('Edit button does not exist for the specified table')
        .click(editButton);

    // Step 6: Fill the information 
    await t
        .typeText(typeInput, 'Hole')
        .typeText(stickInput, '4')
        .typeText(ballInput, '15')
        .typeText(priceInput, '60000')
        .click(dropdown)
        .click(optionAvailable)
        .click(submitButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/tablemanagement', 'User is not redirected to the correct page');
}); 