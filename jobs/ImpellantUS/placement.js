if (API.currentEntity === "Placement") {
    const placement = `/entity/Placement/${API.currentEntityId}?fields=id,clientCorporation,employmentType,employeeType,candidate,status`
    return new Promise((resolve) => {
        return API.appBridge.httpGET(placement)
            .then((wcObj) => {
                if (wcObj.data.data.id > 0 &&
                    form.controls['status'].value === 'Approved' &&
                    (wcObj.data.data.employmentType === 'Contract' || wcObj.data.data.employmentType === 'Contract To Hire') &&
                    wcObj.data.data.employeeType === 'W2'
                ) {
                    let requiredPlacementFields =
                        [
                            'payrollEmployeeType', 'positionCode', 'dateBegin', 'payrollSyncStatus', 'customText60', 'payGroup', 'customText59', 'benefitGroup', 'legalBusinessEntity'
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
                    const candidateEntity = `/entity/Candidate/${wcObj.data.data.candidate.id}?fields=id,ssn,dateOfBirth,employeeType,address,federalFilingStatus,totalDependentClaimAmount,twoJobs`
                    return API.appBridge.httpGET(candidateEntity)
                        .then(candObj => {
                            if (candObj.data.data.id > 0) {
                                let candidateData = candObj.data.data
                                let errorFieldsArray = []
                                let requiredFields =
                                    [
                                        { name: 'ssn', label: 'SSN' },
                                        { name: 'dateOfBirth', label: 'Date of Birth' },
                                        { name: 'employeeType', label: 'Employee Type' },
                                        { name: 'federalFilingStatus', label: 'Federal Filing Status' },
                                        { name: 'totalDependentClaimAmount', label: 'Total Dependent Claim Amount' },
                                        { name: 'twoJobs', label: 'Two Jobs' }
                                    ]
                                let addressRequiredFields =
                                    [
                                        { name: 'address1', label: 'Address' },
                                        { name: 'city', label: 'city' },
                                        { name: 'state', label: 'state' },
                                        { name: 'countryID', label: 'country' },
                                    ]                                

                                let filledFields = requiredFields.filter(element => (candidateData[element.name] === '' || candidateData[element.name] === ' ' || candidateData[element.name] === null || candidateData[element.name] === undefined))
                                let filledAddressFields = addressRequiredFields.filter(field => (candidateData.address[field.name] === '' || candidateData.address[field.name] === null || candidateData.address[field.name] === undefined))
                                errorFieldsArray = filledFields.concat(filledAddressFields)

                                if (errorFieldsArray.length > 0) {

                                    form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorFieldsArray.map(el=>el.label).toString()} ] on  'Candidate'  entity `,
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