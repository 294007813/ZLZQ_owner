define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'myhouses',
        events: {
            "click .house-info":"toHousesInfo",
            "click .icon-person":"toPersonal",
            "click .icon-home":"toLocation",
            "click .back":"toLocation",
        },

        toHousesInfo:function(){
            //Lizard.goTo("houses_info.html");
        },

        onShow: function () {
            this.hideLoading();
        },



    });
    return View;
})