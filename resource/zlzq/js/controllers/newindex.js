define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
    var self;
    var View = BaseView.extend({
        ViewName: 'newindex',
        events: {
            "click .iconBrush":"toDecorate"
        },

        //点击装修
        toDecorate:function(){
            Lizard.goTo("decoratelist.html");
        },
        onCreate:function(){


        },
        onShow: function () {

            //console.log(this.$el.find(".iconBrush"))
        }


    });
    return View;
})