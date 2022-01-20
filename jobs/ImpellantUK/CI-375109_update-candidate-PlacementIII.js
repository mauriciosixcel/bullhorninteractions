if (API.currentEntityTrack === 'Placement3') {
    console.log(' Placement3 API', API, form);
    let vendorID = null
    if (form.controls['employeeType'].value === 'PAYE') {
        vendorID = form.controls['vendorClientCorporation'].value
    } else {
        vendorID = form.controls['vendorClientCorporation'].value.id
    }
    const endpointPlacement = `/entity/Placement/${API.currentEntityId}?fields=employmentType,employeeType,candidate`;
    console.log('vendorID ', vendorID)
    API.appBridge.httpGET(endpointPlacement)
        .then(obj => {
            console.log('placement data', obj, 'obj.data.id ', obj.data.data.id);
            let candidateID = obj.data.data.candidate.id;
            if (obj.data.id !== null && vendorID !== null) {
                const endpointClientCorporation = `/search/ClientCorporation?fields=id,name,customText17&query=id:${vendorID}&count=500&start=0`;
                API.appBridge.httpGET(endpointClientCorporation)
                    .then(resp => {
                        console.log('endpointClientCorporation', resp);
                        if (resp.data.count > 0) {
                            let Obj = {
                                "customText5": vendorID,
                                "customText6": resp.data.data[0].name,
                                "customText7": resp.data.data[0].customText17
                            };
                            console.log('candidate Obj ', Obj);
                            const postUpdateCandidateData = `/entity/Candidate/${candidateID}`;
                            API.appBridge.httpPOST(postUpdateCandidateData, Obj)
                                .then(resp => {
                                    console.log('it works', resp);
                                })
                                .catch(err => {
                                    console.log("error while updating the candidate data", err);
                                });
                        }
                    })
                    .catch(err => {
                        console.error("error while getting the Vendor data", err);
                    });
            } else {
                let Obj = {
                    "customText5": "",
                    "customText6": "",
                    "customText7": ""
                };
                console.log('candidate Obj ', Obj);
                const postUpdateCandidateData = `/entity/Candidate/${candidateID}`;
                console.log('candidateID ', candidateID)
                API.appBridge.httpPOST(postUpdateCandidateData, Obj)
                    .then(resp => {
                        console.log('it works', resp);
                    })
                    .catch(err => {
                        console.log("error while updating the candidate data", err);
                    });
            }
        })
        .catch(err => {
            console.error("error while getting the placement data", err);
        });
}