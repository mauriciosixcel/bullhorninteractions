if (API.currentEntity === "Placement") {
    console.log('FORM ', API.currentEntityId)

    return new Promise((resolve) => {
        const getClientCorporationID = `/entity/Placement/${API.currentEntityId}?fields=id,clientCorporation,employmentType`
        API.appBridge.httpGET(getClientCorporationID)
            .then(clientObj => {
                if (clientObj.data.data.clientCorporation.id > 0) {
                    let clientCorporation = clientObj.data.data.clientCorporation.id
                    let employmentType = clientObj.data.data.employmentType
                    let startDate = new Date(form.controls['dateBegin'].value).getTime();
                    const ClientCorporationCustomObjectInstance1 = `/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=${clientCorporation}&fields=id,date1,text2,text3`
                    API.appBridge.httpGET(ClientCorporationCustomObjectInstance1)
                        .then(resp => {
                            console.log('resp.data ', resp.data)
                            if (resp.data.count > 0) {

                                resp.data.data.forEach(element => {
                                    const date1 = element.date1
                                    const text3 = element.text3 // array -> make a filter
                                    const text2 = element.text2
                                    console.log('date1 > startDate ', date1, ' ', date1 > startDate, ' - ', startDate)
                                    //text3 = Perm IF job.employmentType=Perm Or text3 = Temp IF job.employmentType = Temp 
                                    console.log("wcObj.data.data.employmentType ", employmentType)
                                    console.log("text3 ", text3)

                                    console.log('employmentTypeResp ', employmentType)
                                    console.log("text3.filter(el => el === employmentTypeResp) ", text3.filter(el => el === employmentType))

                                    if (date1 < startDate ||
                                        text3.filter(el => el === employmentType).length <= 0 || text2 !== 'Approved') {
                                        console.log('holaaaaaaaaaaaa')
                                        resolve(
                                            form.isFormValid = false,
                                            form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                                        )
                                        return
                                    } else {
                                        const ClientCorporationCustomObjectInstance6 = `/query/ClientCorporationCustomObjectInstance6?where=clientCorporation=${clientCorporation}&fields=id,date2`
                                        API.appBridge.httpGET(ClientCorporationCustomObjectInstance6)
                                            .then(res => {
                                                console.log('res.data.count ', res)
                                                if (res.data.count > 0) {
                                                    res.data.data.forEach(el => {
                                                        const date2 = el.date2 // moved to ClientCorporationCustomObjectInstance6
                                                        console.log('date2 ===', date2)
                                                        if (date2 === '') {
                                                            console.log('something heree')
                                                            resolve(
                                                                form.isFormValid = false,
                                                                form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                                                            )
                                                        } else {
                                                            resolve()
                                                        }
                                                    })
                                                } else {
                                                    resolve(
                                                        form.isFormValid = false,
                                                        form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                                                    )
                                                }
                                            })
                                            .catch(err => console.log('ERROROOOOOOOO ', err))
                                    }

                                });
                            } else {
                                resolve(
                                    form.isFormValid = false,
                                    form.errorMessage = 'Error: Credit and Terms do not meet the minimum requirements for this Placement: '
                                )
                            }
                        })

                }
            })
            .catch(err => console.log('error while retrieving clientCorporationID', err))








    })
}