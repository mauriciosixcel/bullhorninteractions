// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On init

console.log('SWE-128:  Job Opening Automation ', API);
const customInt4 = API.form.controls['customInt4'].value
const customInt2 = API.form.controls['customInt2'].value
if (customInt2 === null)
    API.setValue('customInt2', customInt4)


// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On change

console.log('SWE-128:  Job Opening Automation ', API);
const customInt4 = API.form.controls['customInt4'].value
const customInt2 = API.form.controls['customInt2'].value
if (customInt2 > customInt4) {
    API.hide('customText8');
    API.markAsInvalid(API.getActiveKey(), '# Committed cannot exceed Total Client Need');
} else {
    API.show('customText8');
    API.setRequired('customText8', true);
}
