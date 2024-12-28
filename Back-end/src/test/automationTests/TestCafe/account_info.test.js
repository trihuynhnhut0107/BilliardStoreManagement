import { Selector, ClientFunction } from 'testcafe';

fixture`User Info Page`
    .page`http://localhost:3000/userlogin`; // Replace with your actual application URL

// Helper selectors for login
const usernameInput = Selector('input[placeholder="Username"]');
const passwordInput = Selector('input[placeholder="Password"]');
const loginButton = Selector('button').withText('Log in');

// Helper selectors for the user info page
const accountHeader = Selector('h1').withText('Account Page');
const changeInfoButton = Selector('button.change_info');
const changeInfoModal = Selector('.fixed').withAttribute('class', /bg-black/);

// Helper selectors for the user info button (user logo button)
const userInfoButton =  Selector('button').child('img[alt="account_info"]'); 

// Client function for verifying current page
const getCurrentPath = ClientFunction(() => document.location.pathname);

test('Customer login, double-click on user info button and open Change Info modal', async t => {
    const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');

    // Step 1: Log in
    await t
        .typeText(usernameInput, 'testuser1') // Replace with valid test credentials
        .typeText(passwordInput, 'testuser1')
        .click(loginButton);

    // Step 2: Verify successful redirection to the home page
    await t
        .expect(getCurrentPath())
        .eql('/userhome', 'User is not redirected to the correct home page');

    // Step 3: Verify the dashboard title is visible
    await t
        .expect(dashboardTitle.exists)
        .ok('Dashboard title is not visible after login')
        .debug();

    // Step 4: Click on the user info button to go to the user info page
    await t
        .click(userInfoButton)
        .debug();

    // Step 5: Verify the Account Page elements
    await t
        .expect(accountHeader.exists)
        .ok('Account Page header is not visible');

    // Step 6: Click the "Change Info" button and verify the modal appears
    await t
        .click(changeInfoButton)
        .expect(changeInfoModal.exists)
        .ok('Change Info modal is not visible after clicking the button');
});
