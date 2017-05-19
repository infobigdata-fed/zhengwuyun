$(function () {
    //名标名录展示地图页面
    var convertData = [];
    convertData1 = [];
    convertData2 = [];
    convertData3 = [];
    convertData4 = [];
    convertData5 = [];

    // 百度地图API功能
    var map = new BMap.Map("mymap"); // 创建Map实例
    var point = new BMap.Point(114.299758, 30.56087);
    map.centerAndZoom(point, 11); // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("武汉"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // 地图样式
    var styleJson = [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
            'color': '#e2ebf1'
        }
    }, {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
            'color': '#f6fbff'
        }
    }, {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
            'color': '#c6d4dc',
            "weight": "0.3"
        }
    }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
            'color': '#c6d4dc',
            "weight": "0.3"
        }
    }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'local',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
            'color': '#54a7df'
        }
    }, {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'label',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#999999'
        }
    }, {
        "featureType": "label",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff"
        }
    }]

    map.setMapStyle({
        styleJson: styleJson
    });
    // 加载数据
    var onloadData = function (dataobj) {
        for (var index in dataobj) {
            var opts = {
                width: 220, // 信息窗口宽度
                height: 30, // 信息窗口高度
                title: "", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
            };

            //index 索引
            var myIcon = new BMap.Icon("./img/pos.png", new BMap.Size(19, 25));

            // 创建标注
            var marker = new BMap.Marker(new BMap.Point(dataobj[index].position[0], dataobj[index].position[1]), {
                icon: myIcon
            });

            var content = '<div class="pos-tip">我在<span class="pos-add">' + dataobj[index].address + '</span>附近&gt;</div>';

            // 将标注添加到地图中
            map.addOverlay(marker);
            addClickHandler(content, marker);

            function addClickHandler(content, marker) {
                marker.addEventListener("click", function (e) {
                    openInfo(content, e)
                });
            };

            function openInfo(content, e) {
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
                map.openInfoWindow(infoWindow, point); //开启信息窗口
            };
        }
    };
    // 数据切换
    var convertDataFn = function () {
        convertData1 = [];
        convertData2 = [];
        convertData3 = [];
        convertData4 = [];
        convertData5 = [];
        for (var i = 0, len = convertData.length; i < len; i++) {
            var name = convertData[i].name;
            var address = convertData[i].address;
            var position = convertData[i].position;
            var value = convertData[i].value;
            if (value[0] != 0) {
                convertData1.push({
                    "name": name,
                    "address": address,
                    "position": position,
                    "value": [value[0]]
                });
            }
            if (value[1] != 0) {
                convertData2.push({
                    "name": name,
                    "address": address,
                    "position": position,
                    "value": [value[1]]
                });
            }
            if (value[2] != 0) {
                convertData3.push({
                    "name": name,
                    "address": address,
                    "position": position,
                    "value": [value[2]]
                });
            }
            if (value[3] != 0) {
                convertData4.push({
                    "name": name,
                    "address": address,
                    "position": position,
                    "value": [value[3]]
                });
            }
            if (value[4] != 0) {
                convertData5.push({
                    "name": name,
                    "address": address,
                    "position": position,
                    "value": [value[4]]
                });
            }
        }
    };
    $.ajax({
        type: "GET",
        url: "js/data-1.json",
        dataType: "json",
        success: function (msg) {
            if ($.type(msg) == 'object') {
                msg = msg;
            } else {
                msg = $.parseJSON(msg);
            };

            convertData = msg.list;
            convertDataFn();
            onloadData(convertData1);
        },
        error: function (XMLHttpRequest, textStatus) {
            alert("错误信息: " + textStatus);
        }
    });
    $('.search-bar a').click(function () {
        //清除覆盖物
        // map.clearOverlays();
        $(this).addClass('a_on').siblings().removeClass('a_on');
    });
    //加载数据
    $('.search-bar a').eq(0).click(function () {
        onloadData(convertData1);
    });
    $('.search-bar a').eq(1).click(function () {
        onloadData(convertData2);
    });
    $('.search-bar a').eq(2).click(function () {
        onloadData(convertData3);
    });
    $('.search-bar a').eq(3).click(function () {
        onloadData(convertData4);
    });
    $('.search-bar a').eq(4).click(function () {
        onloadData(convertData5);
    });

});