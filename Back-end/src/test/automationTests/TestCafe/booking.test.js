import { Selector } from 'testcafe';
import { format } from 'date-fns';


// Test 1 : Open the modal, must be in userhome
// fixture`Table Booking Test`
//     .page`http://localhost:3000/userhome`; // Replace with your actual application URL

// const tableCard = Selector('.w-60');  // Ensure this matches the correct table card's class
// const bookingButton = Selector('button').child('img[alt="Booking"]');  

// test('Customer clicks on booking button', async t => {
//     const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');

//     // Step 1: Wait for the page to load and ensure the dashboard is visible
//     await t
//         .expect(dashboardTitle.exists)
//         .ok('Dashboard title is not visible after login', { timeout: 4000 });

//     // Step 2: Wait for the table card and booking button to be visible
//     await t
//         .expect(tableCard.exists)
//         .ok('Table card is not visible');
    
//     // Step 3: Wait for the button to be visible before clicking
//     await t
//         .expect(bookingButton.exists)
//         .ok('Booking button is not visible');

//     // Step 4: Click on the booking button
//     await t
//         .click(bookingButton);

//     // Step 5: Verify the modal or booking form is open
//     const modal = Selector('.booking-modal');  // Adjust if you have a class for the modal
//     await t
//         .expect(modal.exists)
//         .ok('Booking modal is not open');
// });


// Test 2 : Booking function : customer needs to login into system to get customerID
fixture`Table Booking Test`
    .page`http://localhost:3000/userlogin`; 

    test('Customer clicks on booking button', async t => {
        const usernameInput = Selector('input[placeholder="Username"]');
        const passwordInput = Selector('input[placeholder="Password"]');
        const loginButton = Selector('button').withText('Log in');
        const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');
    
        const tableCard = Selector('.w-60');
        const bookingButton = Selector('button').child('img[alt="Booking"]'); 
        const modal = Selector('.booking-modal');
        const dateInput = modal.find('input[type="date"]');
        const startTimeInput = modal.find('input[type="time"]').nth(0);
        const endTimeInput = modal.find('input[type="time"]').nth(1);
        const billiardSticksDecrementButton = modal.find('button').withText('-');
        const billiardSticksIncrementButton = modal.find('button').withText('+');
        const bookingButtonInModal = modal.find('button').withText('Booking');
    
        // Step 1: Login
        await t
            .typeText(usernameInput, 'testuser12345')
            .typeText(passwordInput, 'testuser12345')
            .click(loginButton)
            .expect(dashboardTitle.exists).ok('Dashboard title is not visible after login');
    
        // Step 2: Open Booking Modal
        await t
            .expect(dashboardTitle.exists)
            .ok('Dashboard title is not visible after login', { timeout: 4000 });

        // Step 2: Wait for the table card and booking button to be visible
        await t
            .expect(tableCard.exists)
            .ok('Table card is not visible');
        
        // Step 3: Wait for the button to be visible before clicking
        await t
            .expect(bookingButton.exists)
            .ok('Booking button is not visible');

        // Step 4: Click on the booking button
        await t
            .click(bookingButton);

        // Step 5: Verify the modal or booking form is open
        await t
            .expect(modal.exists)
            .ok('Booking modal is not open');
    
        // Step 6: Fill Booking Details
        const formattedDateForInput = format(new Date('2024-12-21'), 'yyyy-MM-dd');
        await t
            .click(dateInput) // Click on the input to focus on it
            .pressKey('ctrl+a') // Select all text in the input
            .pressKey('delete') // Delete the selected text
            .typeText(dateInput, formattedDateForInput) // Set the new date
            .expect(dateInput.value).eql(formattedDateForInput, 'Date input is filled correctly');

        await t
            .click(startTimeInput) // Click to focus on the start time input
            .pressKey('ctrl+a') // Select all text
            .pressKey('delete') // Delete the selected text
            .typeText(startTimeInput, '14:00') // Set start time
            .expect(startTimeInput.value).eql('14:00', 'Start time input is filled correctly');

        await t
            .click(endTimeInput) // Click to focus on the end time input
            .pressKey('ctrl+a') // Select all text
            .pressKey('delete') // Delete the selected text
            .typeText(endTimeInput, '16:00') // Set end time
            .expect(endTimeInput.value).eql('16:00', 'End time input is filled correctly');

        await t
            .click(billiardSticksDecrementButton)
            .click(billiardSticksIncrementButton)
            .expect(modal.find('span').withText('2').exists).ok('Billiard sticks count is incorrect');

        // Step 7: Submit Booking
        await t
            .click(bookingButtonInModal)
            .expect(Selector('h1').withText('Checkout').exists).ok('Booking was not successful or checkout page did not load');
    });
