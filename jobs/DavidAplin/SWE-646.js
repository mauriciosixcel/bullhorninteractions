function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
if (API.currentEntity === "Placement") {
    console.log('SWE-356 ', API, form);
    const placement = `/entity/Placement/${API.currentEntityId}?fields=id,clientCorporation,employmentType,employeeType,candidate,status,onboardingStatus`
    return new Promise((resolve) => {
        return API.appBridge.httpGET(placement)
            .then((wcObj) => {
                if (wcObj.data.data.id > 0 &&
                    form.controls['status'].value === 'Approved' &&
                    (wcObj.data.data.employmentType === 'Contract')
                ) {
                    let requiredPlacementFields =
                        [
                            'location',
                            'billingProfile',
                            'workersCompensationRate',
                            'dateBegin',
                            'timeAndExpense.timeAndExpenseSource',
                        ]
                    let filledPlacementFields = requiredPlacementFields.filter(field => (form.controls[field].value === '' || form.controls[field].value === null))

                    if (filledPlacementFields.length > 0) {
                        const errorPlacementFields = filledPlacementFields.map(field => ` ${form.controls[field].label} `).toString()
                        form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorPlacementFields} ] on  'Placement'  entity `,
                            form.isFormValid = false
                        resolve(form)
                        return
                    }

                    if (wcObj.data.data.onboardingStatus !== 'Complete') {
                        form.errorMessage = `Placement Onboarding Validation:  Please complete Onboarding prior to moving the Placement to Approved.`,
                            form.isFormValid = false
                        resolve(form)
                        return
                    }
                    //Query to candidate entity
                    const candidateEntity = `/entity/Candidate/${wcObj.data.data.candidate.id}?fields=id,ssn,dateOfBirth,employeeType,address,federalFilingStatus,totalDependentClaimAmount,taxState,email,gender,payrollStatus`
                    return API.appBridge.httpGET(candidateEntity)
                        .then(candObj => {
                            if (candObj.data.data.id > 0) {
                                let candidateData = candObj.data.data
                                let errorFieldsArray = []
                                let filledFields  = []
                                if (form.controls['employeeType'].value === 'W2' ||
                                    form.controls['employeeType'].value === 'T4') {
                                    let requiredFields =
                                        [
                                            { name: 'ssn', label: 'SIN/SSN' },
                                            { name: 'dateOfBirth', label: 'Date of Birth' },
                                            { name: 'taxState', label: 'Tax State' },
                                        ]

                                        filledFields = requiredFields.filter(element => (candidateData[element.name] === '' || candidateData[element.name] === ' ' || candidateData[element.name] === null || candidateData[element.name] === undefined))
                                }

                                let addressRequiredFields =
                                    [
                                        { name: 'address1', label: 'Address' },
                                        { name: 'city', label: 'City' },
                                        { name: 'state', label: 'Providence' },
                                        { name: 'zip', label: 'Postal Code' },
                                        { name: 'countryID', label: 'Country' },
                                    ]
                                
                                let filledAddressFields = addressRequiredFields.filter(field => (candidateData.address[field.name] === '' || candidateData.address[field.name] === null || candidateData.address[field.name] === undefined))

                                errorFieldsArray = filledFields.length > 0 ? filledFields.concat(filledAddressFields) : filledAddressFields

                                if (errorFieldsArray.length > 0) {

                                    form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorFieldsArray.map(el => el.label).toString()} ] on  'Candidate'  entity `,
                                        form.isFormValid = false
                                    resolve(form)
                                    return
                                }


                                if (validateEmail(candidateData['email']) === false) {

                                    form.errorMessage = `Integration Validation: Please Update the Email format  on  'Candidate'  entity `,
                                        form.isFormValid = false
                                    resolve(form)
                                    return
                                }
                                
                                form.isFormValid = true
                                resolve(form)
                                return
                            }
                            form.errorMessage = `No Candidate data found`,
                                form.isFormValid = false
                            resolve(form)
                            return
                        })
                    return
                }
                form.isFormValid = true
                resolve(form)
                return
            })
    })
}   