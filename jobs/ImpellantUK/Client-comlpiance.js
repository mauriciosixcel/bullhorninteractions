//Time Card Approver - Impellam UK I-375113 part 3
const placement = `/entity/Placement/${API.currentEntityId}?fields=clientCorporation,employmentType`
API.appBridge.httpGET(placement)
    .then((wcObj) => {
        if (wcObj.data.data.clientCorporation.id > 0 &&
            (wcObj.data.data.employmentType === 'Temp/Contract to Perm' ||
                wcObj.data.data.employmentType === 'Temp/Contract' ||
                wcObj.data.data.employmentType === 'Fixed Term Contract'
            )
        ) {

            const clientCorporation = wcObj.data.data.clientCorporation.id
            const getCompanyCustomText2 = `/entity/ClientCorporation/${clientCorporation}?fields=customText7,customText8`
            let customText46 = API.form.controls['customText46'].value
            let customText47 = API.form.controls['customText47'].value
            API.appBridge.httpGET(getCompanyCustomText2)
                .then(resp => {        
                    if (resp.data.data.customText7 !== '' && customText46 === '') {
                        API.setValue('customText46', resp.data.data.customText7)
                    }else if (resp.data.data.customText8 !== '' && customText47 === '') {
                        API.setValue('customText47', resp.data.data.customText8)
                    }
                })
                .catch(err => {
                    console.log('Error retrieving the customText7 or customText8 from Company ', err)
                })
        }
    })