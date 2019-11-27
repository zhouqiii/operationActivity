var submitParams;
var attributeid;
var activityid
var vm = new Vue({
  el: '#rewardEquipment',
  data: {
	  message:'helloworld',
	  optionsList:[],
	  optionsListT:[],
	  optionsListThree:[],
	  optionsListF:[],
	  optionsListFive:[],
	  optionsListAll:[],
	  optionsListAllT:[],
	  optionsListAllThree:[],
	  optionsListAllF:[],
	  optionsListAllFive:[],
	  numList:'',
	  selected1:'',
	  selected2:'',
	  selected3:'',
	  selected4:'',
	  selected5:'',
	  selectList:[],
    addMoreSelect:[
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''}
    ]
  },
  methods:{
	  delTheDate(obj){
		  vm.addMoreSelect.splice(obj,1)
	  },
	  getOptionsInput(query){ 
		  if (query !== '') {
            vm.optionsList = vm.optionsListAll.filter(item => {
              return item.goodsName.indexOf(query) > -1
            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前10条, 不足10条忽略即可
        }
		              else {
            vm.optionsList = vm.optionsListAll.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前10条渲染回去
          }
	  },
	  setDistrict () {
		  $.post("../getActivityReward.action", function (data) {
				 vm.optionsList=data.data.slice(0,10)
				 vm.optionsListT=data.data.slice(0,10)
				 vm.optionsListThree=data.data.slice(0,10)
				 vm.optionsListF=data.data.slice(0,10)
				 vm.optionsListFive=data.data.slice(0,10)
				 vm.optionsListAll=data.data
				 vm.optionsListAllT=data.data
				 vm.optionsListAllThree=data.data
				 vm.optionsListAllF=data.data
				 vm.optionsListAllFive=data.data
			    });
      },
},
created:function(){
	this.setDistrict()
}
})
	
layui.use(['table', 'layer', 'form', 'element','laydate'], function () {
  var table = layui.table;
  var layer = layui.layer;
  var form = layui.form
  var laydate = layui.laydate
  laydate.render({
    elem: '#data2' //指定元素
  });
  var cyclenum='<p style="float:right;color:white;opacity: .1;margin-right:-15px;"><i class="	fa fa-chevron-right"></i></p>'
//增加
  $('#addSelect').click(function(){
	 var newObj={selectValue:'',number:''}
	 vm.addMoreSelect.push(newObj)
  })
  $('.cancleBtn').click(function(){
	  $('#rewardEquipment').css("display",'none')
	  vm.addMoreSelect=[
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''}
    ]
  })
  $("#activename_type").change(function () {
	  $(".addBranchBtn").css("display","block");
    var activename_type = $('#activename_type').val()
    if(activename_type==null||activename_type==''||activename_type==undefined){
    	 $("#activename_canshu").val('')
         $("#activename_image").val('')
         $("#activename_shouwei").val('')
         $("#activename_yuliu").val('')
         $("#activename_yuliuTwo").val('')
         $("#activename_yuliuFour").val('')
         $("#activename_yuliuThree").val('')
         $("#activename_yuliuFif").val('')
         $("#activename_bianhao").val('')
         $("#activeid_id").val('')
         $("#activename_typecanshu").val('')
    }else{
    	   $.ajax({
    		      type: "post",
    		      url: "../getActivityTemplateList.action",
    		      async: true,
    		      data: {
    		        activityType: activename_type,
    		      },
    		      success: function (json) {
    		        var data = json.data
    		        for (var i = 0; i < data.length; i++) {
    		          var cycleParamType = data[i].cycleParamType
    		          var cycleParamNum = data[i].cycleParamNum
    		          var textImage = data[i].textImage
    		          var cycleFirstId = data[i].cycleFirstId
    		          var paramArr1 = data[i].paramArr1
    		          var paramArr2 = data[i].paramArr2
    		          var paramArr3 = data[i].paramArr3
    		          var paramArr4 = data[i].paramArr4
    		          var paramArr5 = data[i].paramArr5
    		          var attributeId = data[i].attributeId
    		          var myselect=document.getElementById('activename_type')
    		          var index=myselect.selectedIndex ;
    		          var textname=myselect.options[index].text
    		          $("#activename_name").val(textname)
    		          $("#activename_canshu").val(cycleParamNum)
    		          $("#activename_image").val(textImage)
    		          $("#activename_shouwei").val(cycleFirstId)
    		          $("#activename_yuliu").val(paramArr1)
    		          $("#activename_yuliuTwo").val(paramArr2)
    		          $("#activename_yuliuThree").val(paramArr3)
    		          $("#activename_yuliuFour").val(paramArr4)
    		          $("#activename_yuliuFif").val(paramArr5)
    		          // $("#activename_bianhao").val(attributeId)
    		          $("#activeid_id").val(attributeId)
    		          $("#activename_typecanshu").val(cycleParamType)
    		        }
    		      }
    		    })
    }

  })

  
  $('#activename_type').change(function () {
    var activename_type = $('#activename_type').val()
    if(activename_type==null||activename_type==''||activename_type==undefined){
    	var array=[]
        table.render({
            elem: '#demo',
            id: 'demo'
            // , height: 312
            , data:array
            , cols: [[ //表头
              // {
              //   field: 'attributeId',
              //   title: '序号',
              //   width: 150,
              //   edit: 'text'
              // },
              {
                field: 'attributeId',
                title: '序号',
                width: 130,
                type: 'space',
                edit: 'text',
                event: 'checkOnlyId'
                	
              },
              {
                field: 'cycleIndex',
                title: '周期内序号'+cyclenum,
                width: 120,
                edit: 'text'
              }
              
              , {
                field: 'reachCondition',
                title: '达成条件'+cyclenum,
                width: 140,
                edit: 'text',
              }
              , {
                field: 'reward',
                width: 170,
                title: '奖励'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'textImage',
                title: '文件图片资源'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr1',
                title: '保留参数1'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr2',
                title: '保留参数2'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr3',
                title: '保留参数3'+cyclenum,
                edit: 'text'
              }
//              , {
//                field: 'paramArr4',
//                title: '保留参数4'+cyclenum,
//                edit: 'text'
//              }
              , {
                field: 'paramArr5',
                title: '保留参数5'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'operaTion',
                title: '操作'+cyclenum,
                width: 350,
                templet: function (value) {
                  return `
                             <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                             
                             `
                }
              }
            ]]
          });
    	
    }
    //第一个实例
    else{
        table.render({
            elem: '#demo',
            id: 'demo'
            // , height: 312
            , url: '../getActivityBranchTemplateList.action' //数据接口
            , where: {
              isTemplate: 1,
              activityType: activename_type,
            }
            , response: {
              statusName: 'state',
              msgName: 'message',
              statusCode: true,
              countName: 'total',
              dataName: 'data'
            },
            request: {
              pageName: 'pageIndex',
              limitName: 'pageSize'
            }
            , cols: [[ //表头
              // {
              //   field: 'attributeId',
              //   title: '序号',
              //   width: 150,
              //   edit: 'text'
              // },
              {
                field: 'attributeId',
                title: '序号',
                width: 150,
                type: 'space',
                edit: 'text',
                event: 'checkOnlyId'
              },
              {
                field: 'cycleIndex',
                title: '周期内序号'+cyclenum,
                width: 150,
                edit: 'text'
              }
              
              , {
                field: 'reachCondition',
                title: '达成条件'+cyclenum,
                edit: 'text',
              }
              , {
                field: 'reward',
                title: '奖励'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'textImage',
                title: '文件图片资源'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr1',
                title: '保留参数1'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr2',
                title: '保留参数2'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'paramArr3',
                title: '保留参数3'+cyclenum,
                edit: 'text'
              }
//              , {
//                field: 'paramArr4',
//                title: '保留参数4'+cyclenum,
//                edit: 'text'
//              }
              , {
                field: 'paramArr5',
                title: '保留参数5'+cyclenum,
                edit: 'text'
              }
              , {
                field: 'operaTion',
                title: '操作'+cyclenum,
                width: 350,
                templet: function (value) {
                  return `
                             <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                             
                             `
                }
              }
            ]]
          });
    }

  })
  //
   //单个删除
//   var length=$('.yihang').length-1
  table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data //拿到这一行数据
    var layEvent = obj.event
//    console.log(data)
    var data_tr=$(this)
    var tr = $(data_tr).parents('tr');
    var trIndex = tr.data('index');
    var newattributeId = data.attributeId;
    if (layEvent === 'del') { //删除
      layer.confirm('确定删除？', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);//向服务端发送删除指令
//        $("body").mLoading("show")
//        $.ajax({
//          type: "post",
//          url: "../delActivity.action",
//          async: true,
//          data: {
//            activityId: newattributeId,
//          },
//          success: function (e) {
//            $("body").mLoading("hide")
//          }
//        })
      });
      return false
    }
   //上移
    else if(layEvent === 'upload'){
    	//   alert("up")
    	var tr=$(data_tr).parent().parent().parent();
    	if($(tr).prev().html()==null){
    		alert("已经是最顶部了！");
    		return;
    	}else{
    		$(tr).insertBefore($(tr).prev());
    	}
    //下移
    }else if(layEvent === 'download'){
        //    alert("download")
    	var tr=$(data_tr).parent().parent().parent();
    	if($(tr).next().html()==null){
    		alert("已经是最底部了!");
    		return;
    	}else{
    		$(tr).insertAfter($(tr).next());
    	}
    }else if(layEvent==='reise'){
//    	console.log(data)
      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment").css('display','block')
 //保存
  $('#saveSelect').off('click').click(function(){
	  var array=[]
	  vm.optionsListAll.forEach(function(item){
		  for(var i=0;i<vm.addMoreSelect.length;i++){
			  if(vm.addMoreSelect[i].selectValue===item.goodsName){
				  vm.addMoreSelect[i].selectValue=item.rewardId
			  }
		  }
	  })
	  var newArray = vm.addMoreSelect.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue&&newArray[i].number){
			  array.push(newArray[i].selectValue)
			  array.push(newArray[i].number)
		  }
	  }
	  var params=array.join(',')
	  submitParams="("+params+")"
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[3].childNodes[0].textContent = submitParams;
	  $("#rewardEquipment").css('display','none')
			 vm.optionsListAll.forEach(function(item){
				  for(var i=0;i<vm.addMoreSelect.length;i++){
						  vm.addMoreSelect[i].selectValue=""
							  vm.addMoreSelect[i].number = ""
				  }
			  })
	/////  
//    	$.ajax({
//    		type:"get",
//    		url:"../updateActivityBranch.action",
//    		async:false,
//    		data: {
//    			attributeId:attributeid,
//    			activityId:activityid,
//    			reward:submitParams
//    		},
//    		success: function(json) {
//    			
//    			 vm.addMoreSelect=[{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''}]
//				$("body").mLoading("hide")
//			    var activename_type = $('#activename_type').val()
////			    var dataAll=table.cache["demo"]
////				dataAll[trIndex].reward=submitParams
//			    data.reward = submitParams
//			    var arr3_add = $("table .layui-table-click")
//    			arr3_add[0].childNodes[3].childNodes[0].textContent = data.reward;
//			}
//    	})
	  
  })
  
     ////// 
//      var formAppend=document.getElementById('formPeiZhi')
//	  if(formAppend.contains(document.getElementById('addDiv'))){
//		  formAppend.removeChild(document.getElementById('addDiv'))
//		}
//    	layer.open({
//    	    type: 1,
//    	    title: ["活动奖励配置", 'text-align:center;'],
//    	    content: $("#jiangli_peizhi"),
//    	    area: ['500px', '500px'],
//          btn: ['增加','保存'],
//          yes: function(){
//        	  alert(1)
//        	  var length=$('.yihang').length-1
//              var appendContent = document.querySelectorAll('.yihang')[length]
//              // var appendContent = $('.yihang').last();
//              var htmlCon = '<div class="yihang" style="margin-top:20px;display:inline-block;"><div class="shengming_one"><select name="city" lay-verify="" lay-search class="shengmingyaoshuiB" id="reward'+i+'" placeholder="请输入"></select></div><span class="shengmingspan">数量</span><input type="text" class="jiangli_peizhi_input" id="num'+i+'"> <input type="button" class="delContent" value="删除" onclick="delTheData($(this))"></button></div>'
//              var myScript= document.createElement("script");
//              myScript.type = "text/javascript";
//              myScript.appendChild(document.createTextNode("function delTheData(obj){var parents=obj.parent();parents.remove();}"));
//              document.body.appendChild(myScript);
//              function wupinB() {
//            	    $.post("../getActivityReward.action", function (data) {
//            	      $.each(data.data, function (index, item) {
//            	        $('.shengmingyaoshuiB').append(new Option(item.goodsName, item.rewardId,));
//            	      });
//            	      $(".shengmingyaoshuiB").prepend("<option value=''></option>");
//            	      form.render('select')
//            	    });
//
//            	  }
//              wupinB()
//              var divAdd=document.createElement('div')
//              divAdd.id='addDiv'
//              divAdd.innerHTML=htmlCon
//              formAppend.appendChild(divAdd)
//              i=i+1      	  
//          },
//    	    btn2: function (index) {
//	    	var $this = $(this);
//            var params
//            var array=[]
//            var goalsLength=$('.yihang').length//总选择物品即选择框
//            // console.log(goalsLength)
//    	    var attributeid=data.attributeId
//            var activityid=data.activityId
//            for(var i=1;i<=goalsLength;i++){
//              if($('#reward'+i+'').val()==''){
//                $('#num'+i+'').val()==''
//              }
//                array.push($('#reward'+i+'').val())
//                array.push($('#num'+i+'').val())
//            }
//    	    	var arr = array.filter(function (d) {
//    	    	    return d; 
//    	    	});
//    	    	params=arr.join(',')
//    	    	var htm="("+params+")"
//    	    	$.ajax({
//    	    		type:"get",
//    	    		url:"../updateActivityBranch.action",
//    	    		async:true,
//    	    		data: {
//    	    			attributeId:attributeid,
//    	    			activityId:activityid,
//    	    			reward:htm
//    	    		},
//    	    		success: function(json) {
//    					layer.close(index);
//						$("body").mLoading("hide")
//					    var activename_type = $('#activename_type').val()
//					    var dataAll=table.cache["demo"]
//						dataAll[trIndex].reward=htm
//					    //第一个实例
//					    table.render({
//					      elem: '#demo',
//					      id: 'demo'
//					      // , height: 312
//					      ,data:dataAll
//					      ,cols: [[ //表头
//					        {
//					          field: 'attributeId',
//					          title: '序号',
//					          width: 150,
//					          type: 'space',
//					          edit: 'text'
//					        },
//					        {
//					          field: 'cycleIndex',
//					          title: '周期内序号'+cyclenum,
//					          width: 150,
//					          edit: 'text'
//					        }
//					        
//					        , {
//					          field: 'reachCondition',
//					          title: '达成条件'+cyclenum,
//					          edit: 'text',
//					        }
//					        , {
//					          field: 'reward',
//					          title: '奖励'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'textImage',
//					          title: '文件图片资源'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'paramArr1',
//					          title: '保留参数1'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'paramArr2',
//					          title: '保留参数2'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'paramArr3',
//					          title: '保留参数3'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'paramArr4',
//					          title: '保留参数4'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'paramArr5',
//					          title: '保留参数5'+cyclenum,
//					          edit: 'text'
//					        }
//					        , {
//					          field: 'operaTion',
//					          title: '操作'+cyclenum,
//					          width: 350,
//					          templet: function (value) {
//					            return `
//					                       <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
//					                       <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
//					                       <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
//					                       <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
//					                       
//					                       `
//					          }
//					        }
//
//					      ]]
//					    });
//					}
//    	    	})
//    	    }
//    	  })
    }
  })
   table.on('edit(test)', function(obj){
    var value = obj.value //得到修改后的值
    var preValue=$(this).prev().text()//修改之前的值
    var $this = $(this);
    var tr = $this.parents('tr');
    var trIndex = tr.data('index');
    var dataOld=table.cache["demo"]
    if(!value){
    	layer.msg('序号不能为空,请重新修改');
    	dataOld[trIndex].attributeId=preValue
	    table.render({
		      elem: '#demo',
		      id: 'demo'
		      // , height: 312
		      ,data:dataOld
		      ,cols: [[ //表头
		        {
		          field: 'attributeId',
		          title: '序号',
		          width: 150,
		          type: 'space',
		          edit: 'text'
		        },
		        {
		          field: 'cycleIndex',
		          title: '周期内序号'+cyclenum,
		          width: 150,
		          edit: 'text'
		        }
		        
		        , {
		          field: 'reachCondition',
		          title: '达成条件'+cyclenum,
		          edit: 'text',
		        }
		        , {
		          field: 'reward',
		          title: '奖励'+cyclenum,
		          edit: 'text'
		        }
		        , {
		          field: 'textImage',
		          title: '文件图片资源'+cyclenum,
		          edit: 'text'
		        }
		        , {
		          field: 'paramArr1',
		          title: '保留参数1'+cyclenum,
		          edit: 'text'
		        }
		        , {
		          field: 'paramArr2',
		          title: '保留参数2'+cyclenum,
		          edit: 'text'
		        }
		        , {
		          field: 'paramArr3',
		          title: '保留参数3'+cyclenum,
		          edit: 'text'
		        }
//		        , {
//		          field: 'paramArr4',
//		          title: '保留参数4'+cyclenum,
//		          edit: 'text'
//		        }
		        , {
		          field: 'paramArr5',
		          title: '保留参数5'+cyclenum,
		          edit: 'text'
		        }
		        , {
		          field: 'operaTion',
		          title: '操作'+cyclenum,
		          width: 350,
		          templet: function (value) {
		            return `
		                       <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
		                       <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
		                       <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
		                       <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
		                       
		                       `
		          }
		        }

		      ]]
		    });
    }
    var checkOnlyId=[]
    for(var i=0;i<dataOld.length;i++){
    	checkOnlyId.push(parseInt(dataOld[i].attributeId))
    }
    var nary = checkOnlyId.sort();
    for(var i=0; i<nary.length;i++) {
        if(nary[i] === nary[i+1]) {
        	 layer.msg('序号重复');
        	 dataOld[trIndex].attributeId=null
			    table.render({
				      elem: '#demo',
				      id: 'demo'
				      // , height: 312
				      ,data:dataOld
				      ,cols: [[ //表头
				        {
				          field: 'attributeId',
				          title: '序号',
				          width: 150,
				          type: 'space',
				          edit: 'text'
				        },
				        {
				          field: 'cycleIndex',
				          title: '周期内序号'+cyclenum,
				          width: 150,
				          edit: 'text'
				        }
				        
				        , {
				          field: 'reachCondition',
				          title: '达成条件'+cyclenum,
				          edit: 'text',
				        }
				        , {
				          field: 'reward',
				          title: '奖励'+cyclenum,
				          edit: 'text'
				        }
				        , {
				          field: 'textImage',
				          title: '文件图片资源'+cyclenum,
				          edit: 'text'
				        }
				        , {
				          field: 'paramArr1',
				          title: '保留参数1'+cyclenum,
				          edit: 'text'
				        }
				        , {
				          field: 'paramArr2',
				          title: '保留参数2'+cyclenum,
				          edit: 'text'
				        }
				        , {
				          field: 'paramArr3',
				          title: '保留参数3'+cyclenum,
				          edit: 'text'
				        }
//				        , {
//				          field: 'paramArr4',
//				          title: '保留参数4'+cyclenum,
//				          edit: 'text'
//				        }
				        , {
				          field: 'paramArr5',
				          title: '保留参数5'+cyclenum,
				          edit: 'text'
				        }
				        , {
				          field: 'operaTion',
				          title: '操作'+cyclenum,
				          width: 350,
				          templet: function (value) {
				            return `
				                       <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
				                       <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
				                       <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
				                       <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
				                       
				                       `
				          }
				        }

				      ]]
				    });
        }
    }
  });
//  ////删除奖励配置当前项
//  $('.delContent').click(function(){
//    var obj=$(this);
//    var parents=obj.parent();
//    parents.remove();
//  })
   //生命药水select
//  wupin()
//  function wupin() {
//    $.post("../getActivityReward.action", function (data) {
//      $.each(data.data, function (index, item) {
//        $('.shengmingyaoshui').append(new Option(item.goodsName, item.rewardId,));
//      });
//      $(".shengmingyaoshui").prepend("<option value=''></option>");
//      $(".shengmingyaoshui").each(function () {
//        $(this).find("option").eq(0).attr("selected", "selected")
//      })
//
//      form.render('select')
//    });
//
//  }
  // 活动类型select
  onarea()
  function onarea() {
    $.post("../getActivityType.action", function (data) {
      $.each(data.data, function (index, item) {
        $('.qiehuan').append(new Option(item.activityName, item.activityId));

      });
      $(".qiehuan").prepend("<option value=''>请选择</option>");
      $(".qiehuan").each(function () {
        $(this).find("option").eq(0).attr("selected", "selected")
      })
      form.render('select')
    });

  }

  // 保存
  $(".Preservation").click(function () {
//	  alert(11)
    // var array = table.checkStatus('demo').data
    var arrayOld =table.cache["demo"]////table分条数组
    var arrayOld2 = $("table tbody tr")
    // var array2 =JSON.stringify(array);//转成字符串
//     console.log(array)
    // console.log(htm)
        // $('input:radio:first').attr('checked', 'checked');//设置一个默认的按钮选项
    var array=[]
    for(var i=0;i<arrayOld.length;i++){
  	  if(arrayOld[i]!=[]&&arrayOld[i]!=''&&arrayOld[i]!=undefined&&arrayOld[i]!=null){
  		  array.push(arrayOld[i])
  	  }
    }
    var activename_type = $('#activename_type').val();//活动类型
    var array2 = [];
    var array3=[];
    for(var i=0;i<arrayOld2.length;i++){
    	if(arrayOld2[i]!=[]&&arrayOld2[i]!=''&&arrayOld2[i]!=undefined&&arrayOld2[i]!=null){
    		  console.log(arrayOld2[i].childNodes[0].innerText)
    		  var array2 = {
    			  activityId:null,
    			  activityType:activename_type,
    			  attributeId:arrayOld2[i].childNodes[0].textContent,
    			  cycleIndex:arrayOld2[i].childNodes[1].textContent, //周期内序号
    			  reachCondition: arrayOld2[i].childNodes[2].textContent, //达成条件
    			  reward: arrayOld2[i].childNodes[3].textContent,
    			  textImage: arrayOld2[i].childNodes[4].textContent,
    			  paramArr1: arrayOld2[i].childNodes[5].textContent,
    			  paramArr2: arrayOld2[i].childNodes[6].textContent,
    			  paramArr3: arrayOld2[i].childNodes[7].textContent,
    			  paramArr5: arrayOld2[i].childNodes[8].textContent,
    			  firstOpenDay:firstopenday
    		  }
    		  array3.push(array2)
    	  }
    }
//    console.log(arrayOld)
    console.log(arrayOld2)
//    console.log(array2)
    console.log(array3)
    var checkValue  = /^[\s]*$/;
    var activeid_id = $("#activeid_id").val();//活动ID
    var activename_name = $("#activename_name").val();//活动名称
    var activename_type = $('#activename_type').val();//活动类型
    var activename_typecanshu = $("#activename_typecanshu").val(); //周期参数类型
    var activename_canshu = $("#activename_canshu").val();//周期参数
    var activename_shouwei = $("#activename_shouwei").val(); //首位id
    var activename_image = $("#activename_image").val();//文字图片
    var activename_yuliu = $("#activename_yuliu").val();//预留1
    var activename_yuliuTwo = $("#activename_yuliuTwo").val();//预留2
    var activename_yuliuThree = $("#activename_yuliuThree").val();//预留3
    var activename_yuliuFour = $("#activename_yuliuFour").val();//预留4
    var activename_yuliuFif = $("#activename_yuliuFif").val();//预留5
    var activename_bianhao = $("#activename_bianhao").val();//活动编号
    var obj = document.getElementsByName("statusDate");
    var mulobj = document.getElementsByName("statusWeek");
   
    var flag 
    var openServerDate
    var firstopendayofweek
    var firstopenday
    var chixuDate=$("#chixuDay").val()
    var xunhuanDate=$("#xunhuanDay").val()
    var startTime=$('#data2').val()
    var checkInput=/^[\s]*$/;
  if(activeid_id == ""||activeid_id == null||checkValue.test(activeid_id)){
  	alert("请输入活动ID");
		return false;
  }else if(activename_bianhao == ""||activename_bianhao == null||checkValue.test(activename_bianhao)){
  	alert("请输入活动编号");
		return false;
  }else{
        for(var i=0; i<obj.length; i ++){
              if(obj[i].checked==true){
                // console.log(obj[i].value)
                flag=obj[i].value
              }
          }
          if(flag==2){
            openServerDate='';
            startTime=startTime;
          }
          else if(flag==1){
            openServerDate=$('#data1').val()
            startTime=''

          }
          else if(flag==3){
            openServerDate=$('#data3').val()
            startTime=''
          }
          else if(flag==4){
            openServerDate=$('#data4').val()
            startTime=''
           }
          if(mulobj[0].checked==true){
            firstopendayofweek=1
            firstopenday=$('#start_time').val()
            if(firstopenday>=8){
              	alert("星期输入值为1~7")
              	return false
              }
          } else if(mulobj[0].checked==false){
            firstopendayofweek=-1
            firstopenday=''}
    	        for(var i=0;i<array3.length;i++){
    	        	array3[i].activityId=null
    	        	array3[i].pId=activename_bianhao
    	        	array3[i].firstOpenDay=firstopenday
    	        }
    	        // var list = [{ attributeId: activeid_id,activityName:activename_name,ctivityType:activename_type, cycleParamType:activename_typecanshu, cycleParamNum: activename_canshu,cycleFirstId:activename_shouwei,textImage: activename_image, paramArr1: activename_yuliu, rows:array2}]
    	        $.ajax({
    	          type: "post",
    	          dataType: "json",
    	          url: "../saveActivity.action",
    	          async: true,
    	          contentType:'application/json;charset=UTF-8',
    	          data: JSON.stringify({
    	            attributeId: activeid_id,
    	            activityName:activename_name,
    	            activityType:activename_type,
    	            cycleParamType:activename_typecanshu,
    	            cycleParamNum: activename_canshu,
    	            cycleFirstId:activename_shouwei,
    	            textImage: activename_image,
    	            paramArr1: activename_yuliu,
    	            paramArr2: activename_yuliuTwo,
    	            paramArr3: activename_yuliuThree,
    	            paramArr4: activename_yuliuFour,
    	            paramArr5: activename_yuliuFif,
    	            activityId: activename_bianhao,
    	            openType:flag,//单选框
//                    firstOpenDayOfWeek:firstopendayofweek,//多选框勾选
    	            firstOpenDayOfWeek:firstopenday,//多选框勾选
                    openSpencificDate:startTime,//日期
                    openServerDate:openServerDate,//单选框天
                    firstOpenDay:firstopenday,////多选框天
                    durationDays:chixuDate,//持续时间
                    cycleDays:xunhuanDate,//循环时间
    	            rows:array3,
    	            // list:JSON.stringify(list)
    	          }),
    	          success: function (e) {
    	        	 alert(e.message)
    	        	 //    	        更新奖励配置
//    	        	 $.ajax({
//    	        		 type:"get",
//    	        		 url:"../updateActivityBranch.action",
//    	        		 async:false,
//    	        		 data: {
//    	        			 attributeId:attributeid,
//    	        			 activityId:activityid,
//    	        			 reward:submitParams
//    	        		 },
//    	        		 success: function(json) {
//    	        			 alert(e.message)
//    	        			 vm.addMoreSelect=[{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''}]
//    	        			 $("body").mLoading("hide")
//    	        			 var activename_type = $('#activename_type').val()
////			    			var dataAll=table.cache["demo"]
////							dataAll[trIndex].reward=submitParams
////			    			data.reward = submitParams
//    	        		 }
//    	        	 })   
    	            $("body").mLoading("hide")
    	          }
    	        })


    }
  })
//增加活动模板
$(".addBranchBtn").click(function () {
	var isnull=false;
	var oldDate = table.cache["demo"];
//	console.log(oldDate)
//	判断如果活动分支为空
	if(oldDate.length !==0){
		for(var i=0;i<oldDate.length;i++){
			if(oldDate[0].length !==0){
				isnull=true;
			}
			else{
				isnull =false;
			}
		}
		if(isnull == true){
			var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
			var len=newDateChange.length;
		   var lastList = newDateChange[len-1]
		   lastList.LAY_TABLE_INDEX = lastList.LAY_TABLE_INDEX+1
		//   console.log(lastList.LAY_TABLE_INDEX)
		   var atributeid
		   if(lastList.attributeId==null||lastList.attributeId==undefined||lastList.attributeId==0){
			   atributeid=1
		   }else{
			   atributeid=parseInt(lastList.attributeId)+1
		   }
		var cycleIndex=lastList.cycleIndex
		var reachCondition=lastList.reachCondition
		var reward=lastList.reward
		var textImage=lastList.textImage
		var paramArr1=lastList.paramArr1
		var paramArr2=lastList.paramArr2
		var paramArr3=lastList.paramArr3
		var paramArr4=lastList.paramArr4
		var paramArr5=lastList.paramArr5
		var newList= {"attributeId":atributeid,"cycleIndex":cycleIndex,"reachCondition":reachCondition,"reward":reward,"textImage":textImage,"paramArr1":paramArr1,"paramArr2":paramArr2,"paramArr3":paramArr3,"paramArr4":paramArr4,"paramArr5":paramArr5,}
		//   console.log(lastList)
		//   console.log(lastList.LAY_TABLE_INDEX)
		 newList.activityId=lastList.activityId+1
		}
		else{
			var newList= {"attributeId":"","cycleIndex":"","reachCondition":"","reward":"","textImage":"","paramArr1":paramArr1,"paramArr2":"","paramArr3":"","paramArr4":"","paramArr5":"",}
			var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
		}
	}
	else{
		var newList= {"attributeId":"","cycleIndex":"","reachCondition":"","reward":"","textImage":"","paramArr1":paramArr1,"paramArr2":"","paramArr3":"","paramArr4":"","paramArr5":"",}
		var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
	}
   newDateChange.push(newList)
	    table.render({
	        elem: '#demo',
	        id: 'demo'
        	,data: newDateChange
        	,page:false
        	,limit:1000
	        , cols: [[ //表头
	          // {
	          //   field: 'attributeId',
	          //   title: '序号',
	          //   width: 150,
	          //   edit: 'text'
	          // },
	          {
	            field: 'attributeId',
	            title: '序号',
	            width: 150,
	            type: 'space',
	            edit: 'text'
	          },
	          {
	            field: 'cycleIndex',
	            title: '周期内序号'+cyclenum,
	            width: 150,
	            edit: 'text'
	          }
	          , {
	            field: 'reachCondition',
	            title: '达成条件'+cyclenum,
	            edit: 'text',
	          }
	          , {
	            field: 'reward',
	            title: '奖励'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'textImage',
	            title: '文件图片资源'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr1',
	            title: '保留参数1'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr2',
	            title: '保留参数2'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr3',
	            title: '保留参数3'+cyclenum,
	            edit: 'text'
	          }
//	          , {
//	            field: 'paramArr4',
//	            title: '保留参数4'+cyclenum,
//	            edit: 'text'
//	          }
	          , {
	            field: 'paramArr5',
	            title: '保留参数5'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'operaTion',
	            title: '操作'+cyclenum,
	            width: 350,
	            templet: function (value) {
	              return `
	                         <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
	                         <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
	                         <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
	                         <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
	                         
	                         `
	            }
	          }

	        ]]
	      });
     });


  // 打开一个活动时间配置
  $(".time_to").click(function () {
	  var activeid_id = $("#activeid_id").val()
	  var activename_bianhao = $("#activename_bianhao").val();//活动编号
    layer.open({
      type: 1,
      title: ["活动时间配置", 'text-align:center;','border-bottom:none !important;'],
      content: $("#time_peizhi"),
      area: ['500px', '600px'],
      btn:['确定'],
      shadeClose :false,
      shade :0
//      yes:function(index){
//        // $('input:radio:first').attr('checked', 'checked');//设置一个默认的按钮选项
//        var obj = document.getElementsByName("statusDate");
//        var mulobj = document.getElementsByName("statusWeek");
//       
//        var flag 
//        var openServerDate
//        var firstopendayofweek
//        var firstopenday
//        var chixuDate=$("#chixuDay").val()
//        var xunhuanDate=$("#xunhuanDay").val()
//        var startTime=$('#data2').val()
//        var checkInput=/^[\s]*$/;
//        if(checkInput.test(activeid_id)||activeid_id==null){
//        	alert("活动ID不能为空")
//        	return false
//        }else if(checkInput.test(activename_bianhao)||activename_bianhao==null){
//        	alert("活动编号不能为空")
//        	return false
//        }else{
//            for(var i=0; i<obj.length; i ++){
//                  if(obj[i].checked==true){
//                    // console.log(obj[i].value)
//                    flag=obj[i].value
//                  }
//              }
//              if(flag==2){
//                openServerDate='';
//                startTime=startTime;
//              }
//              else if(flag==1){
//                openServerDate=$('#data1').val()
//                startTime=''
//
//              }
//              else if(flag==3){
//                openServerDate=$('#data3').val()
//                startTime=''
//              }
//              else if(flag==4){
//                openServerDate=$('#data4').val()
//                startTime=''
//               }
//              if(mulobj[0].checked==true){
//                firstopendayofweek=1
//                firstopenday=$('#start_time').val()
//                if(firstopenday>=8){
//                  	alert("星期输入值为1~7")
//                  	return false
//                  }
//              } else if(mulobj[0].checked==false){
//                firstopendayofweek=-1
//                firstopenday=''
//              }
//              // console.log(firstopendayofweek)
//              // console.log(chixuDate)
//              // console.log(xunhuanDate)
//              // console.log(openServerDate)
//              // console.log(firstopenday)
//              // console.log(flag)
//              // console.log(startTime)
//            $.ajax({
//              type: "get",
//              url: "../updateActivity.action",
//              async: true,
//              data:{
//                activityId:activename_bianhao,//唯一id
//                openType:flag,//单选框
//                firstOpenDayOfWeek:firstopendayofweek,//多选框勾选
//                openSpencificDate:startTime,//日期
//                openServerDate:openServerDate,//单选框天
//                firstOpenDay:firstopenday,////多选框天
//                durationDays:chixuDate,//持续时间
//                cycleDays:xunhuanDate///循环时间
//              },
//              success:function(e){
//                layer.close(index);
//                $("body").mLoading("hide")
//                   console.log(firstopendayofweek)
//                  console.log(firstopenday)
//              }
//            })
//        }
//      }
     
    })

  })
})

