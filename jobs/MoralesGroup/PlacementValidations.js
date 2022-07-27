function validateSSNformat(ssn) {
    const SSNlenght = `${ssn}`.length;
    //console.log("@#SSNlenght", SSNlenght);

    switch (SSNlenght) {
        case 9:
            if (ssn.match(/^[0-9]+$/) != null) {
                return true;
            }
            else {
                return false;
            }
        case 11:
            if (ssn.substring(3, 4) === '-' && ssn.substring(6, 7) === '-') {
                let result = ssn.substring(0, 3) + ssn.substring(4, 6) + ssn.substring(7, 11);
                if (result.match(/^[0-9]+$/) != null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        default:
            return false;
    }
}


if (API.currentEntity === "Placement") {
    console.log('SWE-356 ', form.controls['status'].value);
    const placement = `/entity/Placement/${API.currentEntityId}?fields=id,clientCorporation,employmentType,employeeType,candidate,status`
    return new Promise((resolve) => {
        return API.appBridge.httpGET(placement)
            .then((wcObj) => {
                if (wcObj.data.data.id > 0 &&
                    form.controls['status'].value === 'Approved' &&
                    (wcObj.data.data.employmentType === 'TEMP' || wcObj.data.data.employmentType === 'Contract To Hire') &&
                    form.controls['employeeType'].value === 'W2'
                ) {
                    let requiredPlacementFields =
                        [
                            'location',
                            'billingProfile',
                            'legalBusinessEntity',
                            'workersCompensationRate',
                            'dateBegin',
                            'customText1',
                            'customText57',
                            'customText59',
                            'customText60',
                            'benefitGroup',
                            'payrollSyncStatus',
                        ]
                    let filledPlacementFields = requiredPlacementFields.filter(field => (form.controls[field].value === '' || form.controls[field].value === null))

                    if (filledPlacementFields.length > 0) {
                        const errorPlacementFields = filledPlacementFields.map(field => ` ${form.controls[field].label} `).toString()
                        form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorPlacementFields} ] on  'Placement'  entity `,
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
                                let requiredFields =
                                    [
                                        { name: 'payrollStatus', label: 'Prism EE Status' },
                                        { name: 'gender', label: 'Gender' },
                                        { name: 'ssn', label: 'SSN' },
                                        { name: 'dateOfBirth', label: 'Date of Birth' },
                                        { name: 'federalFilingStatus', label: 'Federal Filing Status' },
                                        { name: 'employeeType', label: 'Employee Type' },
                                        { name: 'totalDependentClaimAmount', label: 'Total Dependent Claim Amount' },
                                        { name: 'taxState', label: 'Tax State' },
                                        { name: 'email', label: 'Email' },
                                    ]
                                let addressRequiredFields =
                                    [
                                        { name: 'address1', label: 'Address' },
                                        { name: 'city', label: 'City' },
                                        { name: 'state', label: 'State' },
                                        { name: 'countryID', label: 'Country' },
                                        { name: 'zip', label: 'Zip' },
                                    ]

                                let filledFields = requiredFields.filter(element => (candidateData[element.name] === '' || candidateData[element.name] === ' ' || candidateData[element.name] === null || candidateData[element.name] === undefined))
                                let filledAddressFields = addressRequiredFields.filter(field => (candidateData.address[field.name] === '' || candidateData.address[field.name] === null || candidateData.address[field.name] === undefined))
                                errorFieldsArray = filledFields.concat(filledAddressFields)

                                if (errorFieldsArray.length > 0) {

                                    form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorFieldsArray.map(el => el.label).toString()} ] on  'Candidate'  entity `,
                                        form.isFormValid = false
                                    resolve(form)
                                    return
                                }


                                if (validateSSNformat(candidateData['ssn']) === false) {

                                    form.errorMessage = `Integration Validation: Please Update the ssn format  on  'Candidate'  entity `,
                                        form.isFormValid = false
                                    resolve(form)
                                    return
                                }
                                console.log("CandidateData['payrollStatus'] ", candidateData['payrollStatus']);

                                if (candidateData['payrollStatus'] !== 'A') {

                                    form.errorMessage = `Integration Validation: The Prism EE Status should be Active on 'Candidate'  entity `,
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