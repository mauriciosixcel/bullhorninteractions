if (API.currentEntity === "JobOrder") {
    console.log('FORM ', form)

    return new Promise((resolve) => {
        const employmentType = form.data.employmentType
        const clientCorporation = form.controls['clientCorporation'].value.id
        let startDate = new Date(form.controls['startDate'].value).getTime();
        const ClientCorporationCustomObjectInstance1 = `/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=${clientCorporation}&fields=id,date1,text2,text3`
        API.appBridge.httpGET(ClientCorporationCustomObjectInstance1)
            .then(resp => {
                console.log('resp.data ', resp.data)
                if (resp.data.count > 0) {

                    resp.data.data.forEach(element => {
                        const date1 = element.date1
                        const text3 = element.text3 // array -> make a filter
                        const text2 = element.text2
                        //text3 = Perm IF job.employmentType=Perm Or text3 = Temp IF job.employmentType = Temp                         
                        if (date1 < startDate ||
                            text3.filter(el => el === employmentType).length <= 0 || text2 !== 'Approved') {
                            resolve(API.promptUser({
                                headerText: 'Credit and Terms Alert',
                                subheaderText: 'Do not meet the minimum requirements for this Job'
                            }))
                            return
                        } else {
                            const ClientCorporationCustomObjectInstance6 = `/query/ClientCorporationCustomObjectInstance6?where=clientCorporation=${clientCorporation}&fields=id,date2`
                            API.appBridge.httpGET(ClientCorporationCustomObjectInstance6)
                                .then(res => {
                                    console.log('res.data.count ', res)
                                    if (res.data.count > 0) {
                                        res.data.data.forEach(el => {
                                            const date2 = el.date2 // moved to ClientCorporationCustomObjectInstance6
                                            if (date2 === '') {
                                                resolve(API.promptUser({
                                                    headerText: 'Credit and Terms Alert',
                                                    subheaderText: 'Do not meet the minimum requirements for this Job'
                                                }))
                                            } else {
                                                resolve()
                                            }
                                        })
                                    } else {
                                        resolve(API.promptUser({
                                            headerText: 'Credit and Terms Alert',
                                            subheaderText: 'Do not meet the minimum requirements for this Job'
                                        }))
                                    }
                                })
                                .catch(err => console.log('ERROROOOOOOOO ', err))
                        }

                    });
                } else {
                    resolve(API.promptUser({
                        headerText: 'Credit and Terms Alert',
                        subheaderText: 'Do not meet the minimum requirements for this Job'
                    }))
                }
            })
    })
}