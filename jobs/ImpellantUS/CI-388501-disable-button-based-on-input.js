// I-388501: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Name: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Type: Start/End Date Automation
// Entity/Tracks: Location
// Fields: zip
// Event: Add Edit Presave
if (API.currentEntity === 'Location') {
    let zip = form.controls['address'].value.zip
    let isWorkSite = form.controls['isWorkSite'].value

    return new Promise((resolve) => {
        if (isWorkSite === true && zip.length > 5) {
            form.errorMessage = 'ZipCode must be 5 digits',
                form.isFormValid = false
            resolve(form)
            return
        }
        form.isFormValid = true;
        resolve(form)
    })
}