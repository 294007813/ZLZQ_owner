define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'newindex',
        events: {
            "click .iconBrush":"toDecorate",
            "click .iconHouse":"toHouseUpload",
            "click .person":"toPersonal",

        },

        toHouseUpload:function(){
            Lizard.goTo("houses_upload.html");
        },


        toDecorate:function(){
            Lizard.goTo("decoratelist.html");
        },
        onCreate:function(){


        },
        onShow: function () {
            console.log(this.$el.find(".person"));
            //console.log(this.$el.find(".iconHouse"));
            //console.log(this.$el.find(".iconBrush"))
        }


    });
    return View;
})