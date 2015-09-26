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
            if(!this.isLogin()){
                this.showMyToast("请先登录", 1500);
            }else
                Lizard.goTo("myhouses.html");
        },

        toHouseUpload:function(){
            if(!this.isLogin()){
                this.showMyToast("请先登录", 1500);
            }else
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
            self = this;
        },

        onShow: function () {


            pic = [
                //{id: 1, src: './pic/slide1.png', href: './res/img/1.jpg'},
                {id: 2, src: './pic/ownerindex1.jpg', href: './res/img/2.jpg'},
                {id: 3, src: './pic/ownerindex2.jpg', href: './res/img/3.jpg'},
                {id: 4, src: './pic/ownerindex3.jpg', href: './res/img/4.jpg'}
            ];

            self.houseSlider = new cUIImageSlider({
                datamodel: {
                    data: pic,
                    itemFn: function (item) {
                        return '<img data-src="' + item.src + '" src="' + item.src + '" >';
                    }
                },
                autoPlay: true,
                displayNum: 1,
                wrapper: this.$('.slide-block')
            });
            self.houseSlider.show();


            var height=$(window).height();
            ////alert(height);
            if(height<615){
                self.$(".slide-block img").css("height","350px");
            }else{
                self.$(".slide-block img").css("height","415px");
            }

            self.hideLoading();
        }


    });
    return View;
})