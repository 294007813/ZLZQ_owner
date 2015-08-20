define(['BaseView', "cUIInputClear","cUIImageSlider", "Model", "Store","UIGroupSelect"], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store,UIGroupSelect) {
    var self;
    var View = BaseView.extend({
        ViewName: 'houses_upload',
        events: {
            "click .back": "toLocation",
            "click .icon-person": "toPersonal",
            "click .icon-home": "toLocation",
            "click .form-list li:first-child": "showHouseType"
        },
        camera: function (e) {
            self.iframeContent.contentWindow.getPictureFromCamera(function(data){
                $('#picture').attr('src','data:image/jpeg;base64,'+data);
                self.cancelEditing();
               // self.uploadPicture(data);
            })
        },
        //点击选择相册
        readFile: function (e) {
            self.iframeContent.contentWindow.getPictureFromPhoto(function(data){
                $('#picture').attr('src','data:image/jpeg;base64,'+data);
                self.cancelEditing();
                //self.uploadPicture(data);
            })


        },
        showHouseType: function (e) {
            self.houseTypeScroller.show();
        },
        getHouseType: function (e) {
            var d1 = [];
            for (var i = 0; i < 5; i++) {
                d1.push({key: (2015 + i), name: (2015 + i), value: (2015 + i)});
                d1[d1.length - 1].months = [];
                var d2 = d1[d1.length - 1].months;
                for (var j = 1; j < 2; j++) {
                    d2.push({key: j, name: j, value: j});
                    d2[d2.length - 1].days = [];
                    var d3 = d2[d2.length - 1].days;
                    d3.push({key: 1, name: '1室', value: '1'});
                    d3.push({key: 1, name: '2室', value: '2'});
                    d3.push({key: 1, name: '3室', value: '3'});
                    d3.push({key: 1, name: '4室', value: '4'});

                }
            }
            return d1;
        },
        afterIframeLoad: function () {
            var iDoc = self.iframeContent.contentDocument || self.iframeContent.document;
            self.hideLoading();

        },
        onCreate: function () {
            self = this;
        },
        onShow: function () {

            var d2 = self.getHouseType(), MInitData = [d2, d2[0].months, d2[0].months[0].days], MInitIndex = [0, 0, 0];
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
                    e.reload(t.months), i.reload(t.months[0].days), e.setIndex(0), i.setIndex(0)
                }, function (t) {
                    var e = this.scrollArr[2];
                    e.reload(t.days), e.setIndex(0)
                }],
                onOkAction: function (item) {
                    self.room_count = item[2].value;
                    self.$el.find("#housetype-show").val(item[2].name)
                    console.log(self.room_count);
                    this.hide()
                },
                onCancelAction: function () {
                    this.hide()
                },
                hide: function () {
                    this.destroy()
                }
            })
            self.houseTypeScroller.$el.addClass("house-type");
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