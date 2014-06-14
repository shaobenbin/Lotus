/**
 * for intercept jquery ajax
 * 2014.6.14 @binbin
 *
 * lutos的插件JS的使用说明
 *
 * 第一步：引入这个JS文件
 *  <script src="http://localhost:3000/dashboard/assets/plugin/lotus.js?projectId=539acf4e807daf0000cd8161"></script>
 *  (1)、注意域名的替换哦
 *  (2)、这个文件必须要在JQUERY的文件之后引入，因为这个文件需要覆盖jquery的ajax方法
 *  (3)、projectId是你在lotus系统里面配置的页面的action的url的所属项目编号
 * 第二步：编写传统的jquery的ajax方法，比如：
 *  $.ajax({
 *       type:"POST",
 *       url:"blog",
 *       dataType:"json",
 *       success:function(data){
 *           alert(JSON.stringify(data, null, 4));
 *       },
 *       error: function(err){
 *          // alert(XMLHttpRequest.readyState);
 *          alert('error,'+err.errorMsg);
 *       }
 *   });
 * 第三步:执行
 *
 * 附加功能：
 * 1、如果我要调用真实的action来获取真实数据，而不是模拟数据如何办？
 *      方法一：删除<script src="http://localhost:3000/dashboard/assets/plugin/lotus.js?projectId=539acf4e807daf0000cd8161"></script>
 *      方法二：加上enable=false参数,http://localhost:3000/dashboard/assets/plugin/lotus.js?projectId=539acf4e807daf0000cd8161&enable=false
 * 2、如果我想让某些URL获取真实的数据，其它URL继续获取模拟数据如何办？
 *      第一步加上mode=2的参数:http://localhost:3000/dashboard/assets/plugin/lotus.js?projectId=539acf4e807daf0000cd8161&mode=2
 *      第二步将你不想要模拟数据的URL配置进去,代码如下:
 *      if(lotus){
 *          //一定要加这个判断，避免删除lotus的JS插件的时候导致页面JS报错.
 *          lotus.setNotInterceptReqUrl(['/blog']);
 *      }
 */

(function() {
    Lotus = function() {
        this.init.apply(this, arguments);
    },

    Lotus.prototype = {
        /**
         * mode value range:
         *  0-disabled
         *  1-intercept
         *  1 - not intercept some req url
         */
        mode:null,
        notInterceptReqUrls:[],
        projectId:null,
        node:null,
        enable:true,
        root:'localhost:3000',
        PREFIX:"/mockjs/project/",
        init:function(){
            this.node = this.setNode();
            this.mode = this.setMode();
            this.projectId = this.setProjectId();
            this.enable = this.setEnable();
        },

        setEnable:function(){
            var enable = true;
            var ens = this.node.src.match(/(?:\?|&)enable=([^&]+)(?:&|$)/);
            if (ens) {
                enable = ens[1] == 'true';
            }
            return enable;
        },

        setNode:function(){
            var nodes = document.getElementsByTagName('script');
            for(var i = 0; i < nodes.length; i++){
                var node = nodes[i];
                var ms = node.src.match(/(?:\?|&)projectId=([^&]+)(?:&|$)/);
                if(ms){
                    return node;
                }
            }
        },

        setMode:function(){
            var mode = 1;
            var modePattern = this.node.src.match(/(?:\?|&)mode=([^&]+)(?:&|$)/);
            var modeList = [0,1,2];
            if (modePattern) {
                mode = +modePattern[1];
                if (!(mode in modeList)) {
                    mode = 1;
                }
            }else{
                mode=1;
            }
            return mode;
        },

        setProjectId:function(){
            var ms = this.node.src.match(/(?:\?|&)projectId=([^&]+)(?:&|$)/);
            if(ms){
                projectId = ms[1];
                return projectId;
            }
            return;
        },

        setRoot:function(){
            var rootPattern = this.node.src.match(/(?:\?|&)root=([^&]+)(?:&|$)/);
            if (rootPattern) {
                this.root = rootPattern[1];
            }
        },

        /**
         * 格式[reqUrl1,reqUrl2,...]
         * @param reqUrls
         */
        setNotInterceptReqUrl:function(reqUrls){
            this.notInterceptReqUrls = reqUrls;
        },

        getMockRequestUrl : function (options) {
            var url = options.url;
            if (!options || typeof options !== 'object') {
                throw Error('illegal option object:' + options);
            }
            options.jsonp = '_c';
            options.dataType = 'json';
            options.type = 'GET';
            url = this.convertUrlToRelative(url);
            url = "http://" + this.root + this.PREFIX + this.projectId + '/' + encodeURIComponent(url);
            options.url = url;
            return options;
        },

        convertUrlToRelative : function (url) {
            if (!url) {
                throw Error('Illegal url:' + url);
            }
            if (url.indexOf('http://') > -1) {
                url = url.substring(url.indexOf('/', 7) + 1);
            } else if (url.indexOf('https://') > -1) {
                url = url.substring(url.indexOf('/', 8) + 1);
            }
            if (url.charAt(0) != '/') {
                url = '/' + url;
            }
            return url;
        },

        route:function(url) {
            url = this.convertUrlToRelative(url);

            if (!url || typeof url !== 'string') {
                console.warn("Illegal url:", url);
                return false;
            }

            /**
             * disabled
             */
            if (this.mode === 0) {
                return false;
            }
            /**
             * intercept all requests
             */
            else if (this.mode == 1) {
                return true;
            }

            /**
             * not intercept req url
             */
            else if (this.mode == 2){
                if (url in this.notInterceptReqUrls) {
                    return false;
                }
            }

            return false;
        }
    };

    window.lotus = new Lotus();

    if(!lotus.projectId){
        return;
    }

    if (lotus.enable) {
        /**
         * jQuery override
         */
        if (window.jQuery) {
            var ajax = jQuery.ajax;
            jQuery.ajax = function() {
                var oOptions = arguments[0];
                var url = oOptions.url;
                if (lotus.route(url) && lotus.projectId) {
                    lotus.getMockRequestUrl(oOptions);
                    var oldSuccess1 = oOptions.success;
                    oldSuccess1 && (oOptions.success = function(data) {
                        if(data.code == 1001){
                            data = data.result;
                        }else{
                            oOptions.error({errorMsg:data.result.errorMsg});
                            return;
                        }
                        oldSuccess1.apply(this, arguments);
                    });

                    var oldComplete = oOptions.complete;
                    oldComplete && (oOptions.complete = function(data) {
                        if(data.code == 1001){
                            data = data.result;
                        }else{
                            oOptions.error({errorMsg:data.result.errorMsg});
                            return;
                        }
                        oldComplete.apply(this, arguments);
                    });
                }
                ajax.apply(this, arguments);
            };
        }

    }
})();
