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
    const getPlacementId = `entity/Placement/${API.currentEntityId}?fields=candidate`
    return API.appBridge.httpGET(getPlacementId)
        .then(candidateObj => {
            console.log(candidateObj.data.data.candidate.id);
            if (candidateObj.data.data.candidate.id > 0) {
                getCandidateCertificationRequirement(candidateObj.data.data.candidate.id, form.controls.status.value)
                getPlacementRateCard(API.currentEntityId, form.controls.status.value)
                return Promise.resolve(getPlacement(API.currentEntityId, form.controls.status.value),getCandidateCertificationRequirement(API.currentEntityId, form.controls.status.value))
            
            }
        });
}



function getPlacementCertification(id, status) {
    console.log('getPlacementCertification called ', id, status);
    return new Promise((resolve) => {
        const PlacementCertification = `/query/PlacementCertification?fields=id,candidateCertificationStatus,certification&where=placement.id=${id}`
        return API.appBridge.httpGET(PlacementCertification)
            .then((PlacementCertificationObj) => {
                console.log('PlacementCertification query 2', PlacementCertificationObj.data.data);
                if (PlacementCertificationObj.data.count > 0) {
                    const certification = []
                    PlacementCertificationObj.data.data.forEach(element => {
                        if (element.candidateCertificationStatus !== 'Active') {
                            certification.push(element.certification);
                        }
                    });
                    console.log('supppppppppppp PlacementCertification ', certification.length, 'form.controls.status.value ', status);
                    if (certification.length > 0 && status === 'Approved') {
                        console.log('the problem is in the line below');
                        form.errorMessage = `Onboarding Validation: The following fields [ ${certification.map(el => ` ${el.name} `).toString()} ] must be Active before Assignment is approved.`,
                            form.isFormValid = false
                        resolve(form)
                    } else {
                        console.log('passsssssssssss');
                        resolve([])
                    }
                }
            })
            .catch(err => console.log('Error while retrieving PlacementCertification record'))
    })
}

function getCandidateCertificationRequirement(id, status) {
    console.log('getCandidateCertificationRequirement called ', id, status);
    return new Promise((resolve) => {
        const CandidateCertificationRequirement = `/query/CandidateCertificationRequirement?fields=id,certification,userCertificationStatus&where=candidate.id=${id}AND isDeleted=false`
        return API.appBridge.httpGET(CandidateCertificationRequirement)
            .then(wcObj => {
                console.log('CandidateCertificationRequirement query 1', wcObj.data.data);
                const certifications = []
                if (wcObj.data.data.length > 0) {
                    wcObj.data.data.forEach(element => {
                        if (element.userCertificationStatus !== 'Active' && status === 'Approved') {
                            certifications.push(element.certification);
                        }
                    });
                }
                console.log('supppppppppppp certtttttttt ', certifications);
                if (certifications.length > 0 && status === 'Approved') {
                    form.errorMessage = `Onboarding Validation: The following fields [ ${certifications.map(el => el.name).toString()} ] must be Active before Assignment is approved.`,
                        form.isFormValid = false
                    resolve(form)
                }
            })
            .catch(err => console.log('Error while retrieving CandidateCertificationRequirement record ', err))

    })
}

function getPlacementRateCard(id, status) {
    console.log(' getPlacementRateCard called', id, status);
   
        const dateBegin = new Date(form.controls.dateBegin.value).getTime()
        const rateCardQuery = `/query/PlacementRateCard?where=placement=${id}&fields=id,effectiveDate&orderBy=effectiveDate`
        return API.appBridge.httpGET(rateCardQuery)
            .then((rcObj) => {
                if (rcObj.data.count > 0 && status === 'Approved') {
                    console.log('ssssdsddsd ', rcObj);
                    rcObj.data.data.forEach(element => {
                        console.log('new Date(element.effectiveDate).getTime() ', new Date(element.effectiveDate).getTime());
                        console.log('dateBegin ', dateBegin);
                        if (new Date(element.effectiveDate).getTime() > dateBegin) {
                            form.errorMessage = `PlacementRateCard is required. `,
                                form.isFormValid = false
                            return(form)
                        }
                    })
                }
            })
}

async function getNumberofPlacement(jobId) {
    const dataa = await API.appBridge.httpGET(`entity/JobOrder/${jobId}?fields=id,placements`)
    return dataa.data.data.id > 0 ? dataa.data.data : null;
}

function getPlacement(id) {
   
        const candidateQuery = `/entity/Placement/${id}?fields=id,candidate(status,customText20,ssn,dateOfBirth),clientCorporation(status),jobOrder(status,customInt2)`
        return API.appBridge.httpGET(candidateQuery)
            .then((candObj) => {
                console.log('candidate ', candObj.data.data, " candObj.data.data.id > 0 ", candObj.data.data.id > 0);

                if (candObj.data.data.id > 0) {
                    // console.log(candObj.data.data.candidate.customText20, ' candidate ', (candObj.data.data.candidate.customText20 === 'Available' || candObj.data.data.candidate.customText20 === 'Approved'));
                    if (candObj.data.data.candidate.status !== 'Associate' ||
                        !(candObj.data.data.candidate.customText20 === 'Available' || candObj.data.data.candidate.customText20 === 'Approved')) {
                        form.errorMessage = 'Candidate status is not valid for Assignment',
                            form.isFormValid = false
                        return form
                    } else if (candObj.data.data.clientCorporation.status !== 'Active Account') {
                        form.errorMessage = 'clientCorporation status is not valid for Assignment',
                            form.isFormValid = false
                        return form
                    } else if (candObj.data.data.candidate.ssn === '') {
                        form.errorMessage = 'Candidate SSN cannot be blank',
                            form.isFormValid = false
                        return form
                    } else if (candObj.data.data.candidate.dateOfBirth === null) {
                        form.errorMessage = 'Candidate dateOfBirth cannot be blank',
                            form.isFormValid = false
                        return form
                    } else if (candObj.data.data.jobOrder.status === 'Draft' ||
                        candObj.data.data.jobOrder.status === 'Placed' ||
                        candObj.data.data.jobOrder.status === 'Cancelled' ||
                        candObj.data.data.jobOrder.status === 'Template' ||
                        candObj.data.data.jobOrder.status === 'Recruiting Job Order' ||
                        candObj.data.data.jobOrder.status === 'Archive') {
                        form.errorMessage = `jobOrder Status is not valid for Assignment: ${candObj.data.data.jobOrder.status}`,
                            form.isFormValid = false
                        return form
                    } else if (!candObj.data.data.jobOrder.customInt2) {
                        // && Number(candObj.data.data.jobOrder.placementNumber) * 1.5 > candObj.data.data.jobOrder.customInt2
                        const NumberOfPlacements = getNumberofPlacement(candObj.data.data.jobOrder.id)
                        NumberOfPlacements.then(val => {
                            if (val.placements.total * 1.5 > candObj.data.data.jobOrder.customInt2) {
                                form.errorMessage = `This assignment exceeds the Overfill threshold of 50% over # Committed`,
                                    form.isFormValid = false
                                return form
                            } else
                                return []
                        })
                    } else
                        return []
                }


            })
            .catch(err => console.log('Error while retrieving Candidate record'))
 
}