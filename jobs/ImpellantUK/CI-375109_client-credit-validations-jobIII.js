if (API.currentEntityTrack === "JobOrder3") {
    const JobOrder = `/entity/JobOrder/${API.currentEntityId}?fields=status,id,employmentType,clientCorporation`
    let startDate = new Date(form.controls['startDate'].value).getTime();
    return new Promise((resolve) => {
        API.appBridge.httpGET(JobOrder)
            .then((wcObj) => {
                if (wcObj.data.data.status === 'Open' &&
                    (wcObj.data.data.employmentType === 'Temp/Contract' ||
                    wcObj.data.data.employmentType === 'Fixed Term Contract' ||
                        wcObj.data.data.employmentType === 'Temp/Contract to Hire'
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
                                        resolve(API.promptUser({
                                            headerText: 'Credit and Terms Alert',
                                            subheaderText: 'Do not meet the minimum requirements for this Job'
                                        }))
                                        return
                                    }
                                    resolve()
                                });

                            }
                        })
                } else {
                    console.log('There is no data')
                }
            })
            .catch(err => {
                console.log('Error while retrieving JobOrder Data ', err)
            })
    })
}