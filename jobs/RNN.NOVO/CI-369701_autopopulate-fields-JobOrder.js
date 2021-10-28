console.log('API ', API)
//First call, get the data from Company Track 3: Contracts
const clientID = API.form.controls['clientCorporation'].value.id
const getContractDetails = `/search/ClientCorporation?fields=id,name,status,customText2,customText19,customInt3,customText3,customText10,customText1,competitors,workWeekStart,customTextBlock2,customText8,customText12,numEmployees,customText5,businessSectorList,customText9,customText14,linkedinProfileName,customText7,customText11,customText6,customText20,customText4,customTextBlock4,customTextBlock3,culture,companyURL,companyDescription,notes&query=id:${clientID}&count=500&start=0`
API.appBridge.httpGET(getContractDetails)
    .then(resp => {
        if (resp.data.count > 0) {
            console.log('resp ', resp)
            //set Guaranteed Hours Details from Contract customText2 
            resp.data.data[0].customText2 !== null ? API.setValue('customText13', resp.data.data[0].customText2) : API.setValue('customText13', '')
            //set Account Executive from Contract customText2 
            resp.data.data[0].customText19 !== '' ? API.setValue('correlatedCustomInt1', resp.data.data[0].customText19) : API.setValue('correlatedCustomInt1', '')
            //set Business Development Rep from Contract customInt3 
            resp.data.data[0].customInt3 !== '' ? API.setValue('customText1', resp.data.data[0].customInt3) : API.setValue('customText1', '')
            //set Confirmation Type from Contract customText3 
            resp.data.data[0].customText3 !== '' ? API.setValue('customText25', resp.data.data[0].customText3) : API.setValue('customText25', '')
            //set Contract Tier Level from Contract customText10 
            resp.data.data[0].customText10 !== '' ? API.setValue('customText26', resp.data.data[0].customText10) : API.setValue('customText26', '')
            //set Relationship Type from Contract customText1 
            resp.data.data[0].customText1 !== '' ? API.setValue('customText2', resp.data.data[0].customText1) : API.setValue('customText2', '')
            //set Priority Client from Contract workWeekStart 
            resp.data.data[0].workWeekStart !== '' ? API.setValue('customText18', resp.data.data[0].workWeekStart) : API.setValue('customText18', '')
            //set Retrieving data. Wait a few seconds and try to cut or copy again. from Contract competitors 
            resp.data.data[0].competitors !== '' ? API.setValue('correlatedCustomText1', resp.data.data[0].competitors) : API.setValue('correlatedCustomText1', '')

            //Company Track 2: Facilities

            //set Orientation Comments/Instructions  from Contract customTextBlock2 
            resp.data.data[0].customTextBlock2 !== '' ? API.setValue('customTextBlock5', resp.data.data[0].customTextBlock2) : API.setValue('customTextBlock5', '')
            
            //set Orientation Pass/Fail from Contract customText20 
            resp.data.data[0].customText20 !== '' ? API.setValue('willRelocateInt', resp.data.data[0].customText20) : API.setValue('willRelocate', '')

            //set Computer Charting System from Contract customText8 
            resp.data.data[0].customText8 !== '' ? API.setValue('customText34', resp.data.data[0].customText8) : API.setValue('customText34', '')

            //set Consultant (Acute Care) from Contract customText12 
            resp.data.data[0].customText12 !== '' ? API.setValue('customText35', resp.data.data[0].customText12) : API.setValue('customText35', '')

            //set Consultant (HH/Dialysis)  from Contract numEmployees 
            resp.data.data[0].numEmployees !== '' ? API.setValue('customText36', resp.data.data[0].numEmployees) : API.setValue('customText36', '')

            //set Facility Type  from Contract customText5 
            resp.data.data[0].customText5 !== '' ? API.setValue('customText37', resp.data.data[0].customText5) : API.setValue('customText37', '')

            //set Setting  from Contract businessSectorList 
            resp.data.data[0].businessSectorList !== '' ? API.setValue('customText4', resp.data.data[0].businessSectorList) : API.setValue('customText4', '')

            //set Trauma Level from Contract customText9 
            resp.data.data[0].customText9 !== '' ? API.setValue('customText38', resp.data.data[0].customText9) : API.setValue('customText38', '')

            //set Magnet Facility  from Contract customText14 
            resp.data.data[0].customText14 !== '' ? API.setValue('customText39', resp.data.data[0].customText14) : API.setValue('customText39', '')

            //set Nicotine Free Facility from Contract linkedinProfileName 
            resp.data.data[0].linkedinProfileName !== '' ? API.setValue('customText40', resp.data.data[0].linkedinProfileName) : API.setValue('customText40', '')

            //set NICU Level from Contract competitors 
            resp.data.data[0].customText7 !== '' ? API.setValue('customText23', resp.data.data[0].customText7) : API.setValue('customText23', '')

            //set Number of Beds from Contract customText11 
            resp.data.data[0].customText11 !== '' ? API.setValue('isPublic', resp.data.data[0].customText11) : API.setValue('isPublic', '')

            //set Teaching Facility from Contract customText6 
            resp.data.data[0].customText6 !== '' ? API.setValue('customText33', resp.data.data[0].customText6) : API.setValue('customText33', '')

            //set Single Point of Contact (Consultant) Contract customText4 
            resp.data.data[0].customText4 !== '' ? API.setValue('customObject1s.text1', resp.data.data[0].customText4) : API.setValue('customObject1s.text1', '')

            //set Submission Instructions  Contract customTextBlock4 
            resp.data.data[0].customTextBlock4 !== '' ? API.setValue('TextBlock2', resp.data.data[0].customTextBlock4) : API.setValue('TextBlock2', '')

            //set Community Features Contract customTextBlock3 
            resp.data.data[0].customTextBlock3 !== '' ? API.setValue('TextBlock4', resp.data.data[0].customTextBlock3) : API.setValue('TextBlock4', '')

            //set Community Features Contract Community culture 
            resp.data.data[0].culture !== '' ? API.setValue('TextBlock5', resp.data.data[0].culture) : API.setValue('TextBlock5', '')
            
            //set Single Point of Contact (Facility) from Contract notes 
            resp.data.data[0].notes !== '' ? API.setValue('customObject1s.text2', resp.data.data[0].notes) : API.setValue('customObject1s.text2', '')

            // JobOrderCustomObjectInstance2

            //set Facility Image URL from Contract companyURL 
            resp.data.data[0].companyURL !== '' ? API.setValue('TextBlock1', resp.data.data[0].companyURL) : API.setValue('TextBlock1', '')

            //set Rate Information Contract Community culture 
            resp.data.data[0].culture !== '' ? API.setValue('TextBlock5', resp.data.data[0].culture) : API.setValue('TextBlock5', '')

        }
    })
    .catch(err => {
        console.error('Error retrieving the data from company track 3 ', err)
    })
const ClientCorporationCustomObjectInstance3 = `/query/ClientCorporationCustomObjectInstance3?where=clientCorporation=${clientID}&fields=text7,text9,text11,text2,textBlock5,text15,text13,text4,text14,textBlock2`
API.appBridge.httpGET(ClientCorporationCustomObjectInstance3)
    .then(resp => {
        if (resp.data.count > 0) {
            //set Assignment (prior to start) CX policy from clientCorporationCustomObjectInstance3 - Additional Contract Info text7
            resp.data.data[0].text7 !== null ? API.setValue('customText22', resp.data.data[0].text7) : API.setValue('customText22', '')
            //set Client-Side Manager (CMS)  from clientCorporationCustomObjectInstance3 - Additional Contract Info text9
            resp.data.data[0].text9 !== null ? API.setValue('customText24', resp.data.data[0].text9) : API.setValue('customText24', '')
            //set Home Health Hours Based on Points from clientCorporationCustomObjectInstance3 - Additional Contract Info text11
            resp.data.data[0].text11 !== null ? API.setValue('customText27', resp.data.data[0].text11) : API.setValue('customText27', '')
            //set MSP Type  from clientCorporationCustomObjectInstance3 - Additional Contract Info text2
            resp.data.data[0].text2 !== null ? API.setValue('customText28', resp.data.data[0].text2) : API.setValue('customText28', '')
            //set Radius Rule from clientCorporationCustomObjectInstance3 - Additional Contract Info text15
            resp.data.data[0].text15 !== null ? API.setValue('customText29', resp.data.data[0].text15) : API.setValue('customText29', '')
            //set T/E Rounding Rule from clientCorporationCustomObjectInstance3 - Additional Contract Info text13
            resp.data.data[0].text13 !== null ? API.setValue('customText30', resp.data.data[0].text13) : API.setValue('customText30', '')
            //set Service Level from clientCorporationCustomObjectInstance3 - Additional Contract Info text4
            resp.data.data[0].text4 !== null ? API.setValue('customText31', resp.data.data[0].text4) : API.setValue('customText31', '')
            //set VMS Tool Contract text5 
            resp.data.data[0].text5 !== '' ? API.setValue('Text3', resp.data.data[0].text5) : API.setValue('Text3', '')
            //set VMS Change Details Contract textBlock1 
            resp.data.data[0].textBlock1 !== '' ? API.setValue('TextBlock3', resp.data.data[0].textBlock1) : API.setValue('TextBlock3', '')
        }
    })
    .catch(err => {
        console.error('Error retrieving the data from ClientCorporationCustomObjectInstance3 ', err)
    })

const ClientCorporationCustomObjectInstance1 = `/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=${clientID}&fields=textBlock5,textBlock2`
API.appBridge.httpGET(ClientCorporationCustomObjectInstance1)
    .then(resp => {
        if (resp.data.count > 0) {
            //set Payroll Comments from clientCorporationCustomObjectInstance3 - Additional Contract Info textBlock5
            resp.data.data[0].textBlock5 !== null ? API.setValue('customTextBlock3', resp.data.data[0].textBlock5) : API.setValue('customTextBlock3', '')
            //set Holiday Rules  clientCorporationCustomObjectInstance1 - Additional Contract Info textBlock2
            resp.data.data[0].textBlock2 !== null ? API.setValue('customObject1s.text1', resp.data.data[0].textBlock2) : API.setValue('customObject1s.text1', '')
        }
    })
    .catch(err => {
        console.error('Error retrieving the data from ClientCorporationCustomObjectInstance1 ', err)
    })
