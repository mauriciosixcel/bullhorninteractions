// I-387901: IMPNA Customization - Validate Candidate Address for Prism Integration
// Name: IMPNA Customization - Validate Candidate Address for Prism Integration
// Type: Start/End Date Automation
// Entity/Tracks: Candidate
// Fields: address1,address2,zip,state
// Event: Add Edit Presave

if (API.currentEntity === 'Candidate') {
    console.log('API.currentEntityId ', form)
    const candidate = `/entity/Candidate/${API.currentEntityId}?fields=employeeType`
    let address1 = form.controls['address'].value.address1
    let address2 = form.controls['address'].value.address2
    let employeeType = []
    employeeType.push(form.controls['employeeType'].value)
    let zip = form.controls['address'].value.zip
    let state = form.controls['address'].value.state
    let fullAddress = address1.concat(' ', address2)
    console.log('employeeType ', employeeType)
    return new Promise((resolve) => {
        const validateemployeeType = employeeType.find(element => {
            console.log('element ', element)
            if (['W2'].includes(element)) return element
        })
        console.log('validateEmployeetype ', validateemployeeType)
        if (validateemployeeType !== undefined) {
            const validateAddres = fullAddress.split(' ').find(element => {
                if (['PO', 'PO BOX', 'P.O', 'P.O.', 'PO.BOX', 'P.O.BOX', 'PO.Box', 'P.O.Box'].includes(element)) return element
            })
            if (validateAddres !== undefined) {
                form.errorMessage = 'PO Box address are not allowed within the Candidate permanent Address field',
                    form.isFormValid = false
                resolve(form)
                return
            } else if ((zip !== null && zip.length > 5) || zip === null) {
                form.errorMessage = 'Zip Code must be 5 digits',
                    form.isFormValid = false
                resolve(form)
                return
            } else if (state === "" || state === null) {
                form.errorMessage = 'State is missing or formatted incorrectly. Please select a state from the drop down.',
                    form.isFormValid = false
                resolve(form)
                return
            }
            form.isFormValid = true;
            resolve(form)
            return
        }
        form.isFormValid = true;
        resolve(form)
    })

}