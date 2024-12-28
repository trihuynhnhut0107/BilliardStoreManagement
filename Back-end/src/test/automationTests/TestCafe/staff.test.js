import { Selector } from 'testcafe';

fixture `Staff Management Page Test`
    .page `http://localhost:3001/login`; 

// Test 1: Navigate to Customer Management
// test('Navigate to Staff Management Page', async t => {
//     const usernameInput = Selector('input[placeholder="Username"]');
//     const passwordInput = Selector('input[placeholder="Password"]');
//     const loginButton = Selector('button').withText('Login');
//     const staffManagementLink = Selector('a').withText('Staff Management'); // Adjust selector based on exact text
    
//     // Step 1: Log in
//     await t
//         .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
//         .typeText(passwordInput, 'testadmin1')
//         .click(loginButton);

//     // Step 2: Check redirection (page URL after login)
//     await t
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/admininformation', 'User is not redirected to the correct page');

//     // Step 3: Navigate to Customer Management
//     await t
//         .click(staffManagementLink)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/staffmanagement', 'User is not redirected to Staff Management page');  
// });

// Test 2 : Add staff with validate value
// test('Add staff with validate value', async t => {
//     const usernameInput = Selector('input[placeholder="Username"]');
//     const passwordInput = Selector('input[placeholder="Password"]');
//     const loginButton = Selector('button').withText('Login');
//     const staffManagementLink = Selector('a').withText('Staff Management'); 
//     const addButton = Selector('a').withText('Add staff');

//     // Fill the form 
//     const fullNameInput = Selector('input[placeholder="Full name"]');
//     const phoneNumberInput = Selector('input[placeholder="Phone number"]');
//     const emailInput = Selector('input[placeholder="Email"]');
//     const roleInput = Selector('input[placeholder="Role"]');
//     const usernameFormInput = Selector('input[placeholder="Username"]');
//     const passwordFormInput = Selector('input[placeholder="Password"]');
//     const createButton = Selector('button').withText('Create');
    
//     // Step 1: Log in
//     await t
//         .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
//         .typeText(passwordInput, 'testadmin1')
//         .click(loginButton);

//     // Step 2: Check redirection (page URL after login)
//     await t
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/admininformation', 'User is not redirected to the correct page');

//     // Step 3: Navigate to Customer Management
//     await t
//         .click(staffManagementLink)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/staffmanagement', 'User is not redirected to Staff Management page');  
    
//     // Step 4: Click Add Customer button
//     await t
//         .click(addButton)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/addstaff', 'User is not redirected to Add Staff page');  

//     // Step 5: Fill validate value in the form
//     await t
//         .typeText(fullNameInput, 'Test Staff')
//         .typeText(phoneNumberInput, '0123456789')
//         .typeText(roleInput, 'manager')
//         .typeText(emailInput, 'teststaff9@example.com')
        
//         .typeText(usernameFormInput, 'teststaff9')
//         .typeText(passwordFormInput, 'teststaff9')

//         .click(createButton);

//     // Step 6 : 
//     await t
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/staffmanagement', 'Create unsuccessful');  
// });

// Test 3 : Add staff with invalidate value
// test('Add staff with invalidate value', async t => {
//     const usernameInput = Selector('input[placeholder="Username"]');
//     const passwordInput = Selector('input[placeholder="Password"]');
//     const loginButton = Selector('button').withText('Login');
//     const staffManagementLink = Selector('a').withText('Staff Management'); 
//     const addButton = Selector('a').withText('Add staff');

//     // Fill the form 
//     const fullNameInput = Selector('input[placeholder="Full name"]');
//     const phoneNumberInput = Selector('input[placeholder="Phone number"]');
//     const emailInput = Selector('input[placeholder="Email"]');
//     const roleInput = Selector('input[placeholder="Role"]');
//     const usernameFormInput = Selector('input[placeholder="Username"]');
//     const passwordFormInput = Selector('input[placeholder="Password"]');
//     const createButton = Selector('button').withText('Create');

//     // Toast message
//     const toastMessage = Selector('.Toastify__toast').withText('Email already exists');
    
//     // Step 1: Log in
//     await t
//         .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
//         .typeText(passwordInput, 'testadmin1')
//         .click(loginButton);

//     // Step 2: Check redirection (page URL after login)
//     await t
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/admininformation', 'User is not redirected to the correct page');

//     // Step 3: Navigate to Customer Management
//     await t
//         .click(staffManagementLink)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/staffmanagement', 'User is not redirected to Staff Management page');  
    
//     // Step 4: Click Add Customer button
//     await t
//         .click(addButton)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/addstaff', 'User is not redirected to Add Staff page');  

//     // Step 5: Fill validate value in the form
//     await t
//         .typeText(fullNameInput, 'Test Staff')
//         .typeText(phoneNumberInput, '0123456789')
//         .typeText(roleInput, 'manager')
//         .typeText(emailInput, 'teststaff1@example.com')

//         .typeText(usernameFormInput, 'teststaff1')
//         .typeText(passwordFormInput, 'teststaff1')
//         .click(createButton);

//      // Step 6: Check for "Email already exists" toast message
//      await t.expect(toastMessage.exists).ok('Toast message did not appear');       
// });

// // Test 4 : Add Staff while 1 row is null (Full Name)
// test('Add staff with invalidate value', async t => {
//     const usernameInput = Selector('input[placeholder="Username"]');
//     const passwordInput = Selector('input[placeholder="Password"]');
//     const loginButton = Selector('button').withText('Login');
//     const staffManagementLink = Selector('a').withText('Staff Management'); 
//     const addButton = Selector('a').withText('Add staff');

//     // Fill the form 
//     const phoneNumberInput = Selector('input[placeholder="Phone number"]');
//     const emailInput = Selector('input[placeholder="Email"]');
//     const roleInput = Selector('input[placeholder="Role"]');
//     const usernameFormInput = Selector('input[placeholder="Username"]');
//     const passwordFormInput = Selector('input[placeholder="Password"]');
//     const createButton = Selector('button').withText('Create');

//     // Toast message
//     const toastMessage = Selector('.Toastify__toast').withText('Name is required');
    
//     // Step 1: Log in
//     await t
//         .typeText(usernameInput, 'testadmin1') // Replace with valid test credentials
//         .typeText(passwordInput, 'testadmin1')
//         .click(loginButton);

//     // Step 2: Check redirection (page URL after login)
//     await t
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/admininformation', 'User is not redirected to the correct page');

//     // Step 3: Navigate to Customer Management
//     await t
//         .click(staffManagementLink)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/staffmanagement', 'User is not redirected to Staff Management page');  
    
//     // Step 4: Click Add Customer button
//     await t
//         .click(addButton)
//         .expect(t.eval(() => document.location.pathname))
//         .eql('/addstaff', 'User is not redirected to Add Staff page');  

//     // Step 5: Fill validate value in the form
//     await t
//         .typeText(phoneNumberInput, '0123456789')
//         .typeText(roleInput, 'manager')
//         .typeText(emailInput, 'teststaff1@example.com')

//         .typeText(usernameFormInput, 'teststaff1')
//         .typeText(passwordFormInput, 'teststaff1')
//         .click(createButton);

//      // Step 6: Check for "Email already exists" toast message
//      await t.expect(toastMessage.exists).ok('Toast message did not appear');           
// }); 

// //Test 5 : Edit the Staff  
test('Edit Staff', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Login');
    const staffManagementLink = Selector('a').withText('Staff Management'); 

    // Fill the form 
    const fullNameInput = Selector('input[placeholder="Full name"]');
    const phoneNumberInput = Selector('input[placeholder="Phone number"]');
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
        .click(staffManagementLink)
        .expect(t.eval(() => document.location.pathname))
        .eql('/staffmanagement', 'Staff is not redirected to Customer Management page');  
    
    // Step 3: Locate the row for the specific customer 
    const customerRow = Selector('tr').withText('1'); // Replace with ID

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
        .typeText(fullNameInput, 'Test Staff 11111')

        .click(phoneNumberInput)
        .pressKey('ctrl+a') 
        .pressKey('delete')
        .typeText(phoneNumberInput, '0123456789')

        .click(submitButton)
        .expect(t.eval(() => document.location.pathname))
        .eql('/staffmanagement', 'User is not redirected to the correct page');
}); 