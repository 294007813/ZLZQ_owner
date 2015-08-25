define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store","UIGroupSelect"], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store,UIGroupSelect) {
    var self;
    var View = BaseView.extend({
        url: "http://zlzq.easybird.cn",
        ViewName: 'houses_upload',
        events: {
            "click .back": "toLocation",
            "click .icon-person": "toPersonal",
            "click .icon-home": "toLocation",
            "click #housetype-select": "showHouseType",
            "click #housing-show": "showHousing",
            "click .pic-label.choose": "showPicType",
            "click  .pic-box .cancel,.pic-box .pmask": "hidePicType",
            "click #area-select":"showDistrictsScroller",
            "click #housingtime-show":"showHousingTimeScroller",
            "click #faceto-show":"showDirectionScroller",
            "click #rentdeadline-select":"showDateScroller",
            "click #choose-box": "readFile",//选择相册
            "click #camera": "camera",//拍照,
            "click .submitBtn":"submitHouseInfo"
        },
        camera: function (e) {
            self.iframeContent.contentWindow.getPictureFromCamera(function (data) {
                $(".pic-block").prepend('<label class="pic-label icon " > <img src="data:image/jpeg;base64,'+ data +'"/> </label>');
                self.hidePicType();
            })
        },
        //点击选择相册
        readFile: function (e) {
            self.iframeContent.contentWindow.getPictureFromPhoto(function (data) {
                $(".pic-block").prepend('<label class="pic-label icon " > <img src="data:image/jpeg;base64,'+ data +'"/> </label>');
                self.hidePicType();
            })


        },
        hidePicType: function (e) {
            self.$el.find(".pic-box").removeClass("slideIn");
        },
        showPicType: function (e) {
            self.$el.find(".pic-box").addClass("slideIn");
        },
        showHouseType: function (e) {
            self.houseTypeScroller.show();
        },
        showHousing:function(e){
            self.housingScroller.show();
        },
        showHousingTimeScroller:function(e) {
            self.housingTimeScroller.show();
        },
        showDirectionScroller:function(e){
            self.directionScroller.show();
        },
        showDateScroller:function(e){
            self.dateScroller.show();
        },
        getHouseType: function (e) {
            var d1 = [];
            for (var i = 1; i < 6; i++) {
                d1.push({key: i, name: (i+"室"), value: (i+"室")});
                d1[d1.length - 1].halls = [];
                var d2 = d1[d1.length - 1].halls;
                for (var j = 1; j < 6; j++) {
                    d2.push({key: j, name: j+"厅", value: j+"厅"});
                    d2[d2.length - 1].toilets = [];
                    var d3 = d2[d2.length - 1].toilets;
                    d3.push({key: 1, name: '1卫', value: '1'});
                    d3.push({key: 1, name: '2卫', value: '2'});
                    d3.push({key: 1, name: '3卫', value: '3'});
                    d3.push({key: 1, name: '4卫', value: '4'});
                    d3.push({key: 1, name: '5卫', value: '5'});

                }
            }
            return d1;
        },
        getDistricts: function (callback) {
            $.ajax({
                url: self.url + '/api/v1/districts',
                dataType: "json",
                contentType: "application/json",
                type: "get",
                success: function (data) {
                    callback && callback(data.districts);
                }
            });
        },
        getHousing:function(e){
            var dis = [];
            dis.push({key: 1, name: 1, value: 1});
            dis[dis.length - 1].subdis = [];
            var subdis = dis[dis.length - 1].subdis;
            subdis.push({key: 1, name: 1, value: 1});
            subdis[subdis.length - 1].hs = [];
            subdis[subdis.length - 1].hs.push({
                key: 1,
                name: "毛坯",
                value:"毛坯"
            });
            subdis[subdis.length - 1].hs.push({
                key: 2,
                name: "简装",
                value:"简装"
            });
            subdis[subdis.length - 1].hs.push({
                key: 3,
                name: "居住",
                value:"居住"
            });
            subdis[subdis.length - 1].hs.push({
                key: 4,
                name: "豪华",
                value:"豪华"
            });
            subdis[subdis.length - 1].hs.push({
                key: 5,
                name: "精装",
                value:"精装"
            });
            return dis;
        },
        getHousingTime:function(e){
            var dis = [];
            dis.push({key: 1, name: 1, value: 1});
            dis[dis.length - 1].subdis = [];
            var subdis = dis[dis.length - 1].subdis;
            subdis.push({key: 1, name: 1, value: 1});
            subdis[subdis.length - 1].hs = [];
            subdis[subdis.length - 1].hs.push({
                key: 1,
                name: "无装修",
                value:"无装修"
            });
            subdis[subdis.length - 1].hs.push({
                key: 2,
                name: "一年",
                value:"一年"
            });
            subdis[subdis.length - 1].hs.push({
                key: 3,
                name: "二年",
                value:"二年"
            });
            subdis[subdis.length - 1].hs.push({
                key: 4,
                name: "三年",
                value:"三年"
            });
            subdis[subdis.length - 1].hs.push({
                key: 5,
                name: "四年",
                value:"四年"
            });
            subdis[subdis.length - 1].hs.push({
                key: 6,
                name: "五年及以上",
                value:"五年及以上"
            });
            return dis;
        },
        getFaceto:function(e){
            var dis = [],
                directions="正东 正南 正西 正北 东南 东北 西南 西北".split(" ");
            dis.push({key: 1, name: 1, value: 1});
            dis[dis.length - 1].subdis = [];
            var subdis = dis[dis.length - 1].subdis;
            subdis.push({key: 1, name: 1, value: 1});
            subdis[subdis.length - 1].hs = [];

            for(var i=0;i<directions.length;i++){
                subdis[subdis.length - 1].hs.push({
                    key: i,
                    name: directions[i],
                    value:directions[i]
                });
            }
            return dis;
        },
        getDate:function(){
            var d1 = [];
            for (var i = 0; i < 5; i++) {
                d1.push({key: (2015 + i),name:(2015 + i),value:(2015 + i)});
                d1[d1.length-1].months = [];
                var d2 = d1[d1.length-1].months;
                for (var j = 1; j < 13; j++) {
                    d2.push({key: j,name:j,value:j});
                    d2[d2.length-1].days = [];
                    var d3 = d2[d2.length-1].days;
                    for (var k = 1; k < 32; k++) {
                        d3.push({key: k, name: k, value: k});
                    }
                }
            }
            return d1;
        },

        showDistrictsScroller:function(e){
            self.districtsScroller.show();
        },
        submitHouseInfo:function(e) {
            //判断
            if(!$.trim(self.$el.find("#title").val())){
                self.showMyToast("请填写标题", 1000);
                return;
            }
            if(!$.trim(self.$el.find("#address").val())){
                self.showMyToast("请填写地址", 1000);
                return;
            }

            //传值
            var alldata={};
            alldata={
                "realty[title]": self.$el.find("#title").val(),
                "realty[quarter_title]": self.$el.find("#neighbourhood").val(),
                "realty[address]": self.$el.find("#address").val(),
                "realty[district_id]": "",//区域ID
                "realty[room]": "",//室
                "realty[hall]": "",//厅
                "realty[wash]": "",//卫
                "realty[price]": self.$el.find("#rent").val(),
                "realty[area]": self.$el.find("#square").val(),
                "realty[floor]": self.$el.find("#layer").val(),
                "realty[total_height]": self.$el.find("#layerall").val(),
                "realty[decoration_type]": self.$el.find("#housing-show").val(),
                "realty[direction]": self.$el.find("#faceto-show").val(),
                "realty[decoration_years]": self.$el.find("#housingtime-show").val(),
                "realty[end_at]": self.$el.find("#rentdeadline-show").val(),


                "device[chair]": self.$el.find("#furniture-1")[0].checked ? 1 : 0,
                "device[teapoy]": self.$el.find("#furniture-2")[0].checked ? 1 : 0,
                "device[sofa]": self.$el.find("#furniture-3")[0].checked ? 1 : 0,
                "device[bed]": self.$el.find("#furniture-4")[0].checked ? 1 : 0,
                "device[chest]": self.$el.find("#furniture-5")[0].checked ? 1 : 0,
                "device[table]": self.$el.find("#furniture-6")[0].checked ? 1 : 0,
                "device[tv_stand]": self.$el.find("#furniture-7")[0].checked ? 1 : 0,
                "device[bookcase]": self.$el.find("#furniture-8")[0].checked ? 1 : 0,

                "device[tv]": self.$el.find("#electronic-1")[0].checked ? 1 : 0,
                "device[water_heater]": self.$el.find("#electronic-2")[0].checked ? 1 : 0,
                "device[refrigerator]": self.$el.find("#electronic-3")[0].checked ? 1 : 0,
                "device[air_condition]": self.$el.find("#electronic-4")[0].checked ? 1 : 0,
                "device[hearth]": self.$el.find("#electronic-5")[0].checked ? 1 : 0,
                "device[washer]": self.$el.find("#electronic-6")[0].checked ? 1 : 0,
                "device[fan]": self.$el.find("#electronic-7")[0].checked ? 1 : 0,
                "device[pc]": self.$el.find("#electronic-8")[0].checked ? 1 : 0,

                "device[good_traffic]": self.$el.find("#label1")[0].checked ? 1 : 0,
                "device[garden]": self.$el.find("#label2")[0].checked ? 1 : 0,
                "device[subway]": self.$el.find("#label3")[0].checked ? 1 : 0,
                "device[lift]": self.$el.find("#label4")[0].checked ? 1 : 0,
                "device[villa]": self.$el.find("#label5")[0].checked ? 1 : 0,
                "device[standalone]": self.$el.find("#label6")[0].checked ? 1 : 0,
            }

            if(!self.isLogin()){
                self.showMyToast("请先登录", 1500);
                return;
            }
            var user = self.getCurrentUser();
            self.showLoading();
            //var url = Lizard.host + Lizard.apiUrl + "owners/"+self.user.actor_id+"/realties?auth_token="+ self.user.authentication_token;
            var url = Lizard.host + Lizard.apiUrl +"/realties?auth_token="+user.authentication_token;
            $.ajax({
                url: url,
                type: "POST",
                //data:{ "realty" : realty,"device":device },
                data:alldata,
                success: function (data) {
                    self.hideLoading();
                    self.showMyToast("上传成功", 1500);

                },
                error: function (e) {
                    self.hideLoading();
                    self.showMyToast("网络错误", 1000);


                }
            });


        },
        afterIframeLoad: function () {
            var iDoc = self.iframeContent.contentDocument || self.iframeContent.document;
            self.hideLoading();

        },
        onCreate: function () {
            self = this;
        },
        onShow: function () {

            !self.districtsScroller && self.getDistricts(function (districts) {
                var dis = [];
                dis.push({key: 1, name: 1, value: 1});
                dis[dis.length - 1].subdis = [];
                var subdis = dis[dis.length - 1].subdis;
                subdis.push({key: 1, name: 1, value: 1});
                subdis[subdis.length - 1].districts = [];

                for (var i = 0; i < districts.length; i++) {
                    subdis[subdis.length - 1].districts.push({
                        key: districts[i].id,
                        name: districts[i].title,
                        value: districts[i].title
                    });
                }

                var MInitData = [dis, dis[0].subdis, dis[0].subdis[0].districts], MInitIndex = [0, 0, 0];
                self.districtsScroller = self.districtsScroller || new UIGroupSelect({
                    datamodel: {title: "区域选择", tips: ""},
                    needAnimat: !1,
                    data: MInitData,
                    indexArr: MInitIndex,
                    displayNum: 5,
                    onCreate: function () {
                        this.$el.addClass("plugin_date")
                    },
                    changedArr: [function (t) {
                        var e = this.scrollArr[1], i = this.scrollArr[2];
                        e.reload(t.subdis), i.reload(t.subdis[0].districts), e.setIndex(0), i.setIndex(0)
                    }, function (t) {
                        var e = this.scrollArr[2];
                        e.reload(t.districts), e.setIndex(0)
                    }],
                    onOkAction: function (item) {
                        self.$el.find("#area-show").val(item[2].name)
                        this.hide()
                    },
                    onCancelAction: function () {
                        this.hide()
                    },
                    hide: function () {
                        this.destroy()
                    }
                })
                self.districtsScroller.$el.addClass("district");

            });

            var d2 = self.getHouseType(), MInitData = [d2, d2[0].halls, d2[0].halls[0].toilets], MInitIndex = [0, 0, 0];
            self.houseTypeScroller = self.houseTypeScroller || new UIGroupSelect({
                datamodel: {title: "户型选择", tips: ""},
                needAnimat: !1,
                data: MInitData,
                indexArr: MInitIndex,
                displayNum: 5,
                onCreate: function () {
                    this.$el.addClass("plugin_date")
                },
                changedArr: [function (t) {
                    var e = this.scrollArr[1], i = this.scrollArr[2];
                    e.reload(t.halls), i.reload(t.halls[0].toilets), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.toilets), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.room_count = item[2].value;
                    self.$el.find("#housetype-show").val(item[0].name + item[1].name + item[2].name)

                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            })
            //self.houseTypeScroller.$el.addClass("house-type");
            var h2 = self.getHousing(), HInitData = [h2, h2[0].subdis, h2[0].subdis[0].hs], HInitIndex = [0, 0, 0];
            self.housingScroller=self.housingScroller||new UIGroupSelect({
                datamodel: {title: "装修", tips: ""},
                needAnimat: !1,
                data: HInitData,
                indexArr: HInitIndex,
                displayNum: 5,
                onCreate: function () {
                    this.$el.addClass("plugin_date")
                },
                changedArr: [function (t) {
                    var e = this.scrollArr[1], i = this.scrollArr[2];
                    e.reload(t.subdis), i.reload(t.subdis[0].hs), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.hs), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.room_count = item[2].value;
                    self.$el.find("#housing-show").val(item[2].name)

                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            });
            self.housingScroller.$el.addClass("district");
            var ht2 = self.getHousingTime(), HTInitData = [ht2, ht2[0].subdis, ht2[0].subdis[0].hs], HTInitIndex = [0, 0, 0];
            self.housingTimeScroller=self.housingTimeScroller||new UIGroupSelect({
                datamodel: {title: "装修年限", tips: ""},
                needAnimat: !1,
                data: HTInitData,
                indexArr: HTInitIndex,
                displayNum: 5,
                onCreate: function () {
                    this.$el.addClass("plugin_date")
                },
                changedArr: [function (t) {
                    var e = this.scrollArr[1], i = this.scrollArr[2];
                    e.reload(t.halls), i.reload(t.halls[0].toilets), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.toilets), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.room_count = item[2].value;
                    self.$el.find("#housingtime-show").val(item[2].name)

                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            });
            self.housingTimeScroller.$el.addClass("district");

            var f2 = self.getFaceto(), FTInitData = [f2, f2[0].subdis, f2[0].subdis[0].hs], FTInitIndex = [0, 0, 0];
            self.directionScroller=self.directionScroller||new UIGroupSelect({
                datamodel: {title: "朝向", tips: ""},
                needAnimat: !1,
                data: FTInitData,
                indexArr: FTInitIndex,
                displayNum: 5,
                onCreate: function () {
                    this.$el.addClass("plugin_date")
                },
                changedArr: [function (t) {
                    var e = this.scrollArr[1], i = this.scrollArr[2];
                    e.reload(t.halls), i.reload(t.halls[0].toilets), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.toilets), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.room_count = item[2].value;

                    self.$el.find("#faceto-show").val(item[2].name)

                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            });
            self.directionScroller.$el.addClass("district");


            var d1 = this.getDate(), initData = [d1, d1[0].months, d1[0].months[0].days], initIndex = [0, 0, 0];
            self.dateScroller = self.dateScroller || new UIGroupSelect({
                datamodel: {title: "租赁到期", tips: ""},
                needAnimat: !1,
                data: initData,
                indexArr: initIndex,
                displayNum: 5,
                onCreate: function () {
                    this.$el.addClass("plugin_date")
                },
                changedArr: [function (t) {
                    var e = this.scrollArr[1], i = this.scrollArr[2];
                    e.reload(t.months), i.reload(t.months[0].days), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.days), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.$el.find("#rentdeadline-show").val(item[0].key+"-"+item[1].key+"-"+item[2].key);
                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            });

            if (!self.iframeContent) {
                var iframe = document.createElement("iframe");
                iframe.width = "100%";
                iframe.height = "0";
                iframe.src = "./camera.html";
                iframe.frameBorder = "0";
                iframe.frameBorder = "no";
                iframe.scrolling = "no";
                iframe.border = "0";
                if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
                    iframe.onreadystatechange = function () {
                        if (iframe.readyState == "complete") {
                            self.afterIframeLoad();
                        }
                    };
                } else {
                    iframe.onload = function () {
                        self.afterIframeLoad();
                    };
                }
                self.$el.append(iframe);
                self.iframeContent = iframe;
            } else {
                this.hideLoading();
            }


        }

    })
    return View;
})