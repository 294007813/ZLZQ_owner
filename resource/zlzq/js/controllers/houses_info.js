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
        toChange:function(e) {
            Lizard.goTo("houses_upload.html?id=" + self.hid);
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
            self.hid= Lizard.P("id");
            var url = Lizard.host + Lizard.apiUrl + "realties/" + self.hid;
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

        getDistricts: function (callback) {
            $.ajax({
                url: Lizard.host + Lizard.apiUrl + 'districts',
                dataType: "json",
                contentType: "application/json",
                type: "get",
                success: function (data) {
                    callback && callback(data.districts);
                }
            });
        },

        showDistricts: function(dist){
            for(i=0;i<dist.length;i++){
                if(dist[i].id==$("#area").text()){
                    alert(dist[i].title)
                }
            }
        },

        gitPic: function(data){
            var pic=[];
            pic=data.realty.media;
            //alert("length:"+pic.length);
            for(i=0;i<data.realty.media.length;i++){
                $(".pic-block").append('<label class="pic-label icon"><img src="'+pic[i].avatar+'"/></label>');
                //alert("src:"+pic[i].avatar);
            }
        },

        onCreate: function () {
            self = this;
            self.user= this.getCurrentUser()
        },
        onShow: function () {
            self.getHouseInfo(function (data) {

                self.$el.html(_.template(TplHouseInfo)({realties: data.realty}));

                self.gitPic(data);
                self.getDistricts(function(data){
                    for(i=0;i<data.length;i++){
                        if(data[i].id==$("#area").text()){
                            //alert(data[i].title)
                            $("#area").text(data[i].title);
                        }
                    }
                });
                self.hideLoading();

            })
        },


    });
    return View;
})