import { Selector } from "testcafe";

fixture`Signup Page Test`.page`http://localhost:3000/usercreateaccount`; // Replace with the correct URL

//Test 1 : Sign up with valid values
test("User can sign up with valid details", async (t) => {
  const usernameInput = Selector('input[placeholder="Username"]');
  const passwordInput = Selector('input[placeholder="New password"]');
  const emailInput = Selector('input[placeholder="Email address"]');
  const nameInput = Selector('input[placeholder="Name"]');
  const phoneNumberInput = Selector('input[placeholder="Phone number"]');
  const signUpButton = Selector("button").withText("Sign up");

  // Set a native dialog handler to capture the alert message
  await t.setNativeDialogHandler((dialog) => dialog.text);

  // Fill in the form with valid data
  await t
    .typeText(usernameInput, "testuser1277")
    .typeText(passwordInput, "testuser1277")
    .typeText(emailInput, "testuser1277@example.com")
    .typeText(nameInput, "Test User 1277")
    .typeText(phoneNumberInput, "0123456789")
    .click(signUpButton);

  // Validate the alert message
  const alertInfo = await t.getNativeDialogHistory();
  await t.expect(alertInfo[0].type).eql("alert", "Expected an alert dialog.");
  await t
    .expect(alertInfo[0].text)
    .eql("Signup Successfully", "Unexpected alert message.");
});

//Test 2: Signup with blank
test("User sees error when submitting an incomplete form", async (t) => {
  const usernameInput = Selector('input[placeholder="Username"]');
  const signUpButton = Selector("button").withText("Sign up");

  // Set a native dialog handler to capture the alert message
  await t.setNativeDialogHandler((dialog) => dialog.text);

  // Try to submit with an incomplete form
  await t.typeText(usernameInput, "testuser").click(signUpButton);

  // Validate the alert message
  const alertInfo = await t.getNativeDialogHistory();
  await t.expect(alertInfo[0].type).eql("alert", "Expected an alert dialog.");
  await t
    .expect(alertInfo[0].text)
    .eql(
      "Your account may be appeared or existed blank in form. Error signing up. Please try again.",
      "Unexpected alert message."
    );
  await t.eval(() => window.location.reload());
});

// Test 3: Sign up with existing email address
test("User sees error when submitting an incomplete form", async (t) => {
  const usernameInput = Selector('input[placeholder="Username"]');
  const passwordInput = Selector('input[placeholder="New password"]');
  const emailInput = Selector('input[placeholder="Email address"]');
  const nameInput = Selector('input[placeholder="Name"]');
  const phoneNumberInput = Selector('input[placeholder="Phone number"]');
  const signUpButton = Selector("button").withText("Sign up");

  // Set a native dialog handler to capture the alert message
  await t.setNativeDialogHandler((dialog) => dialog.text);

  // Try to submit with an incomplete form
  await t
    .typeText(usernameInput, "testuser1277")
    .typeText(passwordInput, "testuser1277")
    .typeText(emailInput, "testuser1277@example.com")
    .typeText(nameInput, "Test User 1277")
    .typeText(phoneNumberInput, "0123456789")
    .click(signUpButton);

  // Validate the alert message
  const alertInfo = await t.getNativeDialogHistory();
  await t.expect(alertInfo[0].type).eql("alert", "Expected an alert dialog.");
  await t
    .expect(alertInfo[0].text)
    .eql(
      "Your account may be appeared or existed blank in form. Error signing up. Please try again.",
      "Unexpected alert message."
    );
});
