define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'houses_info',
        events: {
            "click .icon-person":"toPersonal",
            "click .icon-home":"toLocation",
            "click .back":"toMyhouse",
            "click .next":"toChange",
        },

        toMyhouse:function(){
            Lizard.goTo("myhouses.html");
        },

        onShow: function () {
            this.hideLoading();
        },



    });
    return View;
})