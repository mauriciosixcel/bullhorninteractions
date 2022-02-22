// 235- Status/Sub-Status Filtering
// Name: EmployeBridge Customization: Status/Sub-Status Filtering
// Entity/Tracks:  candidate, 
// Fields: status, customText34
// Event: Fi –On init


    console.log('Mauricio - Assignment Validation - Onboarding ', API); 
    const customText34 = [
        {key: 'Candidate',value: ''},
        {key: 'Associate',value: ''},
        {key: 'Inactive',value: ''},
        {key: 'Do Not Use',value: ''},
        {key: 'Candidate',value: ''},
        {key: 'Candidate',value: ''},
        {key: 'Candidate',value: ''},
        {key: 'Candidate',value: ''},
        {key: 'Candidate',value: ''},
        {key: 'Candidate',value: ''},
    ]
    const userTypeName = API._globals.user.userTypeName
    const isAdmin = (userTypeName.includes('Franchise Support') || userTypeName.includes('Admin')) ? true : false

    const placement = `/query/JobOrder?where=placements.id=${form.data.changedEntityId}&fields=id,numOpenings,isOpen`
    return new Promise((resolve) => {
        return API.appBridge.httpGET(placement)
            .then((wcObj) => {
                console.log('JobOrder query ', wcObj);
                if (wcObj.data.count > 0) {
                    let numOpenings = wcObj.data.data.numOpenings
                    const UpdateJobOrderData = `/entity/JobOrder/${form.data.changedEntityId}`;
                    let Obj = numOpenings - 1 > 0 ? {
                        "isOpen": 1,
                        "status": 'Partially Placed'
                    } : {
                        "isOpen": 0,
                        "status": 'Placed'
                    }
                    API.appBridge.httpPOST(UpdateJobOrderData, Obj)
                        .then(resp => {}).catch(err => {
                            console.log("error while updating the JobOrder data", err);
                        });
                }
            })
    })
