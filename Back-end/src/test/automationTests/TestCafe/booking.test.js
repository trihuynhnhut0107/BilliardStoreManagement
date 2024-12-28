import { Selector } from 'testcafe';
import { format } from 'date-fns';



fixture`Table Booking Test`
    .page`http://localhost:3000/userlogin`; 

    // Test 1 : [Booking-1]
    // test('Open the modal and verify UI elements are visible.', async t => {
    //     const usernameInput = Selector('input[placeholder="Username"]');
    //     const passwordInput = Selector('input[placeholder="Password"]');
    //     const loginButton = Selector('button').withText('Log in');
    //     const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');
    
    //     const tableCard = Selector('.w-60');
    //     const bookingButton = Selector('button').child('img[alt="Booking"]'); 
    //     const modal = Selector('.booking-modal');
    //     // Step 1: Login
    //     await t
    //         .typeText(usernameInput, 'testuser1')
    //         .typeText(passwordInput, 'testuser1')
    //         .click(loginButton)
    //         .expect(dashboardTitle.exists).ok('Dashboard title is not visible after login');

    //     await t
    //         .expect(tableCard.exists)
    //         .ok('Table card is not visible');
        
    //     await t
    //         .expect(bookingButton.exists)
    //         .ok('Booking button is not visible');

    //     await t
    //         .click(bookingButton);

    //     await t
    //         .expect(modal.exists)
    //         .ok('Booking modal is not open');
    // });

    // Test 2 : [Booking-2]
    // test('Close the modal using the close button.', async t => {
    //     const usernameInput = Selector('input[placeholder="Username"]');
    //     const passwordInput = Selector('input[placeholder="Password"]');
    //     const loginButton = Selector('button').withText('Log in');
    //     const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');
    
    //     const tableCard = Selector('.w-60');
    //     const bookingButton = Selector('button').child('img[alt="Booking"]'); 
    //     const modal = Selector('.booking-modal');
    //     const closeModal = modal.find('.close');
    //     // Step 1: Login
    //     await t
    //         .typeText(usernameInput, 'testuser1')
    //         .typeText(passwordInput, 'testuser1')
    //         .click(loginButton)
    //         .expect(dashboardTitle.exists).ok('Dashboard title is not visible after login');

    //     await t
    //         .expect(tableCard.exists)
    //         .ok('Table card is not visible');
        
    //     await t
    //         .expect(bookingButton.exists)
    //         .ok('Booking button is not visible');

    //     await t
    //         .click(bookingButton);

    //     await t
    //         .expect(modal.exists)
    //         .ok('Booking modal is not open');
        
    //     await t
    //         .click(closeModal)
    //         .expect(dashboardTitle.exists).ok('Dashboard title is not visible after login');             
    // });

    // Test 3 : [Booking-4]
    test('Close the modal using the close button.', async t => {
        const usernameInput = Selector('input[placeholder="Username"]');
        const passwordInput = Selector('input[placeholder="Password"]');
        const loginButton = Selector('button').withText('Log in');
        const dashboardTitle = Selector('h1').withText('Your Ultimate Billiards Table Booking Hub');
    
        const tableCard = Selector('.w-60');
        const bookingButton = Selector('button').child('img[alt="Booking"]'); 

        const modal = Selector('.booking-modal');
        const dateInput = modal.find('input[type="date"]');
        const bookingButtonInModal = modal.find('button').withText('Booking');
        // Step 1: Login
        await t
            .typeText(usernameInput, 'testuser1')
            .typeText(passwordInput, 'testuser1')
            .click(loginButton)
            .expect(dashboardTitle.exists).ok('Dashboard title is not visible after login');

        await t
            .expect(tableCard.exists)
            .ok('Table card is not visible');
        
        await t
            .expect(bookingButton.exists)
            .ok('Booking button is not visible');

        await t
            .click(bookingButton);

        await t
            .expect(modal.exists)
            .ok('Booking modal is not open');
        // Fill Date
        const formattedDateForInput = format(new Date('2024-29-12'), 'yyyy-dd-MM');
        const toastMessage = Selector('.Toastify__toast').withText('Invalid time value');
        await t
            .click(dateInput) // Click on the input to focus on it
            .pressKey('ctrl+a') // Select all text in the input
            .pressKey('delete') // Delete the selected text
            .typeText(dateInput, formattedDateForInput) // Set the new date
            .expect(dateInput.value).eql(formattedDateForInput, 'Date input is filled correctly')
            .click(bookingButtonInModal) 
            .expect(toastMessage.exists).ok('Toast message did not appear');              
    });
