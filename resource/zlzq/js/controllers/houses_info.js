define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store",], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store) {
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
            var url = Lizard.host + Lizard.apiUrl + "owners/" + self.user.actor_id + "/realties/my_owner_realties?auth_token=" + self.user.authentication_token;
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
        },
        onShow: function () {
            self.getHouseInfo(function () {
                self.hideLoading();
            })
        }


    });
    return View;
})