// 85- Assignment Validation - Onboarding
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On init


if (API.currentEntity === "Placement") {
    console.log('Mauricio - Assignment Validation - Onboarding ', API);
    const userTypeName = API._globals.user.userTypeName
    const isAdmin = (userTypeName.includes('Franchise Support') || userTypeName.includes('Admin')) ? true : false
    const dateEnd = new Date(API.form.controls.dateEnd.value).getTime()
    const dateBegin = new Date(API.form.controls.dateBegin.value).getTime()
    const status = API.form.controls.status.value

    if (status === 'Pending') {
        console.log('isPending');
        //timated End Date (placement.dateEnd)
        if (dateEnd < dateBegin) {
            console.log('isLessThan');
            API.markAsInvalid('dateEnd', 'End Date cannot be less than Start Date');
        }
    }
}

if (API.currentEntity === "Placement") {
    const dateBegin = new Date(form.controls.dateBegin.value).getTime()
    return new Promise((resolve) => {
        //query to CandidateCertificationRequirement and all records should be "active" status
        const PlacementCertification = `/query/PlacementCertification?fields=id,candidateCertification(id,status,name,isDeleted)&where=placement.id=${API.currentEntityId}`
        return API.appBridge.httpGET(PlacementCertification)
            .then((wcObj) => {
                console.log('PlacementCertification query ', wcObj);
                if (wcObj.data.count > 0) {
                    const certifications = []
                    wcObj.data.data.forEach(element => {
                        if (element.candidateCertificationStatus !== 'Active' && element.candidateCertification) {
                            certifications.push(element.candidateCertification);
                        }
                    });
                    if (certifications.length > 0) {
                        form.errorMessage = `Onboarding Validation: The following fields [ ${certifications.map(el => el.name).toString()} ] must be Active before Assignment is approved. `,
                            form.isFormValid = false
                        resolve(form)
                    } else {
                        const rateCardQuery = `/query/PlacementRateCard?where=placement=${API.currentEntityId}&fields=id,effectiveDate&orderBy=effectiveDate`
                        return API.appBridge.httpGET(rateCardQuery)
                            .then((rcObj) => {
                                if (rcObj.data.count > 0) {
                                    console.log('ssssdsddsd ', rcObj);
                                    rcObj.data.data.forEach(element => {
                                        console.log('new Date(element.effectiveDate).getTime() ', new Date(element.effectiveDate).getTime());
                                        console.log('dateBegin ', dateBegin);
                                        if (new Date(element.effectiveDate).getTime() > dateBegin) {
                                            form.errorMessage = `PlacementRateCard is required. `,
                                                form.isFormValid = false
                                            resolve(form)
                                        } else {
                                            async function getNumberofPlacement(jobId) {
                                                console.log('holaaa ', jobId);
                                                const dataa = await API.appBridge.httpGET(`entity/JobOrder/${jobId}?fields=id,placements`)
                                                return dataa.data.data.id > 0 ? dataa.data.data : null;
                                            }

                                            const candidateQuery = `/entity/Placement/${API.currentEntityId}?fields=id,candidate(status,customText20,ssn,dateOfBirth),clientCorporation(status),jobOrder(status,customInt2)`
                                            return API.appBridge.httpGET(candidateQuery)
                                                .then((candObj) => {
                                                    console.log('candidate ', candObj.data.data);

                                                    if (candObj.data.data.id > 0) {
                                                        console.log(candObj.data.data.candidate.customText20, ' candidate ', (candObj.data.data.candidate.customText20 === 'Available' || candObj.data.data.candidate.customText20 === 'Assigned'));
                                                        if (candObj.data.data.candidate.status !== 'Associate' &&
                                                            !(candObj.data.data.candidate.customText20 === 'Available' ||
                                                                candObj.data.data.candidate.customText20 === 'Assigned')) {
                                                            form.errorMessage = 'Candidate status is not valid for Assignment',
                                                                form.isFormValid = false
                                                            resolve(form)
                                                        } else if (candObj.data.data.clientCorporation.status !== 'Active Account') {
                                                            form.errorMessage = 'clientCorporation status is not valid for Assignment',
                                                                form.isFormValid = false
                                                            resolve(form)
                                                        } else if (candObj.data.data.candidate.ssn === '') {
                                                            form.errorMessage = 'Candidate SSN cannot be blank',
                                                                form.isFormValid = false
                                                            resolve(form)
                                                        } else if (candObj.data.data.candidate.dateOfBirth === '') {
                                                            form.errorMessage = 'Candidate dateOfBirth cannot be blank',
                                                                form.isFormValid = false
                                                            resolve(form)
                                                        } else if (candObj.data.data.jobOrder.status === 'Draft' ||
                                                            candObj.data.data.jobOrder.status === 'Placed' ||
                                                            candObj.data.data.jobOrder.status === 'Cancelled' ||
                                                            candObj.data.data.jobOrder.status === 'Template' ||
                                                            candObj.data.data.jobOrder.status === 'Recruiting Job Order' ||
                                                            candObj.data.data.jobOrder.status === 'Archive') {
                                                            form.errorMessage = `jobOrder Status is not valid for Assignment: ${candObj.data.data.jobOrder.status}`,
                                                                form.isFormValid = false
                                                            resolve(form)
                                                        } else if (!candObj.data.data.jobOrder.customInt2) {
                                                            // && Number(candObj.data.data.jobOrder.placementNumber) * 1.5 > candObj.data.data.jobOrder.customInt2
                                                            const NumberOfPlacements = getNumberofPlacement(candObj.data.data.jobOrder.id)
                                                            NumberOfPlacements.then(val => {
                                                                if (val.placements.total * 1.5 > candObj.data.data.jobOrder.customInt2) {
                                                                    form.errorMessage = `This assignment exceeds the Overfill threshold of 50% over # Committed`,
                                                                        form.isFormValid = false
                                                                    resolve(form)
                                                                } else
                                                                    resolve([])
                                                            })
                                                        } else
                                                            resolve([])
                                                    }
                                                })
                                                .catch(err => console.log('Error while retrieving Candidate record'))
                                        }
                                    });
                                }
                            })
                            .catch(err => console.log('Error while retrieving PlacementRateCard records'))
                    }
                } else {
                    form.errorMessage = ` No PlacementCertification records found`,
                        form.isFormValid = false
                    resolve(form)
                }
            })
            .catch(err => console.log('Error while retrieving placementCertificartion records'))
    })
}