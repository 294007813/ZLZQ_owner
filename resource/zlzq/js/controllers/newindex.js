define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'newindex',
        events: {
            "click .iconBrush":"toDecorate",
            "click .iconHouse":"toHouseUpload",
            "click .icon-person":"toPersonal",
            "click .iconPad":"toMyhouse",
            "click .iconNews":"toNews",

        },

        toMyhouse:function(){
            Lizard.goTo("myhouses.html");
        },

        toHouseUpload:function(){
            Lizard.goTo("houses_upload.html");
        },

        toDecorate:function(){
            //Lizard.goTo("decoratelist.html");
            window.location.href="decoratelist.html";
        },

        toNews:function(){
        //Lizard.goTo("decoratelist.html");
        window.location.href="newslist.html";
    },

        onCreate:function(){

        },

        onShow: function () {
            this.hideLoading();
            //console.log(this.$el.find(".person"));
            //console.log(this.$el.find(".iconHouse"));
            //console.log(this.$el.find(".iconBrush"))
        }


    });
    return View;
})