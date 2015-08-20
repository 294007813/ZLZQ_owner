define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'houses_upload',
        events: {
            "click .back":"toLocation",
            "click .icon-person":"toPersonal",
            "click .icon-home":"toLocation",
        },

        onShow: function () {
            this.hideLoading();
        }

    })
    return View;
})