console.log('form.fieldsets ', API.form.fieldsets);
const customObjects = {
    customObject9s: true,
    customObject14s: true,
    customObject15s: true,
};

API.form.fieldsets.forEach((form) => {
    console.log('form.key ', form.key);
    console.log('customObjects[form.key] ', form.key);
    if (form.key && customObjects[form.key]) {
        API.hideFieldSetHeader(form.key);
        form.controls.forEach((control) => {
            API.hide(control.key, false);
        });
    }
});

