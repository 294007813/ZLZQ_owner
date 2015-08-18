define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'houses_upload',
        events: {
            "click .back":"toLocation",
        },

        onShow: function () {

        }

    })
    return View;
})