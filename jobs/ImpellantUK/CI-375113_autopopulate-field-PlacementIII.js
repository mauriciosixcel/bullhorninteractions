//Time Card Approver - Impellam UK I-375113 part 4
if (API.currentEntityTrack === "Placement3") {
    let startDate = new Date(form.controls['dateBegin'].value).getTime();
    const placement = `/entity/Placement/${API.currentEntityId}?fields=clientCorporation,employmentType`
    return new Promise((resolve) => {
        API.appBridge.httpGET(placement)
            .then((wcObj) => {
                console.log('data from placement ', wcObj)
                if (wcObj.data.data.clientCorporation.id > 0 &&
                    (wcObj.data.data.employmentType === 'Temp/Contract to Hire' ||
                        wcObj.data.data.employmentType === 'Temp/Contract' ||
                        wcObj.data.data.employmentType === 'Fixed Term Contract'
                    )
                ) {
                    console.log('data meets the requirements')
                    const clientCorporationID = wcObj.data.data.clientCorporation.id
                    const ClientCorporationCustomObjectInstance1 = `/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=${clientCorporationID}&fields=id,date1,text2,text3,date2`
                    API.appBridge.httpGET(ClientCorporationCustomObjectInstance1)
                        .then(resp => {
                            if (resp.data.count > 0) {
                                resp.data.data.forEach(element => {
                                    const date1 = element.date1
                                    const date2 = element.date2
                                    const text2 = element.text2
                                    const text3 = element.text3
                                    if (!(date1 > startDate &&
                                        text2 === 'Approved' &&
                                        (text3 === 'Temp' || text3 === 'Both') &&
                                        date2 !== '')) {
                                        resolve(
                                            form.isFormValid = false,
                                            form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                                        )
                                        return
                                    }
                                    resolve(form.isFormValid = true)
                                });
                                return
                            }
                            resolve(
                                form.isFormValid = false,
                                form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                            )
                        })

                } else {
                    console.log('There is no data')
                }
            })
            .catch(err => {
                console.log('Error while retrieving placement Data ', err)
            })
    })
}