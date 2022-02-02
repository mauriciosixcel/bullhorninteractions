// SWE-75: Populate Job Owner from Account Owner at Company
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On init

console.log('Mauricio - Interaction Company Credit Info Fields and Export Status ', API);
const userTypeName = API._globals.user.userTypeName
const customText12 = API.form.controls.customText12.value
if (userTypeName.includes('Pay Bill Super User') && customText12 === "Exported") {
    API.setValue('customText12', 'Ready to Export')
}

