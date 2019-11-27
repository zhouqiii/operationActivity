////
var vm = new Vue({
  el: '#rewardEquipment',
  data: {
	  message:'helloworld',
	  optionsList:[],
	  optionsListAll:[],
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
            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前50条, 不足50条忽略即可
        }
		              else {
            vm.optionsList = vm.optionsListAll.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前50条渲染回去
          }
	  },
	  setDistrict () {
		  $.post("../getActivityReward.action", function (data) {
				 vm.optionsList=data.data.slice(0,10)
				 vm.optionsListAll=data.data
			    });
      },
},
created:function(){
	this.setDistrict()
}
})
////
layui.use(['table', 'layer', 'form', 'element','laydate'], function () {
  var table = layui.table;
  var layer = layui.layer;
  var form = layui.form;
  var laydate = layui.laydate
  //执行一个时间实例
  laydate.render({
    elem: '#data2' //指定元素
  });

  var cyclenum='<p style="float:right;color:white;opacity: .1;margin-right:-15px;"><i class="	fa fa-chevron-right"></i></p>'
//编辑跳转过来的
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
	   $('#activename_type').change(function () {
		   var myselect=document.getElementById('activename_type')
	          var index=myselect.selectedIndex ;
	          var textname=myselect.options[index].text
	          $("#activename_name").val(textname)
	   })
activeid()
  function activeid(){
	 $('#activeid_id').val($.cookie('the_cookie_pid'))//活动id
    $('#activename_bianhao').val($.cookie('the_cookie_pname'))//活动编号
    $('#activename_canshu').val($.cookie('the_cookie_pCanNum'))//周期参数
    var activityName=$.cookie('the_cookie_pactivityName')
    $('#activename_name').val(activityName)//活动名称
    var activityId= $('#activeid_id').val()
    var active_bianhao = $('#activename_bianhao').val()
    $.ajax({
          type: "post",
          url: "../getActivityList.action",
          async: true,
          data: {
            activityId: active_bianhao,
          },
          success: function (json) {
        	  var data=json.data[0]
        	var paramFirstId=data.cycleFirstId;
        	var imageSrc=data.textImage;
        	var paramReady=data.paramArr1;
        	var paramReadyTwo=data.paramArr2;
        	var paramReadyThree=data.paramArr3;
        	var paramReadyFour=data.paramArr4;
        	var paramReadyFif=data.paramArr5;
        	var activityType=data.activityType
        	console.log(activityType)
        	$('#activename_type').val(activityType)//周期首位id
        	$('#activename_shouwei').val(paramFirstId)//周期首位id
        	$('#activename_image').val(imageSrc)//图片资源
        	$('#activename_yuliu').val(paramReady)//预留参数
        	$('#activename_yuliuTwo').val(paramReadyTwo)//预留参数
        	$('#activename_yuliuThree').val(paramReadyThree)//预留参数
        	$('#activename_yuliuFour').val(paramReadyFour)//预留参数
        	$('#activename_yuliuFif').val(paramReadyFif)//预留参数
            $("body").mLoading("hide")
          }
        })
    
     //第一个实例
  table.render({
    elem: '#demoBranch'
    // , height: 312
    , url: '../getActivityBranchTemplateList.action' //数据接口
    ,where: {
      isTemplate:0,
      pId: active_bianhao,
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

      {
        field: 'attributeId',
        title: '序号'+cyclenum,
        width:150,
        edit: 'text'
      },
      {
        field: 'cycleIndex',
        title: '周期内序号'+cyclenum,
        width:150,
        edit: 'text'
      }
      , {
        field: 'reachCondition',
        title: '达成条件'+cyclenum,
        edit: 'text',
        edit: 'text'
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
//      , {
//        field: 'paramArr4',
//        title: '保留参数4'+cyclenum,
//        edit: 'text'
//      }
      , {
        field: 'paramArr5',
        title: '保留参数5'+cyclenum,
        edit: 'text'
      }
      , {
        field: 'operaTion',
        title: '操作'+cyclenum,
        width:350,
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
 
  
  

  table.on('edit(test)', function(obj){
	    var value = obj.value //得到修改后的值
	    var preValue=$(this).prev().text()//修改之前的值
	    var $this = $(this);
	    var tr = $this.parents('tr');
	    var trIndex = tr.data('index');
	    var dataOld=table.cache["demoBranch"]
	    if(!value){
	    	layer.msg('序号不能为空,请重新修改');
	    	dataOld[trIndex].attributeId=preValue
		    table.render({
			      elem: '#demoBranch',
			      id: 'demoBranch'
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
//			        , {
//			          field: 'paramArr4',
//			          title: '保留参数4'+cyclenum,
//			          edit: 'text'
//			        }
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
	    for(var i=0;i< nary.length;i++) {
	        if(nary[i] === nary[i+1]) {
	        	 layer.msg('序号重复');
	        	 dataOld[trIndex].attributeId=null
				    table.render({
					      elem: '#demoBranch',
					      id: 'demoBranch'
					      // , height: 312
					      ,data:dataOld
					      ,cols: [[ //表头

					          {
					            field: 'attributeId',
					            title: '序号'+cyclenum,
					            width:150,
					            edit: 'text'
					          },
					          {
					            field: 'cycleIndex',
					            title: '周期内序号'+cyclenum,
					            width:150,
					            edit: 'text'
					          }
					          , {
					            field: 'reachCondition',
					            title: '达成条件'+cyclenum,
					            edit: 'text',
					            edit: 'text'
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
//					          , {
//					            field: 'paramArr4',
//					            title: '保留参数4'+cyclenum,
//					            edit: 'text'
//					          }
					          , {
					            field: 'paramArr5',
					            title: '保留参数5'+cyclenum,
					            edit: 'text'
					          }
					          , {
					            field: 'operaTion',
					            title: '操作'+cyclenum,
					            width:350,
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


  //单个删除
  table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data //拿到这一行数据
    var layEvent = obj.event
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
//
//          },
//          success: function (e) {
//            $("body").mLoading("hide")
//          }
//        })

      });
//      return false
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
    	var attributeid=data.attributeId
        var activityid=data.activityId
        $("#rewardEquipment").css('display','block')
       //// 
   //保存
    $('#saveSelect').click(function(){
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
//  	  console.log(array)
  	  var params=array.join(',')
  	  var submitParams="("+params+")"
      	$.ajax({
      		type:"get",
      		url:"../updateActivityBranch.action",
      		async:true,
      		data: {
      			attributeId:attributeid,
      			activityId:activityid,
      			reward:submitParams
      		},
      		success: function(json) {
      			$("#rewardEquipment").css('display','none')
//      			 vm.addMoreSelect=[{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''}]
  				$("body").mLoading("hide")
  			    var activename_type = $('#activename_type').val()
  			    var dataAll=table.cache["demoBranch"]
//  				dataAll[trIndex].reward=submitParams
//  			    data.reward = submitParams
  			    location.reload();
  			    //第一个实例
  			    table.render({
  			      elem: '#demoBranch',
  			      id: 'demoBranch'
  			      // , height: 312
  			      ,data:dataAll
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
//  			        , {
//  			          field: 'paramArr4',
//  			          title: '保留参数4'+cyclenum,
//  			          edit: 'text'
//  			        }
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
  	  
    })
//    	
//      var i=6;
//      var formAppend=document.getElementById('formPeiZhi')
//	  if(formAppend.contains(document.getElementById('addDiv'))){
//		  formAppend.removeChild(document.getElementById('addDiv'))
//	  }
//    	layer.open({
//    	    type: 1,
//    	    title: ["活动奖励配置", 'text-align:center;'],
//    	    content: $("#jiangli_peizhi"),
//    	    area: ['500px', '500px'],
//          btn: ['增加','保存'],
//          yes: function(){
//            var length=$('.yihang').length-1
//            var appendContent = document.querySelectorAll('.yihang')[length]
//            // var appendContent = $('.yihang').last();
//            var htmlCon = '<div class="yihang" style="margin-top:20px;display:inline-block;"><div class="shengming_one"><select name="city" lay-verify="" lay-search class="shengmingyaoshuiB" id="reward'+i+'" placeholder="请输入"></select></div><span class="shengmingspan">数量</span><input type="text" class="jiangli_peizhi_input" id="num'+i+'"> <input type="button" class="delContent" value="删除" onclick="delTheData($(this))"></button></div>'
//            var myScript= document.createElement("script");
//            myScript.type = "text/javascript";
//            myScript.appendChild(document.createTextNode("function delTheData(obj){var parents=obj.parent();parents.remove(); console.log(length)}"));
//            document.body.appendChild(myScript);
//            function wupinB() {
//			$.post("../getActivityReward.action", function (data) {
//			  $.each(data.data, function (index, item) {
//			    $('.shengmingyaoshuiB').append(new Option(item.goodsName, item.rewardId,));
//			  });
//			  $(".shengmingyaoshuiB").prepend("<option value=''></option>");
//			  form.render('select')
//			    });
//			  }
//            wupinB()
//            var divAdd=document.createElement('div')
//            divAdd.id='addDiv'
//            divAdd.innerHTML=htmlCon
//            formAppend.appendChild(divAdd)
//            i=i+1
//          },
//    	    btn2: function (index) {
//            var params
//            var array=[]
//            var goalsLength=$('.yihang').length//总选择物品即选择框
//            // console.log(goalsLength)
//    	    	var attributeid=data.attributeId
//            var activityid=data.activityId
//            for(var i=1;i<=goalsLength;i++){
//              if($('#reward'+i+'').val()==''){
//                $('#num'+i+'').val()==''
//              }
//                array.push($('#reward'+i+'').val())
//                array.push($('#num'+i+'').val())
//            }
//    	    	var arr = array.filter(function (s) {
//    	    	    return s; // 注：IE9(不包含IE9)以下的版本没有trim()方法
//    	    	});
//    	    	params=arr.join(',')
//    	    	var htm="("+params+")"
////    	    	console.log(arr)
////    	    	console.log(htm)
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
//    	    			activeid()
//					}
//    	    	})
//    	    }
//    	  })
    }
  })
//增加活动分支按钮
$(".addBranchBtn").click(function () {
	var oldDate = table.cache["demoBranch"];
	var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
	var len=newDateChange.length;
    var lastList = newDateChange[len-1]
   lastList.LAY_TABLE_INDEX = lastList.LAY_TABLE_INDEX+1
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
   newDateChange.push(newList)
	    table.render({
	        elem: '#demoBranch',
	        id: 'demoBranch'
        	,data: newDateChange
	        , cols: [[ //表头
	          // {
	          //   field: 'attributeId',
	          //   title: '序号',
	          //   width: 150,
	          //   edit: 'text'
	          // },
	          {
	            field: 'attributeId',
	            title: '序号'+cyclenum,
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
    layer.open({
      type: 1,
      title: ["活动时间配置", 'text-align:center;','border-bottom:none !important;'],
      content: $("#time_peizhi"),
      area: ['500px', '600px'],
      btn:['保存'],
      yes:function(index){
        var activityid=$("#activename_bianhao").val()
        // $('input:radio:first').attr('checked', 'checked');//设置一个默认的按钮选项
        var obj = document.getElementsByName("statusDate");
        var mulobj = document.getElementsByName("statusWeek");
        var flag 
        var openServerDate
        var firstopendayofweek
        var firstopenday
        var inputCheck  = /^[\s]*$/
        var chixuDate=$("#chixuDay").val()
        var xunhuanDate=$("#xunhuanDay").val()
        var startTime=$('#data2').val()
        if(activityid == ''||inputCheck.test(activityid)){
        	alert("活动编号不能为空")
        }
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
            firstopenday=''
          }
          // console.log(firstopendayofweek)
          // console.log(firstopenday)
          // console.log(openServerDate)
          // console.log(firstopenday)
          // console.log(flag)
          // console.log(startTime)
        $.ajax({
          type: "get",
          url: "../updateActivity.action",
          async: true,
          data:{
            activityId:activityid,//唯一id
            openType:flag,//单选框
            firstOpenDayOfWeek:firstopendayofweek,//多选框勾选
            openSpencificDate:startTime,//日期
            openServerDate:openServerDate,//单选框天
            firstOpenDay:firstopenday,////多选框天
            durationDays:chixuDate,//持续时间
            cycleDays:xunhuanDate///循环时间
          },
          success:function(e){
            layer.close(index);
            $("body").mLoading("hide")
          }
        })
      }
    })
  })

 // 保存
 $(".Preservation").click(function () {
  // var array = table.checkStatus('demo').data
  var arrayAll = table.cache["demoBranch"]////table分条数组
  var array=[]
  for(var i=0;i<arrayAll.length;i++){
	  if(arrayAll[i]!=[]&&arrayAll[i]!=''&&arrayAll[i]!=undefined&&arrayAll[i]!=null){
		  array.push(arrayAll[i])
	  }
  }
  var activityid=$("#activename_bianhao").val();
  if(activityid<=37){
  	alert("活动编号不能在1-37区间");
  	return false;
  }
      var obj = document.getElementsByName("statusDate");
      var mulobj = document.getElementsByName("statusWeek");
      var flag 
      var openServerDate
      var firstopendayofweek
      var firstopenday
      var chixuDate=$("#chixuDay").val()
      var xunhuanDate=$("#xunhuanDay").val()
      var startTime=$('#data2').val()
      for(var i=0; i<obj.length; i ++){
            if(obj[i].checked==true){
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
        if(mulobj.checked==true){
          firstopendayofweek=1
          firstopenday=$('#start_time').val()
        } else if(mulobj.checked==false){
          firstopendayofweek=-1
          firstopenday=''
        }
  var activeid_id = $("#activeid_id").val()//活动ID
  var activename_name = $("#activename_name").val()//活动名称
  var activename_type = $('#activename_type').val()//活动类型
  var activename_typecanshu = $("#activename_typecanshu").val() //周期参数类型
  var activename_canshu = $("#activename_canshu").val()//周期参数
  var activename_shouwei = $("#activename_shouwei").val() //首位id
  var activename_image = $("#activename_image").val()//文字图片
  var activename_yuliu = $("#activename_yuliu").val()//预留
   var activename_yuliuTwo = $("#activename_yuliuTwo").val()//预留
    var activename_yuliuThree = $("#activename_yuliuThree").val()//预留
     var activename_yuliuFour = $("#activename_yuliuFour").val()//预留
      var activename_yuliuFif = $("#activename_yuliuFif").val()//预留
  var activename_bianhao = $("#activename_bianhao").val()//活动编号
  // var list = [{ attributeId: activeid_id,activityName:activename_name,ctivityType:activename_type, cycleParamType:activename_typecanshu, cycleParamNum: activename_canshu,cycleFirstId:activename_shouwei,textImage: activename_image, paramArr1: activename_yuliu, rows:array2}]
  $.ajax({
    type: "post",
    dataType: "json",
    url: "../saveEditActivity.action",////编辑页面保存按钮
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
      openType:flag,//单选框
      firstOpenDayOfWeek:firstopendayofweek,//多选框勾选
      openspencificDate:startTime,//日期
      openserverdate:openServerDate,//单选框天
      firstOpenDay:firstopenday,////多选框天
      durationDays:chixuDate,//持续时间
      cycleDays:xunhuanDate,///循环时间
      activityId: activename_bianhao,
      rows:array
      // list:JSON.stringify(list)
    }),
    success: function (e) {
      alert(e.message)
      $("body").mLoading("hide")
    
    }
  })
})


//删除奖励配置当前项
//$('.delContent').click(function(){
//  var obj=$(this);
//  var parents=obj.parent();
//  parents.remove();
//  // console.log(obj)
//  // console.log(parents)
//  // $(obj).remove();
//})

  //活动类型select
  onarea()
  function onarea() {
    $.post("../getActivityType.action", function (data) {
      $.each(data.data, function (index, item) {
        $('.qiehuan').append(new Option(item.activityName, item.activityId));
      });
//      $(".qiehuan").prepend("<option value='' style='opcity:0.3;'>请选择</option>");
      $(".qiehuan").each(function () {
    	  var cookactivityType=$.cookie('the_cookie_pactivityType')
    	  if(cookactivityType==''||cookactivityType==null||cookactivityType==undefined){
    		  $(".qiehuan").val('请选择');
    	  }else{
    		  $(this).find("option").eq(cookactivityType).attr("selected", "selected")
    	  }
      })
      form.render('select')
    });
  }
  // 生命药水select
//  wupin()
//  function wupin() {
//    $.post("../getActivityReward.action", function (data) {
////    var data=data.data.slice(0, 10)
//      $.each(data.data, function (index, item) {
//        $('.shengmingyaoshui').append(new Option(item.goodsName, item.rewardId,));
//      });
//      $(".shengmingyaoshui").prepend("<option value=''></option>");
//      $(".shengmingyaoshui").each(function () {
//        $(this).find("option").eq(0).attr("selected", "selected")
//      })
//      form.render('select')
//    });
//
//  }
});
