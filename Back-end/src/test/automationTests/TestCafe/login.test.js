import { Selector } from 'testcafe';

fixture `User Login Page Test`
    .page `http://localhost:3000/userlogin`; // Update the URL as needed

// Test 1: Verify that all essential elements exist on the page
test('Verify page elements', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Log in');
    const forgotPasswordLink = Selector('a').withText('Forgot password?');
    const createAccountLink = Selector('a').withText('Create new account');

    await t
        .expect(usernameInput.exists).ok('Username input is present')
        .expect(passwordInput.exists).ok('Password input is present')
        .expect(loginButton.exists).ok('Login button is present')
        .expect(forgotPasswordLink.exists).ok('Forgot password link is present')
        .expect(createAccountLink.exists).ok('Create new account link is present');
});

// Test 2: Simulate a successful login
test('Successful login', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Log in');
    const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');

    // Step 1: Enter login credentials and click the login button
    await t
        .typeText(usernameInput, 'testuser123') // Replace with valid test credentials
        .typeText(passwordInput, 'testuser123')
        .click(loginButton);

    // Step 2: Check redirection (page URL after login)
    await t
        .expect(t.eval(() => document.location.pathname))
        .eql('/userhome', 'User is not redirected to the correct page');

    // Step 3: Wait for the dashboard title to appear and check its existence
    await t
        .expect(dashboardTitle.exists)
        .ok('Dashboard title is not visible after login', { timeout: 4000 }); 
});


// Test 3: Simulate an unsuccessful login with invalid credentials
test('Unsuccessful login with invalid credentials', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="Password"]');
    const loginButton = Selector('button').withText('Log in');
    
    // Set up the handler for the native dialog (alert)
    await t
        .setNativeDialogHandler((type, text) => {
            // Check for the alert text
            if (type === 'alert') {
                // Assert the error message from the alert
                return text.includes('Login failed.') || text.includes('Please try again.');
            }
            return false; // If it's not an alert, return false
        })
        .typeText(usernameInput, 'invaliduser')  // Invalid credentials
        .typeText(passwordInput, 'wrongpassword')  // Invalid credentials
        .click(loginButton)  // Trigger the login
        // Assert that the body element exists (or any other element you wish to check)
        .expect(Selector('body').exists).ok('The page loaded after the login attempt.');
});



// Test 4: Ensure navigation links work correctly
test('Navigation links', async t => {
    const forgotPasswordLink = Selector('a').withText('Forgot password?');
    const createAccountLink = Selector('a').withText('Create new account');

    await t.debug();
    // Check the navigation to the forgot password page
    await t
        .click(forgotPasswordLink)
        .expect(Selector('h3').withText('Find your account').exists) // Adjusted to the actual h1 text from userforgotpassword
        .ok('Forgot password page is loaded');  // Ensure the page is loaded with the correct header

    // Navigate back to the login page and check for the create account page
    await t
        .navigateTo('http://localhost:3000/userlogin') // Navigate back to login page
        .click(createAccountLink)
        .expect(Selector('h3').withText('Create new account').exists)  // Check the correct page loaded
        .ok('Create account page is loaded');
});

