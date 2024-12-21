import { Selector } from 'testcafe';

fixture`Signup Page Test`
    .page`http://localhost:3000/usercreateaccount`; // Replace with the correct URL

// Test 1
test('User can sign up with valid details', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const passwordInput = Selector('input[placeholder="New password"]');
    const emailInput = Selector('input[placeholder="Email address"]');
    const nameInput = Selector('input[placeholder="Name"]');
    const phoneNumberInput = Selector('input[placeholder="Phone number"]');
    const signUpButton = Selector('button').withText('Sign up');
    
    // Set a native dialog handler to capture the alert message
    await t.setNativeDialogHandler(dialog => dialog.text);

    // Fill in the form with valid data
    await t
        .typeText(usernameInput, 'testuser12345')
        .typeText(passwordInput, 'testuser12345')
        .typeText(emailInput, 'testuser12345@example.com')
        .typeText(nameInput, 'Test User')
        .typeText(phoneNumberInput, '0123456789')
        .click(signUpButton);
    
    // Validate the alert message
    const alertInfo = await t.getNativeDialogHistory();
    await t.expect(alertInfo[0].type).eql('alert', 'Expected an alert dialog.');
    await t.expect(alertInfo[0].text).eql('Signup Successfully', 'Unexpected alert message.');
});

//Test 2:
test('User sees error when submitting an incomplete form', async t => {
    const usernameInput = Selector('input[placeholder="Username"]');
    const signUpButton = Selector('button').withText('Sign up');
    
    // Set a native dialog handler to capture the alert message
    await t.setNativeDialogHandler(dialog => dialog.text);

    // Try to submit with an incomplete form
    await t
        .typeText(usernameInput, 'testuser')
        .click(signUpButton);
    
    // Validate the alert message
    const alertInfo = await t.getNativeDialogHistory();
    await t.expect(alertInfo[0].type).eql('alert', 'Expected an alert dialog.');
    await t.expect(alertInfo[0].text).eql('Your account may be appeared. Error signing up. Please try again.', 'Unexpected alert message.');
});
