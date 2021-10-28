
if (API.currentEntity === 'Placement') {
    const deptSplitInstance = `/query/PlacementCustomObjectInstance4?where=placement.id=${API.currentEntityId}&fields=id,text1,text2,date1,placement`
    API.appBridge.httpGET(deptSplitInstance)
        .then(resp => {
            if (resp.data.count === 0) {
                const status = form.controls['status'].value
                if (status === 'Approved' || status === 'Cleared to Start') {

                    let startDate = 0

                    //Parse the value in the Original Practice Group field (Placement.correlatedCustomText2) 
                    const depts = form.controls['correlatedCustomText2'].config.options
                    const InitialValuedepts = form.controls['correlatedCustomText2'].value[0]
                    const result = depts.filter(obj => obj.value === InitialValuedepts)

                    //Spliting the result to and taking the substring before the dash to identify the SegmentName
                    const queryexternalSegmentName = result[0].label.split('-')[0]
                    const getexternalSegmentNumber = "/query/GeneralLedgerSegment?where=id=4&fields=id,externalSegmentNumber&externalSegmentName=" + queryexternalSegmentName

                    API.appBridge.httpGET(getexternalSegmentNumber)
                        .then(wcObj => {

                            if (wcObj.data.count > 0) {
                                let externalSegmentNumber = wcObj.data.data[0].externalSegmentNumber
                                console.log('externalSegmentNumber ', externalSegmentNumber)

                                //Convert date to UNIX epoch format
                                let initialDate = form.controls['dateBegin'].value
                                startDate = new Date(initialDate).getTime();

                                //Calculate and set Float2 based on the number of Departments listed
                                const getDepts = "/query/PlacementCustomObjectInstance4?where=id>0&fields=id,text1,text2,date1,placement"
                                API.appBridge.httpGET(getDepts)
                                    .then(deptObj => {
                                        if (deptObj.data.count > 0) {
                                            let deptCount = deptObj.data.count

                                            //Saving the instance
                                            const endpoint = 'entity/PlacementCustomObjectInstance4'
                                            let requestBody = {
                                                "date1": startDate,
                                                "float2": deptCount,
                                                "placement": {
                                                    "id": API.currentEntityId
                                                },
                                                "text1": externalSegmentNumber,
                                            };
                                            API.appBridge.httpPUT(endpoint, requestBody)
                                                .then(wcObj => {
                                                    if (wcObj.data.count > 0) {
                                                        let wcData = wcObj.data.data;
                                                    }
                                                })
                                                .catch((err) => {
                                                    console.log('Failed to save the instance ', err)
                                                })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log('failed to retrieve depts ', err)
                                    })

                            }
                        })
                        .catch((err) => {
                            console.log('failed to retrieve externalSegmentNumber ', err)
                        })

                }
            }
        })
        .catch(err => {

        })


}