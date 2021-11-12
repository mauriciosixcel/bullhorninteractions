if (API.currentEntity === "Placement") {
    console.log('hereeee ', API.currentEntityId)
    const placement = `/entity/Placement/${API.currentEntityId}?fields=id,candidate,location,payrollEmployeeType,positionCode,dateBegin,customText60,payGroup,payRate,customText59,billingProfile,benefitGroup,legalBusinessEntity`
    return new Promise((resolve) => {
        API.appBridge.httpGET(placement)
            .then((wcObj) => {
                console.log('wcObj ', wcObj)
                if (wcObj.data.data.id > 0 &&
                    wcObj.data.data.status === 'Placed' &&
                    (wcObj.data.data.employmentType === 'Contract' ||
                        wcObj.data.data.employmentType === 'Contract to Hire')
                ) {
                    console.log('here')
                    // let requiredFields =
                    //     [
                    //         'ssn', 'dateOfBirth', 'employeeType', 'address1', 'city', 'state', 'zip', 'countryID', 'federalFilingStatus', 'federalExemptions', 'twoJobs', 'locationID', 'payrollEmployeeType', 'positionCode', 'dateBegin', 'payrollSyncStatusLookupID', 'customText60', 'payGroup', 'payGroup', 'customText59', 'billingProfileID', 'benefitGroup', 'legalBusinessEntityID'
                    //     ]
                    // let filledFields = requiredFields.filter(field => form.controls[field].value === '')
                    // if (filledFields.length > 0) {
                    //     const errorFields = filledFields.map(field => form.field[field].label).toString()
                    //     form.errorMessage = `Integration Validation: Please Update the following fields [ ${errorFields} ] `,
                    //     form.isFormValid = false
                    //     resolve(form)
                    //     return
                    // }
                    // form.isFormValid = true
                    // resolve(form)
                    // return
                }
            })
    })
}