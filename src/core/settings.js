define([
    "hr/hr",
    "utils/dialogs"
], function(hr, dialogs) {
    var key = "GitBookEditorSettings";
    var SettingsModel = hr.Model.extend({
        defaults: {
            autoFileManagement: true,
            host: "https://www.gitbook.io"
        },
        getStateFromStorage: function (){
            this.set(hr.Storage.get(key));
        },
        setStateToStorage: function (){
            hr.Storage.set(key, this.toJSON());
        },
        dialog: function() {
            var that = this;
            return dialogs.fields("Advanced Settings", {
                autoFileManagement: {
                    label: "Auto file management",
                    type: "checkbox"
                },
                username: {
                    label: "Username",
                    type: "text"
                },
                token: {
                    label: "Token",
                    type: "text"
                },
                host: {
                    label: "Host",
                    type: "text"
                }
            }, that.toJSON())
            .then(function(values) {
                that.set(values);
                that.setStateToStorage();
            });
        }
    });

    var settings = new SettingsModel({}, {});
    settings.getStateFromStorage();

    return settings;
});