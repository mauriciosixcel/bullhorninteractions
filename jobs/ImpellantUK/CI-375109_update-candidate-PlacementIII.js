if (API.currentEntity === 'Placement') {
    console.log('API ', API)
    const vendorID = API.forms.control['vendorClientCorporation'].value.id
    const endpointPlacement = `/entity/Placement/${API.currentEntityId}?fields=employmentType,candidate`
    API.appBridge.httpGET(endpointPlacement)
        .then(obj => {
            if (obj.data.data.employmentType === 'Temp/Contract to Hire' ||
                obj.data.data.employmentType === 'Temp/Contract' ||
                obj.data.data.employmentType === 'Fixed Term Contract') {
                console.log('placement data ', obj)
                if (obj.data.id !== null) {
                    let candidateID = obj.data.data.candidate.id
                    const endpointClientCorporation = `/search/ClientCorporation?fields=id,name,customText17&query=id:${vendorID}&count=500&start=0`

                    API.appBridge.httpGET(endpointClientCorporation)
                        .then(resp => {
                            console.log('endpointClientCorporation ', resp)
                            if (resp.data.count > 0) {
                                let Obj = {
                                    "customText5": vendorID,
                                    "customText6": resp.data.data.name,
                                    "customText7": resp.data.data.customText17
                                }
                                const postUpdateCandidateData = `/entity/Candidate/${candidateID}`
                                API.appBridge.httpPOST(postUpdateCandidateData, Obj)
                                    .then(resp => {
                                        console.log('it works ', resp)
                                    })
                                    .catch(err => {
                                        console.log("error while updating the candidate data ", err)
                                    })
                            }
                        })
                        .catch(err => {
                            console.error("error while getting the clientCorporation data ", err)
                        })
                }
            }
        })
        .catch(err => {
            console.error("error while getting the placement data ", err)
        })
}