// I-406602: Customization: Interaction Company Credit Info Fields and Export Status
// Name: Belflex Customization: Interaction Company Credit Info Fields and Export Status
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On init

console.log('Mauricio - Interaction Company Credit Info Fields and Export Status ', API);
const userTypeName = API._globals.user.userTypeName
if (!userTypeName.includes('Pay Bill Super User')) {
    API.setReadOnly('customInt1', true)
    API.setReadOnly('customText4', true)
    API.setReadOnly('customInt2', true)
    API.setReadOnly('customDate1', true)
    API.setReadOnly('customText12', true)
}

// I-406602: Customization: Interaction Company Credit Info Fields and Export Status
// Name: Belflex Customization: Interaction Company Credit Info Fields and Export Status
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On change

console.log('Mauricio - Interaction Company Credit Info Fields and Export Status ', API);
const userTypeName = API._globals.user.userTypeName
const customText12 = API.form.controls.customText12.value
if ((userTypeName.includes('Pay Bill') ||
        userTypeName.includes('Admin')) &&
    customText12 === "Exported") {
    API.setValue('customText12', 'Ready to Export')
}