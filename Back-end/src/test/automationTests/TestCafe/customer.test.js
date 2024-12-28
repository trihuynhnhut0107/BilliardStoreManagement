import { Selector } from 'testcafe';

fixture `Customer Management Page Test`
    .page `http://localhost:3000/login`; 

// Test 1: Navigate to Customer Management
test('Navigate to Customer Management Page', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const customerManagementLink = Selector('a').withText('Customer Management'); // Adjust selector based on exact text
    
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
        .click(customerManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to Customer Management page');  
});

// Test 2 : Add customer with validate value
test('Add customer with validate value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const customerManagementLink = Selector('a').withText('Customer Management'); 
    const addButton = Selector('a').withText('Add user');

    // Fill the form 
    const fullNameInput = Selector('input[placeholder="Full name"]');
    const phoneNumberInput = Selector('input[placeholder="Phone number"]');
    const emailInput = Selector('input[placeholder="Email"]');
    const usernameFormInput = Selector('input[placeholder="Username"]');
    const passwordFormInput = Selector('input[placeholder="Password"]');
    const createButton = Selector('button').withText('Create');
    
    // Step 1: Log in
    await t
        .debug()
        .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
        .typeText(passwordInput, 'testadmin1')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/admininformation', 'User is not redirected to the correct page');

    // Step 3: Navigate to Customer Management
    await t
        .click(customerManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to Customer Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addcustomer', 'User is not redirected to Add Customer page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(fullNameInput, 'Test User 10')
        .typeText(phoneNumberInput, '0123456789')
        .typeText(emailInput, 'testuser10@example.com')
        .typeText(usernameFormInput, 'testuser10')
        .typeText(passwordFormInput, 'testuser10')
        .click(createButton);

    // Step 6 : 
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'Create unsuccessful');  
});

// Test 3 : Add customer with invalidate value
test('Add customer with invalidate value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const customerManagementLink = Selector('a').withText('Customer Management'); 
    const addButton = Selector('a').withText('Add user');

    // Fill the form 
    const fullNameInput = Selector('input[placeholder="Full name"]');
    const phoneNumberInput = Selector('input[placeholder="Phone number"]');
    const emailInput = Selector('input[placeholder="Email"]');
    const usernameFormInput = Selector('input[placeholder="Username"]');
    const passwordFormInput = Selector('input[placeholder="Password"]');
    const createButton = Selector('button').withText('Create');
    // Toast message
    const toastMessage = Selector('.Toastify__toast').withText('Email already exists');
    
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
        .click(customerManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to Customer Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addcustomer', 'User is not redirected to Add Customer page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(fullNameInput, 'Test User')
        .typeText(phoneNumberInput, '0123456789')
        .typeText(emailInput, 'testuser1@example.com')
        .typeText(usernameFormInput, 'testuser1')
        .typeText(passwordFormInput, 'testuser1')
        .click(createButton);

     // Step 6: Check for "Email already exists" toast message
     await t.expect(toastMessage.exists).ok('Toast message did not appear');       
});

// Test 4 : Add customer while Full Name is null
test('Add customer with blank value', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const customerManagementLink = Selector('a').withText('Customer Management'); 
    const addButton = Selector('a').withText('Add user');

    // Fill the form 
    const phoneNumberInput = Selector('input[placeholder="Phone number"]');
    const emailInput = Selector('input[placeholder="Email"]');
    const usernameFormInput = Selector('input[placeholder="Username"]');
    const passwordFormInput = Selector('input[placeholder="Password"]');
    const createButton = Selector('button').withText('Create');
    // Toast message
    const toastMessage = Selector('.Toastify__toast').withText('Name is required');
    
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
        .click(customerManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to Customer Management page');  
    
    // Step 4: Click Add Customer button
    await t
        .click(addButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/addcustomer', 'User is not redirected to Add Customer page');  

    // Step 5: Fill validate value in the form
    await t
        .typeText(phoneNumberInput, '0123456789')
        .typeText(emailInput, 'testuser1@example.com')
        .typeText(usernameFormInput, 'testuser1')
        .typeText(passwordFormInput, 'testuser1')
        .click(createButton);

     // Step 6: Check for "Email already exists" toast message
     await t.expect(toastMessage.exists).ok('Toast message did not appear');       
}); 

//Test 5 : Edit the Customer : 
test('Edit customer', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const customerManagementLink = Selector('a').withText('Customer Management'); 

    // Fill the form 
    const fullNameInput = Selector('input[placeholder="Full name"]');
    const submitButton = Selector('button').withText('Submit');
    
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
        .click(customerManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to Customer Management page');  
    
    // Step 3: Locate the row for the specific customer 
    const customerRow = Selector('tr').withText('2'); // Replace with ID

    // Step 4: Find the Edit button within the customer's row
    const editButton = customerRow.find('td.p-2 > svg').withAttribute('fill', '#000');

    // Step 5: Click the Edit button
    await t
        .expect(editButton.exists).ok('Edit button does not exist for the specified customer')
        .click(editButton);

    // Step 6: Fill the information 
    await t
        .click(fullNameInput)
        .pressKey('ctrl+a') 
        .pressKey('delete')
        .typeText(fullNameInput, 'Test Customer 11111')
        .click(submitButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/customermanagement', 'User is not redirected to the correct page');
}); 