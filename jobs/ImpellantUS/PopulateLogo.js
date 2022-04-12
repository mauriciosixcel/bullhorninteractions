const billingProfileId = API.form.controls.billingClientCorporation.value.id
let getCompanybyProfileId = `${API.http.restURL}/entity/ClientCorporation/${billingProfileId}?fields=id,customText20`
console.log('getCompanybyProfileId ', getCompanybyProfileId)
API.http.get(getCompanybyProfileId)
    .subscribe(resp => {
        console.log('Resp ', resp)
        if (resp.data.id > 0) {
            switch (resp.data.customText20) {
                case '10':
                    API.setValue('customText1', 'All');
                    break;
                case '20':
                    API.setValue('customText1', 'Guidant Global');
                    break;
                case '21':
                    API.setValue('customText1', 'Guidant Global');
                    break;
                case '25':
                    API.setValue('customText1', 'Guidant Global');
                    break;
                case '26':
                    API.setValue('customText1', 'Guidant Global');
                    break;
                case '40':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '41':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '42':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '43':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '44':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '45':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '46':
                    API.setValue('customText1', 'Lorien');
                    break;
                case '50':
                    API.setValue('customText1', 'SRG');
                    break;
                case '60':
                    API.setValue('customText1', 'Corestaff');
                    break;
                // case 'Leafstone':
                //     API.setValue('customText1', 'Leafstone');
                //     break;
                case '61':
                    API.setValue('customText1', 'Bartech');
                    break;
                case '80':
                    API.setValue('customText1', 'Bartech');
                    break;
                default:
                    break;
            }
        }
    })

if (!(API._globals.user.userTypeName === 'Impellam Group NA Enterprise Director Pay Bill User' ||
    API._globals.user.userTypeName === 'Impellam Group NA Enterprise Billing User ' ||
    API._globals.user.userTypeName === 'Impellam Group NA Enterprise Admin User + Billing' ||
    API._globals.user.userTypeName === 'Impellam Group NA Sixcel Enterprise BH1 Super Admin User')) {
    API.setReadOnly('customText1', true)
}

