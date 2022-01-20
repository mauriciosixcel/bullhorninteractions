// I-388501: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Name: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Type: Start/End Date Automation
// Entity/Tracks: Location
// Fields: zip
// Event: Add Edit Presave
if (API.currentEntity === 'Location') {
    console.log('form ', form)
    let zip = form.controls['address'].value.zip
    let isWorkSite = form.controls['isWorkSite'].value
    let countryID = form.controls['address'].value.countryID

    return new Promise((resolve) => {
        if (isWorkSite === true && countryID === 1 && zip.length > 5) {
            form.errorMessage = 'ZipCode must be 5 digits',
                form.isFormValid = false
            resolve(form)
            return
        }
        form.isFormValid = true;
        resolve(form)
    })
}