define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store","text!TplHouseInfo"], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store,TplHouseInfo) {
    var self;
    var View = BaseView.extend({
        ViewName: 'houses_info',
        events: {
            "click .icon-person": "toPersonal",
            "click .icon-home": "toLocation",
            "click .back": "toMyhouse",
            "click .next": "toChange"
        },

        toMyhouse: function () {
            Lizard.goTo("myhouses.html");
        },
        getHouseInfo: function (cb) {
            if (!self.user) {
                cb && cb();
                self.showMyToast("未登录", 1500);
                return;
            }
            var url = Lizard.host + Lizard.apiUrl + "/realties/" + Lizard.P("id");
            $.ajax({
                url: url,
                type: "get",
                success: function (data) {
                    self.hideLoading();
                    cb(data);

                },
                error: function (e) {
                    self.hideLoading();
                    self.showMyToast("网络错误", 1000);


                }
            });
        },
        onCreate: function () {
            self = this;
            self.user= this.getCurrentUser()
        },
        onShow: function () {
            self.getHouseInfo(function (data) {
                console.log(data);
                var id = Lizard.P("id"),
                    i = 0;
                for (; i < data.realties.length; i++) {
                    if (data.realties[i].id == id) {
                        break;
                    }
                }
                self.$el.html(_.template(TplHouseInfo)({realties: data.realties[i]}));
                self.hideLoading();
            })
        }


    });
    return View;
})